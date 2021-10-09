import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from 'src/entities/Country'
import { CountryTranslation } from 'src/entities/CountryTranslation'
import { Language } from 'src/entities/Language'
import { CountryController } from './country.controller'
import { CountryService } from './country.service'

@Module({
  imports: [TypeOrmModule.forFeature([Country, CountryTranslation, Language])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
