import axios from '@/utils/axios'

const URL = '/api/v1/self'

export default {
  fetchUserInfo: () => axios.get(URL),

  updateUserInfo: (data: any) => axios.put(URL, data),

  fetchJoinedGroups: () => axios.get(`${URL}/groups`),

  joinGroup: (way: string, data: {}) => axios.post(`${URL}/groups?way=${way}`, data),

  leaveGroup: (id: number) => axios.delete(`${URL}/groups/${id}`),

  fetchFriends: () => axios.get(`${URL}/friends`),

  removeFriend: (id: number) => axios.delete(`${URL}/friends/${id}`),

  fetchFriendRequests: () => axios.get(`${URL}/friend_requests`),

  sendFriendRequest: (data: {}) => axios.post(`${URL}/friend_requests`, data),

  handleFriendRequest: (id: number, accept: boolean) => axios.delete(`${URL}/friend_requests/${id}?accept=${accept}`),

  createPrivateChat: (data: {}) => axios.post(`${URL}/private_chats`, data),

  fetchPrivateChats: () => axios.get(`${URL}/private_chats`),

  fetchPrivateChatInfo: (uuid: string) => axios.get(`${URL}/private_chats/${uuid}`)
}
