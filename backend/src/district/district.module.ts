import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { District } from 'src/entities/District'
import { DistrictTranslation } from 'src/entities/DistrictTranslation'
import { Language } from 'src/entities/Language'
import { DistrictController } from './district.controller'
import { DistrictService } from './district.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([District, DistrictTranslation, Language]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
