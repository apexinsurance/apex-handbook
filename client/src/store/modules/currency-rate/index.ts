import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import {
  ICurrencyRate,
  ICreateCurrencyRateForm,
  IUpdateCurrencyRateForm,
} from './currency-rate.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface ICurrencyRateState {
  currencyRates: ICurrencyRate[]
  total: number
  currentCurrencyRate: ICurrencyRate | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'currency-rate' })
class CurrencyRate extends VuexModule implements ICurrencyRateState {
  public currencyRates: ICurrencyRate[] = []
  public currentCurrencyRate: ICurrencyRate | null = null
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
  private SET_CURRENCY_RATES(currencyRates: ICurrencyRate[]) {
    this.currencyRates = currencyRates
  }

  @Mutation
  private SET_CURRENT_CURRENCY_RATE(currensyRate: ICurrencyRate) {
    this.currentCurrencyRate = currensyRate
  }

  @Action({ rawError: true })
  public async getAllCurrencies(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/currency-rate${query || ''}`
    )) as AxiosResponse<ICurrencyRate[]>

    this.SET_CURRENCY_RATES(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findCurrencyRateById(id: number) {
    this.SET_LOADING(true)
    const currency = (await $axios.get(`/currency-rate/${id}`)) as ICurrencyRate
    this.SET_CURRENT_CURRENCY_RATE(currency)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createCurrencyRate(currencyForm: ICreateCurrencyRateForm) {
    this.SET_LOADING(true)
    await $axios.post('/currency-rate', currencyForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateCurrencyRate(currencyForm: IUpdateCurrencyRateForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = currencyForm
    await $axios.put(`/currency-rate/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteCurrencyRate(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/currency-rate/${id}`)
    this.SET_LOADING(false)
  }
}

export const CurrencyRateModule = getModule(CurrencyRate)
