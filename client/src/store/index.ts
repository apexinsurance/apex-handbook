import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IError } from './modules/error'
import { IPermissionState } from './modules/permission'
import { IUserState } from './modules/user'

interface IRootState {
  app: IAppState
  error: IError
  user: IUserState
  permission: IPermissionState
}
export default new Vuex.Store<IRootState>({})
