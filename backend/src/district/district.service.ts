import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Language } from 'src/entities/Language'
import { getRepository, Repository } from 'typeorm'
import {
  REGION_NOT_FOUND,
  LANGUAGE_NOT_FOUND,
  COUNTRY_NOT_FOUND,
  DISTRICT_NOT_FOUND,
  DISTRICT_LANGUAGE_NOT_FOUND,
} from 'src/common/utils/constants'
import { CreateDistrictDto, UpdateDistrictDto } from './district.dto'
import { Region } from 'src/entities/Region'
import { District } from 'src/entities/District'
import { DistrictTranslation } from 'src/entities/DistrictTranslation'

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(DistrictTranslation)
    private districtTranslationRepository: Repository<DistrictTranslation>,
  ) {}

  async find(dto: BaseQueryDto) {
    let { lang } = dto
    const { page, limit } = dto

    if (!lang) {
      lang = await (
        await this.languageRepository.findOne({ isDefault: true })
      )?.title
    }

    const districts = await this.districtRepository
      .createQueryBuilder('district')
      .leftJoin('district.translations', 'translations')
      .leftJoin('district.region', 'region')
      .leftJoin('translations.language', 'language')
      .select(['district.id as id', 'district.code as code'])
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .addSelect('region.code', 'regionCode')
      .where('language.title = :lang', { lang })
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.districtRepository.count()

    return {
      items: districts,
      total,
      page,
      limit,
    }
  }

  async findById(id: number): Promise<District> {
    const district = await this.districtRepository
      .createQueryBuilder('district')
      .leftJoinAndSelect('district.translations', 'translations')
      .leftJoinAndSelect('district.region', 'region')
      .leftJoinAndSelect('translations.language', 'language')
      .where('district.id = :id', { id })
      .getOne()
    if (!district) {
      throw new NotFoundException(DISTRICT_NOT_FOUND)
    }
    return district
  }

  async create(dto: CreateDistrictDto) {
    const { code, regionId, translations, ...optionalData } = dto
    const region = await getRepository(Region).findOne(regionId)

    if (!region) {
      throw new NotFoundException(DISTRICT_NOT_FOUND)
    }

    const districtTranslations = await Promise.all(
      translations.map(async ({ title, shortName, fullName }) => {
        const language = await this.languageRepository.findOne({
          title,
        })

        if (!language) {
          throw new NotFoundException(LANGUAGE_NOT_FOUND)
        }
        return this.districtTranslationRepository.create({
          shortName,
          fullName,
          language,
        })
      }),
    )

    const newDistrict = this.districtRepository.create({
      code,
      translations: districtTranslations,
      region,
      ...optionalData,
    })

    return this.districtRepository.save(newDistrict)
  }

  async update(dto: UpdateDistrictDto, id: number) {
    const { translations, regionId, ...districtData } = dto

    const district = await this.districtRepository.preload({
      id,
      ...districtData,
    })
    if (!district) {
      throw new NotFoundException(REGION_NOT_FOUND)
    }

    const region = await getRepository(Region).findOne(regionId)
    if (!region) {
      throw new NotFoundException(COUNTRY_NOT_FOUND)
    }

    const districtTranslations = await Promise.all(
      translations.map(async (data) => {
        const translation = await this.districtTranslationRepository.preload({
          ...data,
        })

        if (!translation) {
          throw new NotFoundException(DISTRICT_LANGUAGE_NOT_FOUND)
        }
        return translation
      }),
    )

    district.translations = districtTranslations
    district.region = region
    return this.districtRepository.save(district)
  }

  async delete(id: number) {
    const district = await this.districtRepository.findOne(id)
    if (!district) {
      throw new NotFoundException(REGION_NOT_FOUND)
    }
    return this.districtRepository.softRemove(district)
  }
}
