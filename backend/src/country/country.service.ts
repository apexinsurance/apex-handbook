import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Country } from 'src/entities/Country'
import { CountryTranslation } from 'src/entities/CountryTranslation'
import { Language } from 'src/entities/Language'
import { Repository } from 'typeorm'
import {
  COUNTRY_LANGUAGE_NOT_FOUND,
  COUNTRY_NOT_FOUND,
  LANGUAGE_NOT_FOUND,
} from 'src/common/utils/constants'
import { CreateCountryDto, UpdateCountryDto } from './country.dto'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(CountryTranslation)
    private countryTranslationRepository: Repository<CountryTranslation>,
  ) {}

  async find(dto: BaseQueryDto) {
    let { lang } = dto
    const { page, limit } = dto
    if (!lang) {
      lang = (await this.languageRepository.findOne({ isDefault: true }))?.title
    }
    const countries = await this.countryRepository
      .createQueryBuilder('country')
      .leftJoin('country.translations', 'translations')
      .leftJoin('translations.language', 'language')
      .select('country.*')
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .where('language.title = :lang', { lang })
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.countryRepository.count()

    return {
      items: countries,
      total,
      page,
      limit,
    }
  }

  async findForSelect(): Promise<Country[]> {
    const lang = (await this.languageRepository.findOne({ isDefault: true }))
      ?.title
    const countries = await this.countryRepository
      .createQueryBuilder('country')
      .leftJoin('country.translations', 'translations')
      .leftJoin('translations.language', 'language')
      .select('country.id as id')
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .where('language.title = :lang', { lang })
      .getRawMany()
    return countries
  }

  async findById(id: number): Promise<Country> {
    const country = await this.countryRepository
      .createQueryBuilder('country')
      .leftJoinAndSelect('country.translations', 'translations')
      .leftJoinAndSelect('translations.language', 'language')
      .where('country.id = :id', { id })
      .getOne()
    if (!country) {
      throw new NotFoundException('Country not found')
    }
    return country
  }

  async create(dto: CreateCountryDto) {
    const { code, ISOCode, translations, ...optionalData } = dto

    const countryTranslations = await Promise.all(
      translations.map(async ({ title, shortName, fullName }) => {
        const language = await this.languageRepository.findOne({
          title,
        })

        if (!language) {
          throw new NotFoundException(LANGUAGE_NOT_FOUND)
        }
        return this.countryTranslationRepository.create({
          shortName,
          fullName,
          language,
        })
      }),
    )

    const newCountry = this.countryRepository.create({
      code,
      ISOCode,
      translations: countryTranslations,
      ...optionalData,
    })

    return this.countryRepository.save(newCountry)
  }

  async update(dto: UpdateCountryDto, id: number) {
    const { translations, ...countryData } = dto

    const country = await this.countryRepository.preload({
      id,
      ...countryData,
    })
    if (!country) {
      throw new NotFoundException(COUNTRY_NOT_FOUND)
    }
    const countryTranslations = await Promise.all(
      translations.map(async (data) => {
        const translation = await this.countryTranslationRepository.preload({
          ...data,
        })

        if (!translation) {
          throw new NotFoundException(COUNTRY_LANGUAGE_NOT_FOUND)
        }
        return translation
      }),
    )
    country.translations = countryTranslations
    return this.countryRepository.save(country)
  }

  async delete(id: number) {
    const country = await this.countryRepository.findOne(id)
    if (!country) {
      throw new NotFoundException(`Country is not found`)
    }
    return this.countryRepository.softRemove(country)
  }
}
