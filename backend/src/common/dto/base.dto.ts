import { IsDate, IsOptional } from 'class-validator'

export class BaseDto {
  @IsOptional()
  @IsDate()
  startDate?: Date

  @IsOptional()
  @IsDate()
  finishDate?: Date
}
