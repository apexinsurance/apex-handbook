import { ITranslatioForm, IBaseHandbook } from '@/utils/types'

export interface ICity extends IBaseHandbook {
  id: number
  code: string
  regionId: number
}

export interface ICreateCityForm {
  code: string
  regionId: number
  translations: ITranslatioForm[]
}

export interface IUpdateCityForm extends ICreateCityForm {
  id: number
  regionId: number
  finishDate?: Date | null
}
