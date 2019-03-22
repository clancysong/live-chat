import { ActionTree } from 'vuex'
import router from '@/router'
import * as authService from '@/services/auth'
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

  async authorize({ commit }) {
    const rs = await authService.authorize()
    commit('setUser', rs.data)
  },

  async fetchGroups({ commit }, id) {
    const rs = await groupService.fetchGroups()
    commit('setGroups', rs.data)
  }
}

export default actions
