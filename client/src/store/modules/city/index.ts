import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { ICity, ICreateCityForm, IUpdateCityForm } from './city.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface ICityState {
  cities: ICity[]
  total: number
  currentCity: ICity | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'city' })
class City extends VuexModule implements ICityState {
  public cities: ICity[] = []
  public currentCity: ICity | null = null
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
  private SET_CITIES(cities: ICity[]) {
    this.cities = cities
  }

  @Mutation
  private SET_CURRENT_CITY(citiy: ICity) {
    this.currentCity = citiy
  }

  @Action({ rawError: true })
  public async getAllCities(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/city${query || ''}`
    )) as AxiosResponse<ICity[]>

    this.SET_CITIES(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findCityById(id: number) {
    this.SET_LOADING(true)
    const city = (await $axios.get(`/city/${id}`)) as ICity
    this.SET_CURRENT_CITY(city)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createCity(cityForm: ICreateCityForm) {
    this.SET_LOADING(true)
    await $axios.post('/city', cityForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateCity(cityForm: IUpdateCityForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = cityForm
    await $axios.put(`/city/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteCity(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/city/${id}`)
    this.SET_LOADING(false)
  }
}

export const CityModule = getModule(City)
