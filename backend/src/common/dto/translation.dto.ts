import { IsIn, IsNumber, IsString } from 'class-validator'

export const translationLanguages = ['uz', 'en', 'ru']

export class CreateTranslationDto {
  @IsString()
  @IsIn(translationLanguages)
  title: string

  @IsString()
  shortName: string

  @IsString()
  fullName: string
}

export class UpdateTranslationDto extends CreateTranslationDto {
  @IsNumber()
  id: number
}
