import { IBaseHandbook, ITranslationForm, ITranslation } from '@/utils/types'

export interface ICountry extends IBaseHandbook {
  id: number
  code: string
  ISOCode: string
}

export interface ICreateCountryForm {
  code: string
  ISOCode: string
  translations: ITranslationForm[]
}

export interface IUpdateCountryForm extends ICreateCountryForm {
  id: number
  finishDate?: Date | null
}
