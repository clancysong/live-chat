import axios, { AxiosResponse } from 'axios'

axios.interceptors.response.use((response: AxiosResponse) => {
  const { status, data, message } = response.data
  if (status === 'success') {
    return data
  } else {
    console.log(message)
    return false
  }
})

export default axios
