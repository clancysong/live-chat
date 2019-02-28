import axios, { AxiosResponse } from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

axios.interceptors.response.use(
  (response: AxiosResponse): any => {
    const { status } = response.data
    if (status === 'success') return response.data
    else return undefined
  },
  (err: any) => {
    const { status, data } = err.response

    if (status === 401) {
      Message({ message: 'Please login first!', type: 'warning', center: true })
      router.push({ path: '/login' })
    } else {
      console.log(data.message)
    }
    return Promise.reject(err)
  }
)

export default axios
