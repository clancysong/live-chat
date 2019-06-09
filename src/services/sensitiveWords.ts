import axios from '@/utils/axios'

const URL = '/api/v1/sensitive_words'

export default {
  fetchWords: () => axios.get(URL),

  createWord: (data: any) => axios.post(URL, data),

  removeWord: (id: number) => axios.delete(`${URL}/${id}`)
}
