import { ITranslation, ITranslationForm } from '@/utils/types'

export interface IRegion {
  id: number
  code: string
  countryISOCode: string
  countryId: number
  translations: ITranslation[]
  startDate?: Date
  finishDate?: Date
}

export interface ICreateRegionForm {
  code: string
  countryId: number
  translations: ITranslationForm[]
}

export interface IUpdateRegionForm extends ICreateRegionForm {
  id: number
  countryId: number
  finishDate?: Date | null
}
