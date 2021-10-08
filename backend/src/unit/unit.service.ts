import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Language } from 'src/entities/Language'
import { Repository } from 'typeorm'
import {
  LANGUAGE_NOT_FOUND,
  CITY_NOT_FOUND,
  CITY_LANGUAGE_NOT_FOUND,
} from 'src/common/utils/constants'
import { CreateUnitDto, UpdateUnitDto } from './unit.dto'
import { Unit } from 'src/entities/Unit'
import { UnitTranslation } from 'src/entities/UnitTranslation'

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(UnitTranslation)
    private unitTranslationRepository: Repository<UnitTranslation>,
  ) {}

  async find(dto: BaseQueryDto) {
    let { lang } = dto
    const { page, limit } = dto

    if (!lang) {
      lang = await (
        await this.languageRepository.findOne({ isDefault: true })
      )?.title
    }

    const units = await this.unitRepository
      .createQueryBuilder('unit')
      .leftJoin('unit.translations', 'translations')
      .leftJoin('translations.language', 'language')
      .select(['unit.id as id', 'city.code as code'])
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .where('language.title = :lang', { lang })
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.unitRepository.count()

    return {
      items: units,
      total,
      page,
      limit,
    }
  }

  async findById(id: number): Promise<Unit> {
    const unit = await this.unitRepository
      .createQueryBuilder('unit')
      .leftJoinAndSelect('unit.translations', 'translations')
      .leftJoinAndSelect('translations.language', 'language')
      .where('unit.id = :id', { id })
      .getOne()
    if (!unit) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }
    return unit
  }

  async create(dto: CreateUnitDto) {
    const { code, translations, ...optionalData } = dto

    const unitTranslations = await Promise.all(
      translations.map(async ({ title, shortName, fullName }) => {
        const language = await this.languageRepository.findOne({
          title,
        })

        if (!language) {
          throw new NotFoundException(LANGUAGE_NOT_FOUND)
        }
        return this.unitTranslationRepository.create({
          shortName,
          fullName,
          language,
        })
      }),
    )

    const newUnit = this.unitRepository.create({
      code,
      translations: unitTranslations,
      ...optionalData,
    })

    return this.unitRepository.save(newUnit)
  }

  async update(dto: UpdateUnitDto, id: number) {
    const { translations, ...unitData } = dto

    const unit = await this.unitRepository.preload({
      id,
      ...unitData,
    })
    if (!unit) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }

    const unitTranslations = await Promise.all(
      translations.map(async (data) => {
        const translation = await this.unitTranslationRepository.preload({
          ...data,
        })

        if (!translation) {
          throw new NotFoundException(CITY_LANGUAGE_NOT_FOUND)
        }
        return translation
      }),
    )

    unit.translations = unitTranslations
    return this.unitRepository.save(unit)
  }

  async delete(id: number) {
    const unit = await this.unitRepository.findOne(id)
    if (!unit) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }
    return this.unitRepository.softRemove(unit)
  }
}
