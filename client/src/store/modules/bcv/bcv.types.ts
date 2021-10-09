import { IBaseHandbook } from '@/utils/types'

export interface IBCV {
  id: number
  date: Date
  value: number
}

export interface ICreateBCVForm {
  date: Date
  value: number
}

export interface IUpdateBCVForm extends ICreateBCVForm {
  id: number
}
