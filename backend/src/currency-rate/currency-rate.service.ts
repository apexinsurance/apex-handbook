import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { getRepository, Repository } from 'typeorm'
import {
  CURRENCY_NOT_FOUND,
  COUNTRY_NOT_FOUND,
} from 'src/common/utils/constants'
import {
  CreateCurrencyRateDto,
  UpdateCurrencyRateDto,
} from './currency-rate.dto'
import { Currency } from 'src/entities/Currency'
import { CurrencyRate } from 'src/entities/CurrencyRate'

@Injectable()
export class CurrencyRateService {
  constructor(
    @InjectRepository(CurrencyRate)
    private currencyRateRepository: Repository<CurrencyRate>,
  ) {}

  async find(dto: BaseQueryDto) {
    const { page, limit } = dto

    const currencyRate = await this.currencyRateRepository
      .createQueryBuilder('currencyRate')
      .leftJoin('currencyRate.currency', 'currency')
      .addSelect('currency.code', 'currencyCode')
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.currencyRateRepository.count()

    return {
      items: currencyRate,
      total,
      page,
      limit,
    }
  }

  async findById(id: number): Promise<CurrencyRate> {
    const currencyRate = await this.currencyRateRepository
      .createQueryBuilder('currencyRate')
      .leftJoinAndSelect('currencyRate.currency', 'currency')
      .where('currencyRate.id = :id', { id })
      .getOne()
    if (!currencyRate) {
      throw new NotFoundException(CURRENCY_NOT_FOUND)
    }
    return currencyRate
  }

  async create(dto: CreateCurrencyRateDto) {
    const { currencyId, ...otherData } = dto
    const currency = await getRepository(Currency).findOne(currencyId)

    if (!currency) {
      throw new NotFoundException(COUNTRY_NOT_FOUND)
    }

    const newCurrencyRate = this.currencyRateRepository.create({
      currency,
      ...otherData,
    })

    return this.currencyRateRepository.save(newCurrencyRate)
  }

  async update(dto: UpdateCurrencyRateDto, id: number) {
    const { currencyId, ...otherData } = dto

    const currencyRate = await this.currencyRateRepository.preload({
      id,
      ...otherData,
    })
    if (!currencyRate) {
      throw new NotFoundException(CURRENCY_NOT_FOUND)
    }

    if (currencyId) {
      const currency = await getRepository(Currency).findOne(currencyId)
      currencyRate.currency = currency
    }

    return this.currencyRateRepository.save(currencyRate)
  }

  async delete(id: number) {
    const currencyRate = await this.currencyRateRepository.findOne(id)
    if (!currencyRate) {
      throw new NotFoundException(CURRENCY_NOT_FOUND)
    }
    return this.currencyRateRepository.softRemove(currencyRate)
  }
}
