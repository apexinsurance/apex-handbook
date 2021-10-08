import { ITranslatioForm, IBaseHandbook } from '@/utils/types'

export interface IDistrict extends IBaseHandbook {
  id: number
  code: string
  regionId: number
}

export interface ICreateDistrictForm {
  code: string
  regionId: number
  translations: ITranslatioForm[]
}

export interface IUpdateDistrictForm extends ICreateDistrictForm {
  id: number
  regionId: number
  finishDate?: Date | null
}
