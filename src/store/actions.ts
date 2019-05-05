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
  },

  async register({ commit }, data: {}) {
    const rs = await authService.register(data)

    if (rs) {
      commit('setUser', rs.data)
      router.push({ path: '/' })
    }
  },

  async fetchUserInfo({ commit }) {
    const rs = await selfService.fetchUserInfo()

    commit('setUser', rs.data)
  },

  async fetchPublicGroups({ commit }) {
    const rs = await groupService.fetchPublicGroups()

    commit('setPublicGroups', rs.data)
  },

  async fetchJoinedGroups({ commit }) {
    const rs = await selfService.fetchJoinedGroups()

    commit('setJoinedGroups', rs.data)
  },

  async fetchGroupInfo({ commit }, id: number) {
    const rs = await groupService.fetchGroupInfo(id)

    commit('setCurrentGroup', rs.data)
  },

  async joinGroup({ state, commit }, group: Group) {
    if (state.user) {
      const rs: any = await selfService.joinGroup({ user_id: state.user.id, group_id: group.id })

      if (rs.code === 100) commit('addGroup', group)
      router.push(`/groups/${group.id}`)

      return rs
    }
  },

  async createGroup({ commit }, data) {
    const { data: group } = await groupService.createGroup(data)

    commit('addGroup', group)
    router.push(`/groups/${group.id}`)
  }
}

export default actions
