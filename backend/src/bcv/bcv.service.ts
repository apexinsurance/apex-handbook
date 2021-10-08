import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseQueryDto } from 'src/common/dto/base-query.dto'
import { Repository } from 'typeorm'
import { BCV_NOT_FOUND, CITY_NOT_FOUND } from 'src/common/utils/constants'
import { CreateBcvDto, UpdateBcvDto } from './bcv.dto'
import { BCV } from 'src/entities/BCV'

@Injectable()
export class BcvService {
  constructor(
    @InjectRepository(BCV)
    private bcvRepository: Repository<BCV>,
  ) {}

  async find(dto: BaseQueryDto) {
    const { page, limit } = dto
    const bcvs = await this.bcvRepository
      .createQueryBuilder('bcv')
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()

    const total = await this.bcvRepository.count()
    return {
      items: bcvs,
      total,
      page,
      limit,
    }
  }

  async findById(id: number): Promise<BCV> {
    const bcv = await this.bcvRepository.findOne(id)
    if (!bcv) {
      throw new NotFoundException(BCV_NOT_FOUND)
    }
    return bcv
  }

  async create(dto: CreateBcvDto) {
    const newBcv = this.bcvRepository.create(dto)

    return this.bcvRepository.save(newBcv)
  }

  async update(dto: UpdateBcvDto, id: number) {
    const bcv = await this.bcvRepository.preload({
      id,
      ...dto,
    })
    if (!bcv) {
      throw new NotFoundException(BCV_NOT_FOUND)
    }

    return this.bcvRepository.save(bcv)
  }

  async delete(id: number) {
    const bcv = await this.bcvRepository.findOne(id)
    if (!bcv) {
      throw new NotFoundException(CITY_NOT_FOUND)
    }
    return this.bcvRepository.softRemove(bcv)
  }
}
