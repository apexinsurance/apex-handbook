import { Type } from 'class-transformer'
import { IsIn, IsOptional, IsPositive, IsString } from 'class-validator'
import { translationLanguages } from './translation.dto'

export class BaseQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(translationLanguages)
  lang: string

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page = 1

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit = 30
}
