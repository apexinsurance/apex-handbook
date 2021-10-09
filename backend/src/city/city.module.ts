import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { City } from 'src/entities/City'
import { CityTranslation } from 'src/entities/CityTranslation'
import { Language } from 'src/entities/Language'
import { CityController } from './city.controller'
import { CityService } from './city.service'

@Module({
  imports: [TypeOrmModule.forFeature([City, CityTranslation, Language])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
