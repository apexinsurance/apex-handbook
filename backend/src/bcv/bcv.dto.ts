import { IsDate, IsNumber, IsOptional, IsPositive } from 'class-validator'
import { BaseDto } from 'src/common/dto/base.dto'

export class CreateBcvDto {
  @IsOptional()
  @IsDate()
  date: Date

  @IsNumber()
  @IsPositive()
  value: number
}

export class UpdateBcvDto extends BaseDto {
  @IsOptional()
  @IsDate()
  date: Date

  @IsOptional()
  @IsNumber()
  @IsPositive()
  value: number
}
