import { MutationTree } from 'vuex'
import { State } from './index'

const mutations: MutationTree<State> = {
  setCurrentView(state, route) {
    state.currentView = route
  },

  setUser(state, user) {
    state.user = user
  },

  setGroups(state, groups) {
    state.groups = groups
  },

  setCurrentGroup(state, group) {
    state.currentGroup = group
  },

  SOCKET_MESSAGE_RECEIVE(state, message) {
    if (state.currentGroup) state.currentGroup.messages.push(message)
  }
}

export default mutations
