import { Type } from 'class-transformer'
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator'
import { BaseDto } from 'src/common/dto/base.dto'
import {
  CreateTranslationDto,
  UpdateTranslationDto,
} from 'src/common/dto/translation.dto'

export class CreateBankDto extends BaseDto {
  @IsString()
  MFO: string

  @IsString()
  NCEA: string

  @IsString()
  TIN: string

  @IsNumber()
  @IsPositive()
  countryId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslationDto)
  translations: CreateTranslationDto[]
}

export class UpdateBankDto extends BaseDto {
  @IsOptional()
  @IsString()
  MFO: string

  @IsOptional()
  @IsString()
  NCEA: string

  @IsOptional()
  @IsString()
  TIN: string

  @IsNumber()
  @IsPositive()
  countryId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTranslationDto)
  translations: UpdateTranslationDto[]
}
