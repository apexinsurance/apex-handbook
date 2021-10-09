import { ITranslatioForm, ITranslation } from '@/utils/types'

export interface ICountry {
  id: number
  code: string
  ISOCode: string
  translations: ITranslation[]
  startDate?: Date
  finishDate?: Date
}

export interface ICreateCountryForm {
  code: string
  ISOCode: string
  translations: ITranslatioForm[]
}

export interface IUpdateCountryForm extends ICreateCountryForm {
  id: number
  finishDate?: Date | null
}
