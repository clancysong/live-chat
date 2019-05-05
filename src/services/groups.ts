import axios from '@/utils/axios'

const URL = '/api/v1/groups'

export default {
  fetchPublicGroups: () => axios.get(URL),

  fetchGroupInfo: (id: number) => axios.get(`${URL}/${id}`),

  createGroup: (data: {}) => axios.post(URL, data),
}
