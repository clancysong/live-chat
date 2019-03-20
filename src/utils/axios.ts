import axios, { AxiosResponse } from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err: any) => {
    const { status, data } = err.response

    if (status === 401) {
      Message({ message: '请先登录！', type: 'warning', center: true })
      router.push({ path: '/login' })
    } else {
      console.log(data.message)
    }
    return Promise.reject(err)
  }
)

export default axios
