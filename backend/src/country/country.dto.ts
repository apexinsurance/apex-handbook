import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'
import { BaseDto } from 'src/common/dto/base.dto'
import {
  CreateTranslationDto,
  UpdateTranslationDto,
} from 'src/common/dto/translation.dto'

export class CreateCountryDto extends BaseDto {
  @IsString()
  code: string

  @IsString()
  ISOCode: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslationDto)
  translations: CreateTranslationDto[]
}

export class UpdateCountryDto extends BaseDto {
  @IsOptional()
  @IsString()
  code: string

  @IsString()
  ISOCode: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTranslationDto)
  translations: UpdateTranslationDto[]
}
