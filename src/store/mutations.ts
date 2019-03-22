import { MutationTree } from 'vuex'
import { State } from './index'

const mutations: MutationTree<State> = {
  setUser(state, payload) {
    state.user = payload
  },

  setGroups(state, payload) {
    state.groups.init(payload)
  }
}

export default mutations
