import { ActionTree } from 'vuex'
import router from '@/router'
import authService from '@/services/auth'
import selfService from '@/services/self'
import groupService from '@/services/groups'
import Group from '@/models/Group'
import { State } from './index'

const actions: ActionTree<State, any> = {
  async login({ commit }, data: {}) {
    const rs = await authService.login(data)

    if (rs) {
      commit('setUser', rs.data)
      router.push({ path: '/' })
    }

    return rs
  },

  async register({ commit }, data: {}) {
    const rs = await authService.register(data)

    if (rs) {
      commit('setUser', rs.data)
      router.push({ path: '/' })
    }

    return rs
  },

  async fetchUserInfo({ commit }) {
    const rs = await selfService.fetchUserInfo()

    commit('setUser', rs.data)

    return rs
  },

  async fetchPublicGroups({ commit }) {
    const rs = await groupService.fetchPublicGroups()

    commit('setPublicGroups', rs.data)
  },

  async fetchJoinedGroups({ commit }) {
    const rs = await selfService.fetchJoinedGroups()

    commit('setJoinedGroups', rs.data)
  },

  async fetchGroupInfo({ commit }, uuid: string) {
    const { data } = await groupService.fetchGroupInfo(uuid)

    commit('changeCurrentGroup', data)

    return data
  },

  async joinGroup({ state, commit }, group: Group) {
    if (state.user) {
      const rs: any = await selfService.joinGroup('id', { user_id: state.user.id, group_id: group.id })

      if (rs.code === 100) commit('addGroup', group)
      router.push(`/groups/${group.uuid}`)

      return rs
    }
  },

  async joinGroupByInviteCode({ state, commit }, inviteCode) {
    const rs: any = await selfService.joinGroup('invite_code', { invite_code: inviteCode })
    const { code, data: group } = rs

    if (code === 100) commit('addGroup', group)
    if (code === 100 || code === 102) router.push(`/groups/${group.uuid}`)

    return rs
  },

  async leaveGroup({ commit }, id) {
    await selfService.leaveGroup(id)

    commit('removeFromJoinedGroups', id)
  },

  async createGroup({ commit }, data) {
    const { data: group } = await groupService.createGroup(data)

    commit('addGroup', group)
    router.push(`/groups/${group.uuid}`)
  },

  async removeGroup({ commit }, id) {
    await groupService.removeGroup(id)

    commit('removeFromJoinedGroups', id)
    commit('removeFromPublicGroups', id)
  },

  async fetchChannelInfo({ state }, uuid) {
    const { data: channel } = await groupService.fetchChannelInfo(uuid)

    state.currentChannel = channel
  },

  async createChannel({ state }, { groupId, channelInfo }) {
    const { data: channel } = await groupService.createChannel(groupId, channelInfo)

    if (state.currentGroup) state.currentGroup.channels.push(channel)
  },

  async removeChannel({ state }, id) {
    await groupService.removeChannel(id)

    if (state.currentGroup) {
      const { channels } = state.currentGroup

      channels.splice(channels.findIndex(c => c.id === id), 1)
    }
  },

  async fetchFriends({ state }) {
    const { data: friends } = await selfService.fetchFriends()

    state.friends = friends
  },

  async removeFriend({ state }, id) {
    const { code }: any = await selfService.removeFriend(id)

    if (code === 100) {
      const { friends } = state

      friends.splice(friends.findIndex(i => i.id === id), 1)
    }
  },

  async fetchFriendRequest({ state }) {
    const { data: friendRequests } = await selfService.fetchFriendRequests()

    state.friendRequests = friendRequests
  },

  async sendFriendRequest(_, request) {
    return await selfService.sendFriendRequest(request)
  },

  async handleFriendRequest({ state }, params) {
    const { id, accept } = params
    const { code, data }: any = await selfService.handleFriendRequest(id, accept)

    const { friendRequests } = state

    friendRequests.splice(friendRequests.findIndex(i => i.id === id), 1)
    if (accept && code === 100) state.friends.push(data)
  },

  async createPrivateChat({ state }, chat) {
    const { data } = await selfService.createPrivateChat(chat)

    if (!state.privateChats.find((c: any) => c.uuid === data.uuid)) {
      state.privateChats.push(data)
    }

    return { data }
  },

  async fetchPrivateChats({ state }) {
    const { data } = await selfService.fetchPrivateChats()

    state.privateChats = data
  },

  async fetchPrivateChatInfo({ state }, uuid) {
    const { data } = await selfService.fetchPrivateChatInfo(uuid)

    state.currentPrivateChat = data
  }
}

export default actions
