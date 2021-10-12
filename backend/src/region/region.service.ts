import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Language } from 'src/entities/Language'
import { getRepository, Repository } from 'typeorm'
import {
  REGION_LANGUAGE_NOT_FOUND,
  REGION_NOT_FOUND,
  LANGUAGE_NOT_FOUND,
  COUNTRY_NOT_FOUND,
} from 'src/common/utils/constants'
import { CreateRegionDto, UpdateRegionDto } from './region.dto'
import { Region } from 'src/entities/Region'
import { RegionTranslation } from 'src/entities/RegionTranslation'
import { Country } from 'src/entities/Country'

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(RegionTranslation)
    private regionTranslationRepository: Repository<RegionTranslation>,
  ) {}

  async find(dto: BaseQueryDto) {
    const { lang, page, limit } = dto

    const countries = await this.regionRepository
      .createQueryBuilder('region')
      .leftJoin('region.translations', 'translations')
      .leftJoin('region.country', 'country')
      .leftJoin('translations.language', 'language')
      .select(['region.id as id', 'region.code as code'])
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .addSelect('country.ISOCode', 'countryISOCode')
      .where('language.title = :lang', { lang })
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.regionRepository.count()

    return {
      items: countries,
      total,
      page,
      limit,
    }
  }

  async findForSelect(): Promise<Region[]> {
    const regions = await this.regionRepository
      .createQueryBuilder('region')
      .leftJoin('region.translations', 'translations')
      .leftJoin('translations.language', 'language')
      .select('region.id as id')
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .where('translations.isDefault = true')
      .getRawMany()

    return regions
  }

  async findById(id: number): Promise<Region> {
    const region = await this.regionRepository
      .createQueryBuilder('region')
      .leftJoinAndSelect('region.translations', 'translations')
      .leftJoinAndSelect('region.country', 'country')
      .leftJoinAndSelect('translations.language', 'language')
      .where('region.id = :id', { id })
      .getOne()
    if (!region) throw new NotFoundException(REGION_NOT_FOUND)

    return region
  }

  async create(dto: CreateRegionDto) {
    const { countryId, translations, ...regionData } = dto
    const country = await getRepository(Country).findOne(countryId)
    if (!country) throw new NotFoundException(COUNTRY_NOT_FOUND)

    const regionTranslations = await Promise.all(
      translations.map(async ({ title, ...otherData }) => {
        const language = await this.languageRepository.findOne({
          title,
        })
        if (!language) throw new NotFoundException(LANGUAGE_NOT_FOUND)

        return this.regionTranslationRepository.create({
          language,
          ...otherData,
        })
      }),
    )

    const newRegion = this.regionRepository.create({
      translations: regionTranslations,
      country,
      ...regionData,
    })

    return this.regionRepository.save(newRegion)
  }

  async update(dto: UpdateRegionDto, id: number) {
    const { translations, countryId, ...regionData } = dto

    const region = await this.regionRepository.preload({
      id,
      ...regionData,
    })
    if (!region) throw new NotFoundException(REGION_NOT_FOUND)

    const country = await getRepository(Country).findOne(countryId)
    if (!country) throw new NotFoundException(COUNTRY_NOT_FOUND)

    const regionTranslations = await Promise.all(
      translations.map(async (data) => {
        const translation = await this.regionTranslationRepository.preload({
          ...data,
        })

        if (!translation) throw new NotFoundException(REGION_LANGUAGE_NOT_FOUND)
        return translation
      }),
    )

    region.translations = regionTranslations
    region.country = country
    return this.regionRepository.save(region)
  }

  async delete(id: number) {
    const country = await this.regionRepository.findOne(id)
    if (!country) throw new NotFoundException(REGION_NOT_FOUND)

    return this.regionRepository.softRemove(country)
  }
}
