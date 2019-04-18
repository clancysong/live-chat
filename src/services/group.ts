import axios from '@/utils/axios'

const URL = '/api/v1/group'

export default {
  fetchPublicGroups: () => axios.get(`${URL}`),

  fetchGroupInfo: (id: number) => axios.get(`${URL}/${id}`)
}
