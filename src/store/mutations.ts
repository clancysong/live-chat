import { MutationTree } from 'vuex'
import { State } from './index'

const mutations: MutationTree<State> = {
  setUser(state, payload) {
    state.user = payload
  },

  setGroup(state, payload) {
    state.group = payload
  }
}

export default mutations
