import axios from '@/utils/axios'

const URL = '/api/v1/users'

export default {
  fetchUserInfo: () => axios.get(`${URL}/self`),

  fetchJoinedGroups: () => axios.get(`${URL}/groups`),

  joinGroup: (data: {}) => axios.post(`${URL}/groups`, data)
}
