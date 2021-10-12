import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Language } from 'src/entities/Language'
import { getRepository, Repository } from 'typeorm'
import {
  CURRENCY_LANGUAGE_NOT_FOUND,
  CURRENCY_NOT_FOUND,
  LANGUAGE_NOT_FOUND,
  COUNTRY_NOT_FOUND,
} from 'src/common/utils/constants'
import { CreateCurrencyDto, UpdateCurrencyDto } from './currency.dto'
import { Region } from 'src/entities/Region'
import { Country } from 'src/entities/Country'
import { Currency } from 'src/entities/Currency'
import { CurrencyTranslation } from 'src/entities/CurrencyTranslation'

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(CurrencyTranslation)
    private currencyTranslationRepository: Repository<CurrencyTranslation>,
  ) {}

  async find(dto: BaseQueryDto) {
    const { lang, page, limit } = dto

    const currency = await this.currencyRepository
      .createQueryBuilder('currency')
      .leftJoin('currency.translations', 'translations')
      .leftJoin('currency.country', 'country')
      .leftJoin('translations.language', 'language')
      .select([
        'currency.id as id',
        'currency.code as code',
        'currency.ISOCode as ISOCode',
      ])
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .addSelect('country.ISOCode', 'countryISOCode')
      .where('language.title = :lang', { lang })
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.currencyRepository.count()

    return {
      items: currency,
      total,
      page,
      limit,
    }
  }

  async findForSelect(): Promise<Region[]> {
    const currencies = await this.currencyRepository
      .createQueryBuilder('currency')
      .leftJoin('currency.translations', 'translations')
      .leftJoin('translations.language', 'language')
      .select('currency.id as id')
      .addSelect('translations.shortName', 'shortName')
      .addSelect('translations.fullName', 'fullName')
      .where('translations.isDefault = true')
      .getRawMany()
    return currencies
  }

  async findById(id: number): Promise<Currency> {
    const currency = await this.currencyRepository
      .createQueryBuilder('currency')
      .leftJoinAndSelect('currency.translations', 'translations')
      .leftJoinAndSelect('currency.country', 'country')
      .leftJoinAndSelect('translations.language', 'language')
      .where('currency.id = :id', { id })
      .getOne()
    if (!currency) {
      throw new NotFoundException(CURRENCY_NOT_FOUND)
    }
    return currency
  }

  async create(dto: CreateCurrencyDto) {
    const { countryId, translations, ...otherData } = dto
    const country = await getRepository(Country).findOne(countryId)

    if (!country) throw new NotFoundException(COUNTRY_NOT_FOUND)

    const currencyTranslations = await Promise.all(
      translations.map(async ({ title, ...otherData }) => {
        const language = await this.languageRepository.findOne({
          title,
        })
        if (!language) throw new NotFoundException(LANGUAGE_NOT_FOUND)

        return this.currencyTranslationRepository.create({
          language,
          ...otherData,
        })
      }),
    )

    const newCurrency = this.currencyRepository.create({
      translations: currencyTranslations,
      country,
      ...otherData,
    })

    return this.currencyRepository.save(newCurrency)
  }

  async update(dto: UpdateCurrencyDto, id: number) {
    const { translations, countryId, ...otherData } = dto

    const currency = await this.currencyRepository.preload({
      id,
      ...otherData,
    })
    if (!currency) throw new NotFoundException(CURRENCY_NOT_FOUND)

    const country = await getRepository(Country).findOne(countryId)
    if (!country) throw new NotFoundException(COUNTRY_NOT_FOUND)

    const currencyTranslations = await Promise.all(
      translations.map(async (data) => {
        const translation = await this.currencyTranslationRepository.preload({
          ...data,
        })
        if (!translation)
          throw new NotFoundException(CURRENCY_LANGUAGE_NOT_FOUND)

        return translation
      }),
    )

    currency.translations = currencyTranslations
    currency.country = country
    return this.currencyRepository.save(currency)
  }

  async delete(id: number) {
    const currency = await this.currencyRepository.findOne(id)
    if (!currency) throw new NotFoundException(CURRENCY_NOT_FOUND)

    return this.currencyRepository.softRemove(currency)
  }
}
