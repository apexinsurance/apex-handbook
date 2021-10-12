import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export const translationLanguages = ['uz', 'en', 'ru']

export class CreateTranslationDto {
  @IsString()
  @IsIn(translationLanguages)
  title: string

  @IsString()
  shortName: string

  @IsString()
  fullName: string

  @IsOptional()
  @IsBoolean()
  isDefault = false
}

export class UpdateTranslationDto extends CreateTranslationDto {
  @IsNumber()
  id: number
}
