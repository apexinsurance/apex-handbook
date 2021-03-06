import { ITranslation, ITranslationForm, IBaseHandbook } from '@/utils/types'

export interface ICurrency extends IBaseHandbook {
  id: number
  code: string
  ISOCode: string
  countryISOCode: string
  countryId: number
}

export interface ICreateCurrencyForm {
  code: string
  ISOCode: string
  countryId: number
  translations: ITranslationForm[]
}

export interface IUpdateCurrencyForm extends ICreateCurrencyForm {
  id: number
  finishDate?: Date | null
}
