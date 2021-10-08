export type LanguageType = 'ru' | 'uz' | 'en'

export interface IHandbookColumn {
  width?: string
  prop: string
  label: string
}

export interface ITranslation {
  fullName: string
  shortName: string
  id?: number
  language?: {
    title: LanguageType
    isDefault: boolean
  }
}

export interface ITranslatioForm extends ITranslation {
  title: LanguageType
}

export interface IBaseHandbook {
  translations: ITranslation[]
  startDate?: Date
  finishDate?: Date
}

export interface AxiosResponse<T> {
  items: T
  total?: number
  page?: number
  limit?: number
}
