import axios from '@/utils/axios'

const URL = '/api/v1/self'

export default {
  fetchUserInfo: () => axios.get(URL),

  fetchJoinedGroups: () => axios.get(`${URL}/groups`),

  joinGroup: (data: {}) => axios.post(`${URL}/groups`, data)
}
