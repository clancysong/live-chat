import { MutationTree } from 'vuex'
import { State } from './index'

const mutations: MutationTree<State> = {
  setUser(state, user) {
    state.user = user
  },

  setGroups(state, groups) {
    state.groups = groups
  },

  setCurrentGroup(state, group) {
    state.currentGroup = group
  },

  addMessage(state, message) {
    if (state.currentGroup) state.currentGroup.messages.push(message)
  }
}

export default mutations
