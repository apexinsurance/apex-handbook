import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CurrencyRate } from 'src/entities/CurrencyRate'
import { CurrencyRateController } from './currency-rate.controller'
import { CurrencyRateService } from './currency-rate.service'

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRate])],
  controllers: [CurrencyRateController],
  providers: [CurrencyRateService],
})
export class CurrencyRateModule {}
