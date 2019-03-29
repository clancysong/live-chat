import { MutationTree } from 'vuex'
import { State } from './index'

const mutations: MutationTree<State> = {
  setUser(state, payload) {
    state.user = payload
  },

  setGroups(state, payload) {
    state.groups = payload
  },

  setCurrentGroup(state, payload) {
    state.currentGroup = payload
  }
}

export default mutations
