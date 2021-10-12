import { ITranslation, ITranslationForm, IBaseHandbook } from '@/utils/types'

export interface IBank extends IBaseHandbook {
  id: number
  MFO: string
  NCEA: string
  TIN: string
  countryISOCode: string
  countryId: number
}

export interface ICreateBankForm {
  MFO: string
  NCEA: string
  TIN: string
  countryId: number
  translations: ITranslationForm[]
}

export interface IUpdateBankForm extends ICreateBankForm {
  id: number
  MFO: string
  NCEA: string
  TIN: string
  countryId: number
  finishDate?: Date | null
}
