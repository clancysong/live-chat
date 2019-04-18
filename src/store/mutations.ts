import { MutationTree } from 'vuex'
import { State } from './index'

const mutations: MutationTree<State> = {
  setCurrentView(state, route) {
    state.currentView = route
  },

  setUser(state, user) {
    state.user = user
  },

  setPublicGroups(state, groups) {
    state.publicGroups = groups
  },

  setJoinedGroups(state, groups) {
    state.joinedGroups = groups
  },

  setCurrentGroup(state, group) {
    state.currentGroup = group
  },

  SOCKET_MESSAGE_RECEIVE(state, message) {
    if (state.currentGroup) state.currentGroup.messages.push(message)
  }
}

export default mutations
