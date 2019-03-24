import axios from '@/utils/axios'

const URL = '/api/v1/user'

export default {
  fetchUserInfo: () => axios.get(URL)
}
