import {
  IsDate,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator'
import { BaseDto } from 'src/common/dto/base.dto'

export class CreateCurrencyRateDto extends BaseDto {
  @IsDate()
  date: Date

  @IsDecimal()
  rate: number

  @IsNumber()
  count: number

  @IsNumber()
  @IsPositive()
  currencyId: number
}

export class UpdateCurrencyRateDto extends BaseDto {
  @IsOptional()
  @IsDate()
  date: Date

  @IsOptional()
  @IsDecimal()
  rate: number

  @IsOptional()
  @IsNumber()
  count: number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  currencyId: number
}
