import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Currency } from 'src/entities/Currency'
import { CurrencyTranslation } from 'src/entities/CurrencyTranslation'
import { Language } from 'src/entities/Language'
import { CurrencyController } from './currency.controller'
import { CurrencyService } from './currency.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency, CurrencyTranslation, Language]),
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
