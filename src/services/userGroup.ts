import axios from '@/utils/axios'

const URL = '/api/v1/userGroup'

export default {
  fetchJoinedGroups: () => axios.get(URL),

  joinGroup: (data: {}) => axios.post(URL, data)
}
