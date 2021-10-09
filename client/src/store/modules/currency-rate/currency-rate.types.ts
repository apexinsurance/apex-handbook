import { IBaseHandbook } from '@/utils/types'

export interface ICurrencyRate extends IBaseHandbook {
  id: number
  date: Date
  count: number
  rate: number
  currencyCode: string
  currencyId: number
}

export interface ICreateCurrencyRateForm {
  date: Date
  count: number
  rate: number
  currencyId: number
}

export interface IUpdateCurrencyRateForm extends ICreateCurrencyRateForm {
  id: number
  finishDate?: Date | null
}
