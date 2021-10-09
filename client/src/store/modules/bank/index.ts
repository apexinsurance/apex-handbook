import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { IBank, ICreateBankForm, IUpdateBankForm } from './bank.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface IBankState {
  banks: IBank[]
  total: number
  currentBank: IBank | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'bank' })
class Bank extends VuexModule implements IBankState {
  public banks: IBank[] = []
  public currentBank: IBank | null = null
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
  private SET_BANKS(banks: IBank[]) {
    this.banks = banks
  }

  @Mutation
  private SET_CURRENT_BANK(currentBank: IBank) {
    this.currentBank = currentBank
  }

  @Action({ rawError: true })
  public async getAllBanks(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/bank${query || ''}`
    )) as AxiosResponse<IBank[]>

    this.SET_BANKS(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async getAllBanksForSelect() {
    this.SET_LOADING(true)
    const banks = (await $axios.get('/bank/select')) as IBank[]
    this.SET_BANKS(banks)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findBankById(id: number) {
    this.SET_LOADING(true)
    const country = (await $axios.get(`/bank/${id}`)) as IBank
    this.SET_CURRENT_BANK(country)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createBank(bankForm: ICreateBankForm) {
    this.SET_LOADING(true)
    await $axios.post('/bank', bankForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateBank(bankForm: IUpdateBankForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = bankForm
    await $axios.put(`/bank/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteBank(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/bank/${id}`)
    this.SET_LOADING(false)
  }
}

export const BankModule = getModule(Bank)
