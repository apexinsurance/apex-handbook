import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Bank } from 'src/entities/Bank'
import { BankTranslation } from 'src/entities/BankTranslation'
import { BCV } from 'src/entities/BCV'
import { City } from 'src/entities/City'
import { CityTranslation } from 'src/entities/CityTranslation'
import { Currency } from 'src/entities/Currency'
import { CurrencyRate } from 'src/entities/CurrencyRate'
import { CurrencyTranslation } from 'src/entities/CurrencyTranslation'
import { District } from 'src/entities/District'
import { DistrictTranslation } from 'src/entities/DistrictTranslation'
import { Language } from 'src/entities/Language'
import { Region } from 'src/entities/Region'
import { RegionTranslation } from 'src/entities/RegionTranslation'
import { Unit } from 'src/entities/Unit'
import { UnitTranslation } from 'src/entities/UnitTranslation'

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  console.log('configService.get', configService.get('DATABASE_USER'))

  return {
    entities: [
      Language,
      Bank,
      BankTranslation,
      City,
      CityTranslation,
      BCV,
      CurrencyTranslation,
      Currency,
      District,
      DistrictTranslation,
      Region,
      RegionTranslation,
      Unit,
      UnitTranslation,
      CurrencyRate,
    ],
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    database: configService.get('DATABASE_NAME'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
  }
}
