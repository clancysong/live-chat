import { ActionTree } from 'vuex'
import router from '@/router'
import authService from '@/services/auth'
import userService from '@/services/user'
import groupService from '@/services/group'
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

  async fetchGroups({ commit }) {
    const rs = await groupService.fetchGroups()

    commit('setGroups', rs.data)
  },

  async fetchGroupInfo({ commit }, id: number) {
    const rs = await groupService.fetchGroupInfo(id)

    commit('setCurrentGroup', rs.data)
  }
}

export default actions
