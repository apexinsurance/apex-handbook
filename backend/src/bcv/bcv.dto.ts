import {
  IsArray,
  IsDate,
  IsDecimal,
  IsOptional,
  IsPositive,
} from 'class-validator'
import { BaseDto } from 'src/common/dto/base.dto'

export class CreateBcvDto {
  @IsOptional()
  @IsDate()
  date: Date

  @IsDecimal()
  @IsPositive()
  value: number
}

export class UpdateBcvDto extends BaseDto {
  @IsOptional()
  @IsDate()
  date: Date

  @IsOptional()
  @IsPositive()
  @IsDecimal()
  rate: number
}
