import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import {
  ICountry,
  ICreateCountryForm,
  IUpdateCountryForm,
} from './country.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface ICountryState {
  countries: ICountry[]
  total: number
  currentCountry: ICountry | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'country' })
class Country extends VuexModule implements ICountryState {
  public countries: ICountry[] = []
  public currentCountry: ICountry | null = null
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
  private SET_COUNTRIES(countries: ICountry[]) {
    this.countries = countries
  }

  @Mutation
  private SET_CURRENT_COUNTRY(country: ICountry) {
    this.currentCountry = country
  }

  @Action({ rawError: true })
  public async getAllCountries(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/country${query || ''}`
    )) as AxiosResponse<ICountry[]>

    this.SET_COUNTRIES(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async getAllCountriesForSelect() {
    this.SET_LOADING(true)
    const countries = (await $axios.get('/country/select')) as ICountry[]
    this.SET_COUNTRIES(countries)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findCountryById(id: number) {
    this.SET_LOADING(true)
    const country = (await $axios.get(`/country/${id}`)) as ICountry
    this.SET_CURRENT_COUNTRY(country)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createCountry(countryForm: ICreateCountryForm) {
    this.SET_LOADING(true)
    await $axios.post('/country', countryForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateCountry(countryForm: IUpdateCountryForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = countryForm
    await $axios.put(`/country/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteCountry(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/country/${id}`)
    this.SET_LOADING(false)
  }
}

export const CountryModule = getModule(Country)
