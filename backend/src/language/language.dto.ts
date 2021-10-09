import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class LanguageDto {
  @IsString()
  title: string

  @IsOptional()
  @IsBoolean()
  isDefault: boolean
}
