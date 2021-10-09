import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import store from '@/store'
import { IUnit, ICreateUnitForm, IUpdateUnitForm } from './unit.types'
import $axios from '@/utils/api'
import { AxiosResponse } from '@/utils/types'

export interface IUnitState {
  units: IUnit[]
  total: number
  currentUnit: IUnit | null
  loading: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'unit' })
class Unit extends VuexModule implements IUnitState {
  public units: IUnit[] = []
  public currentUnit: IUnit | null = null
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
  private SET_UNITS(units: IUnit[]) {
    this.units = units
  }

  @Mutation
  private SET_CURRENT_UNIT(currentUnit: IUnit) {
    this.currentUnit = currentUnit
  }

  @Action({ rawError: true })
  public async getAllUnits(query?: string) {
    this.SET_LOADING(true)
    const { items = [], total = 0 } = (await $axios.get(
      `/unit${query || ''}`
    )) as AxiosResponse<IUnit[]>

    this.SET_UNITS(items)
    this.SET_TOTAL(total)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async findUnitById(id: number) {
    this.SET_LOADING(true)
    const unit = (await $axios.get(`/unit/${id}`)) as IUnit
    this.SET_CURRENT_UNIT(unit)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async createUnit(unitForm: ICreateUnitForm) {
    this.SET_LOADING(true)
    await $axios.post('/unit', unitForm)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async updateUnit(unitForm: IUpdateUnitForm) {
    this.SET_LOADING(true)
    const { id, ...formData } = unitForm
    await $axios.put(`/unit/${id}`, formData)
    this.SET_LOADING(false)
  }

  @Action({ rawError: true })
  public async deleteUnit(id: number) {
    this.SET_LOADING(true)
    await $axios.delete(`/unit/${id}`)
    this.SET_LOADING(false)
  }
}

export const UnitModule = getModule(Unit)
