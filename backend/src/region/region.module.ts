import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Language } from 'src/entities/Language'
import { Region } from 'src/entities/Region'
import { RegionTranslation } from 'src/entities/RegionTranslation'
import { RegionController } from './region.controller'
import { RegionService } from './region.service'

@Module({
  imports: [TypeOrmModule.forFeature([Region, RegionTranslation, Language])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
