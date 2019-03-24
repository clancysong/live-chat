import axios from '@/utils/axios'

const URL = '/api/v1'

export default {
  login: (data: {}) => axios.post(`${URL}/login`, data),

  register: (data: {}) => axios.post(`${URL}/register`, data)
}
