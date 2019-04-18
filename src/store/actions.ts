import { ActionTree } from 'vuex'
import router from '@/router'
import authService from '@/services/auth'
import userService from '@/services/user'
import groupService from '@/services/group'
import userGroupService from '@/services/userGroup'
import { State } from './index'

const actions: ActionTree<State, any> = {
  async login({ commit }, data: {}) {
    const rs = await authService.login(data)

    if (rs) {
      commit('setUser', rs.data)
      router.push({ path: '/' })
    }
  },

  async register({ commit }, data: {}) {
    const rs = await authService.register(data)

    if (rs) {
      commit('setUser', rs.data)
      router.push({ path: '/' })
    }
  },

  async fetchUserInfo({ commit }) {
    const rs = await userService.fetchUserInfo()

    commit('setUser', rs.data)
  },

  async fetchPublicGroups({ commit }) {
    const rs = await groupService.fetchPublicGroups()

    commit('setPublicGroups', rs.data)
  },

  async fetchJoinedGroups({ commit }) {
    const rs = await userGroupService.fetchJoinedGroups()

    commit('setJoinedGroups', rs.data)
  },

  async fetchGroupInfo({ commit }, id: number) {
    const rs = await groupService.fetchGroupInfo(id)

    commit('setCurrentGroup', rs.data)
  },

  async joinGroup({ state }, groupId: number) {
    if (state.user) {
      await userGroupService.joinGroup({ user_id: state.user.id, group_id: groupId })
    }
  }
}

export default actions
