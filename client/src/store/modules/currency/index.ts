import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import {
  ICurrency,
  ICreateCurrencyForm,
  IUpdateCurrencyForm,
} from './currency.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface ICurrencyState {
  currensies: ICurrency[]
  total: number
  currentCurrency: ICurrency | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'currency' })
class Currency extends VuexModule implements ICurrencyState {
  public currensies: ICurrency[] = []
  public currentCurrency: ICurrency | null = null
  public loading = false
  public total = 0

  @Mutation
  private SET_LOADING(loading: boolean) {
    this.loading = loading
  }

  @Mutation
  private SET_TOTAL(total: number) {
    this.total = total
  }

  @Mutation
  private SET_CURRENCIES(currensies: ICurrency[]) {
    this.currensies = currensies
  }

  @Mutation
  private SET_CURRENT_CURRENCY(currency: ICurrency) {
    this.currentCurrency = currency
  }

  @Action({ rawError: true })
  public async getAllCurrencies(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/currency${query || ''}`
    )) as AxiosResponse<ICurrency[]>

    this.SET_CURRENCIES(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async getAllCurrenciesForSelect() {
    this.SET_LOADING(true)
    const currencies = (await $axios.get('/currency/select')) as ICurrency[]
    this.SET_CURRENCIES(currencies)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findCurrencyById(id: number) {
    this.SET_LOADING(true)
    const currency = (await $axios.get(`/currency/${id}`)) as ICurrency
    this.SET_CURRENT_CURRENCY(currency)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createCurrency(currencyForm: ICreateCurrencyForm) {
    this.SET_LOADING(true)
    await $axios.post('/currency', currencyForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateCurrency(currencyForm: IUpdateCurrencyForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = currencyForm
    await $axios.put(`/currency/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteCurrency(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/currency/${id}`)
    this.SET_LOADING(false)
  }
}

export const CurrencyModule = getModule(Currency)
