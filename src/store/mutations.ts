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

  addGroup(state, group) {
    state.joinedGroups.push(group)
  },

  SOCKET_MESSAGE_RECEIVE(state, message) {
    switch (message.chat_type) {
      case 'group': {
        if (state.currentGroup) state.currentGroup.messages.push(message)
        break
      }

      case 'private_chat': {
        if (state.currentPrivateChat) state.currentPrivateChat.messages.push(message)
        break
      }

      default: {
        break
      }
    }
  }
}

export default mutations
