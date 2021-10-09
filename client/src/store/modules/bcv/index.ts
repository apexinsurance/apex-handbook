import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { IBCV, ICreateBCVForm, IUpdateBCVForm } from './bcv.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface IBCVState {
  bcv: IBCV[]
  total: number
  currentBCV: ICreateBCVForm | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'bcv' })
class BCV extends VuexModule implements IBCVState {
  public bcv: IBCV[] = []
  public currentBCV: IBCV | null = null
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
  private SET_BCV(bcv: IBCV[]) {
    this.bcv = bcv
  }

  @Mutation
  private SET_CURRENT_BCV(currentBCV: IBCV) {
    this.currentBCV = currentBCV
  }

  @Action({ rawError: true })
  public async getAllBcv(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/bcv${query || ''}`
    )) as AxiosResponse<IBCV[]>

    this.SET_BCV(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findBcvById(id: number) {
    this.SET_LOADING(true)
    const currency = (await $axios.get(`/bcv/${id}`)) as IBCV
    this.SET_CURRENT_BCV(currency)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createBcv(bcvForm: ICreateBCVForm) {
    this.SET_LOADING(true)
    await $axios.post('/bcv', bcvForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateBcv(bcvForm: IUpdateBCVForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = bcvForm
    await $axios.put(`/bcv/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteBcv(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/bcv/${id}`)
    this.SET_LOADING(false)
  }
}

export const BcvModule = getModule(BCV)
