import { ITranslatioForm, IBaseHandbook } from '@/utils/types'

export interface IUnit extends IBaseHandbook {
  id: number
  code: string
}

export interface ICreateUnitForm {
  code: string
  translations: ITranslatioForm[]
}

export interface IUpdateUnitForm extends ICreateUnitForm {
  id: number
  finishDate?: Date | null
}
