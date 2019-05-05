import axios from '@/utils/axios'

const URL = '/api/v1/self'

export default {
  fetchUserInfo: () => axios.get(URL),

  fetchJoinedGroups: () => axios.get(`${URL}/groups`),

  joinGroup: (data: {}) => axios.post(`${URL}/groups`, data),

  fetchFriends: () => axios.get(`${URL}/friends`),

  fetchFriendRequests: () => axios.get(`${URL}/friend_requests`),

  sendFriendRequest: (data: {}) => axios.post(`${URL}/friend_requests`, data),

  handleFriendRequest: (id: number, accept: boolean) => axios.delete(`${URL}/friend_requests/${id}?accept=${accept}`)
}
