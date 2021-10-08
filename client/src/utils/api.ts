import { ErrorModule } from '@/store/modules/error'
import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_URL

const $axios = axios.create({
  baseURL,
})

$axios.interceptors.response.use(
  (response: any) => {
    if (!response) return { data: {} }
    return response.data ? response.data : response
  },
  (error) => {
    if (error && error.message === 'Request failed with status code 401') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    } else {
      if (error.response) {
        ErrorModule.SET_ERROR(error.response.data)
      } else {
        ErrorModule.SET_ERROR({ message: 'Network error' })
      }
      throw new Error(error)
    }
  }
)

export default $axios
