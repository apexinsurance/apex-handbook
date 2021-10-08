import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Language } from 'src/entities/Language'
import { getRepository, Repository } from 'typeorm'
import {
  LANGUAGE_NOT_FOUND,
  COUNTRY_NOT_FOUND,
  CITY_NOT_FOUND,
  CITY_LANGUAGE_NOT_FOUND,
} from 'src/common/utils/constants'
import { CreateCityDto, UpdateCityDto } from './city.dto'
import { Region } from 'src/entities/Region'
import { City } from 'src/entities/City'
import { CityTranslation } from 'src/entities/CityTranslation'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(CityTranslation)
    private cityTranslationRepository: Repository<CityTranslation>,
  ) {}

  async find(dto: BaseQueryDto) {
    let { lang } = dto
    const { page, limit } = dto

    if (!lang) {
      lang = await (
        await this.languageRepository.findOne({ isDefault: true })
      )?.title
    }

    const cities = await this.cityRepository
      .createQueryBuilder('city')
      .leftJoin('city.translations', 'translations')
      .leftJoin('city.region', 'region')
      .leftJoin('translations.language', 'language')
      .select(['city.id as id', 'city.code as code'])
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .addSelect('region.code', 'regionCode')
      .where('language.title = :lang', { lang })
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.cityRepository.count()

    return {
      items: cities,
      total,
      page,
      limit,
    }
  }

  async findById(id: number): Promise<City> {
    const city = await this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.translations', 'translations')
      .leftJoinAndSelect('city.region', 'region')
      .leftJoinAndSelect('translations.language', 'language')
      .where('city.id = :id', { id })
      .getOne()
    if (!city) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }
    return city
  }

  async create(dto: CreateCityDto) {
    const { code, regionId, translations, ...optionalData } = dto
    const region = await getRepository(Region).findOne(regionId)

    if (!region) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }

    const cityTranslations = await Promise.all(
      translations.map(async ({ title, shortName, fullName }) => {
        const language = await this.languageRepository.findOne({
          title,
        })

        if (!language) {
          throw new NotFoundException(LANGUAGE_NOT_FOUND)
        }
        return this.cityTranslationRepository.create({
          shortName,
          fullName,
          language,
        })
      }),
    )

    const newCity = this.cityRepository.create({
      code,
      translations: cityTranslations,
      region,
      ...optionalData,
    })

    return this.cityRepository.save(newCity)
  }

  async update(dto: UpdateCityDto, id: number) {
    const { translations, regionId, ...cityData } = dto

    const city = await this.cityRepository.preload({
      id,
      ...cityData,
    })
    if (!city) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }

    const region = await getRepository(Region).findOne(regionId)
    if (!region) {
      throw new NotFoundException(COUNTRY_NOT_FOUND)
    }

    const cityTranslations = await Promise.all(
      translations.map(async (data) => {
        const translation = await this.cityTranslationRepository.preload({
          ...data,
        })

        if (!translation) {
          throw new NotFoundException(CITY_LANGUAGE_NOT_FOUND)
        }
        return translation
      }),
    )

    city.translations = cityTranslations
    city.region = region
    return this.cityRepository.save(city)
  }

  async delete(id: number) {
    const city = await this.cityRepository.findOne(id)
    if (!city) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }
    return this.cityRepository.softRemove(city)
  }
}
