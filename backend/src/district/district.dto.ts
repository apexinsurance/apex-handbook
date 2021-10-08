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

export class CreateDistrictDto extends BaseDto {
  @IsString()
  code: string

  @IsNumber()
  @IsPositive()
  regionId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslationDto)
  translations: CreateTranslationDto[]
}

export class UpdateDistrictDto extends BaseDto {
  @IsOptional()
  @IsString()
  code: string

  @IsNumber()
  @IsPositive()
  regionId: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTranslationDto)
  translations: UpdateTranslationDto[]
}
