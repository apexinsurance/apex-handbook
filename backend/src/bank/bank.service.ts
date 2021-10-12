import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Language } from 'src/entities/Language'
import { getRepository, Repository } from 'typeorm'
import {
  LANGUAGE_NOT_FOUND,
  COUNTRY_NOT_FOUND,
  BANK_NOT_FOUND,
  BANK_LANGUAGE_NOT_FOUND,
} from 'src/common/utils/constants'
import { Country } from 'src/entities/Country'
import { Bank } from 'src/entities/Bank'
import { BankTranslation } from 'src/entities/BankTranslation'
import { CreateBankDto, UpdateBankDto } from './bank.dto'

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(BankTranslation)
    private bankTranslationRepository: Repository<BankTranslation>,
  ) {}

  async find(dto: BaseQueryDto) {
    const { lang, page, limit } = dto

    const countries = await this.bankRepository
      .createQueryBuilder('bank')
      .leftJoin('bank.translations', 'translations')
      .leftJoin('bank.country', 'country')
      .leftJoin('translations.language', 'language')
      .select([
        'bank.id as id',
        'bank.MFO as MFO',
        'bank.TIN as TIN',
        'bank.NCEA as NCEA',
      ])
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .addSelect('country.ISOCode', 'countryISOCode')
      .where('language.title = :lang', { lang })
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.bankRepository.count()

    return {
      items: countries,
      total,
      page,
      limit,
    }
  }

  async findById(id: number): Promise<Bank> {
    const bank = await this.bankRepository
      .createQueryBuilder('bank')
      .leftJoinAndSelect('bank.translations', 'translations')
      .leftJoinAndSelect('bank.country', 'country')
      .leftJoinAndSelect('translations.language', 'language')
      .where('bank.id = :id', { id })
      .getOne()
    if (!bank) throw new NotFoundException(BANK_NOT_FOUND)

    return bank
  }

  async create(dto: CreateBankDto) {
    const { countryId, translations, ...bankData } = dto
    const country = await getRepository(Country).findOne(countryId)

    if (!country) {
      throw new NotFoundException(COUNTRY_NOT_FOUND)
    }

    const bankTranslations = await Promise.all(
      translations.map(async ({ title, ...otherData }) => {
        const language = await this.languageRepository.findOne({
          title,
        })

        if (!language) throw new NotFoundException(LANGUAGE_NOT_FOUND)

        return this.bankTranslationRepository.create({
          ...otherData,
          language,
        })
      }),
    )

    const newBank = this.bankRepository.create({
      translations: bankTranslations,
      country,
      ...bankData,
    })

    return this.bankRepository.save(newBank)
  }

  async update(dto: UpdateBankDto, id: number) {
    const { translations, countryId, ...bankData } = dto

    const bank = await this.bankRepository.preload({
      id,
      ...bankData,
    })
    if (!bank) throw new NotFoundException(BANK_NOT_FOUND)

    const country = await getRepository(Country).findOne(countryId)
    if (!country) throw new NotFoundException(COUNTRY_NOT_FOUND)

    const bankTranslations = await Promise.all(
      translations.map(async (data) => {
        const translation = await this.bankTranslationRepository.preload({
          ...data,
        })
        if (!translation) throw new NotFoundException(BANK_LANGUAGE_NOT_FOUND)

        return translation
      }),
    )

    bank.translations = bankTranslations
    bank.country = country
    return this.bankRepository.save(bank)
  }

  async delete(id: number) {
    const bank = await this.bankRepository.findOne(id)
    if (!bank) throw new NotFoundException(BANK_NOT_FOUND)

    return this.bankRepository.softRemove(bank)
  }
}
