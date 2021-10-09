import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BankModule } from './bank/bank.module'
import { BcvModule } from './bcv/bcv.module'
import { CityModule } from './city/city.module'
import { getTypeOrmConfig } from './config/typeorm.config'
import { CountryModule } from './country/country.module'
import { CurrencyRateModule } from './currency-rate/currency-rate.module'
import { CurrencyModule } from './currency/currency.module'
import { DistrictModule } from './district/district.module'
import { LanguageModule } from './language/language.module'
import { RegionModule } from './region/region.module'
import { UnitModule } from './unit/unit.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    CountryModule,
    LanguageModule,
    RegionModule,
    DistrictModule,
    CityModule,
    BankModule,
    CurrencyModule,
    CurrencyRateModule,
    UnitModule,
    BcvModule,
  ],
})
export class AppModule {}
