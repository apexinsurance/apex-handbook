import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import {
  IDistrict,
  ICreateDistrictForm,
  IUpdateDistrictForm,
} from './district.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface IDistrictState {
  districts: IDistrict[]
  total: number
  currentDistrict: IDistrict | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'district' })
class District extends VuexModule implements IDistrictState {
  public districts: IDistrict[] = []
  public currentDistrict: IDistrict | null = null
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
  private SET_DISTRICTS(districts: IDistrict[]) {
    this.districts = districts
  }

  @Mutation
  private SET_CURRENT_DISTRICT(district: IDistrict) {
    this.currentDistrict = district
  }

  @Action({ rawError: true })
  public async getAllDistrictns(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/district${query || ''}`
    )) as AxiosResponse<IDistrict[]>

    this.SET_DISTRICTS(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findDistrictById(id: number) {
    this.SET_LOADING(true)
    const district = (await $axios.get(`/district/${id}`)) as IDistrict
    this.SET_CURRENT_DISTRICT(district)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createDistrict(districtForm: ICreateDistrictForm) {
    this.SET_LOADING(true)
    await $axios.post('/district', districtForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateDistrict(districtForm: IUpdateDistrictForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = districtForm
    await $axios.put(`/district/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteDistrict(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/district/${id}`)
    this.SET_LOADING(false)
  }
}

export const DistrictModule = getModule(District)
