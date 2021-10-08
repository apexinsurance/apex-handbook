import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { IRegion, ICreateRegionForm, IUpdateRegionForm } from './region.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface IRegionState {
  regions: IRegion[]
  total: number
  currentRegion: IRegion | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'region' })
class Region extends VuexModule implements IRegionState {
  public regions: IRegion[] = []
  public currentRegion: IRegion | null = null
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
  private SET_REGIONS(regions: IRegion[]) {
    this.regions = regions
  }

  @Mutation
  private SET_CURRENT_REGION(region: IRegion) {
    this.currentRegion = region
  }

  @Action({ rawError: true })
  public async getAllRegions(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/region${query || ''}`
    )) as AxiosResponse<IRegion[]>

    this.SET_REGIONS(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async getAllRegionsForSelect() {
    this.SET_LOADING(true)
    const regions = (await $axios.get('/region/select')) as IRegion[]
    this.SET_REGIONS(regions)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findRegionById(id: number) {
    this.SET_LOADING(true)
    const country = (await $axios.get(`/region/${id}`)) as IRegion
    this.SET_CURRENT_REGION(country)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createRegion(regionForm: ICreateRegionForm) {
    this.SET_LOADING(true)
    await $axios.post('/region', regionForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateRegion(regionForm: IUpdateRegionForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = regionForm
    await $axios.put(`/region/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteRegion(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/region/${id}`)
    this.SET_LOADING(false)
  }
}

export const RegionModule = getModule(Region)
