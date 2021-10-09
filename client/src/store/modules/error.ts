import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IError {
  error: any
}

@Module({ dynamic: true, store, name: 'error' })
class Error extends VuexModule implements IError {
  public error = null

  @Mutation
  SET_ERROR(error: any) {
    this.error = error
  }

  @Mutation
  CLEAR_ERROR() {
    this.error = null
  }
}

export const ErrorModule = getModule(Error)
