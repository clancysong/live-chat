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

  changeCurrentGroup(state, group) {
    state.currentGroup = group
  },

  changeCurrentChannel(state, channel) {
    state.currentChannel = channel
  },

  addGroup(state, group) {
    state.joinedGroups.push(group)
  },

  removeFromJoinedGroups(state, id) {
    const { joinedGroups: groups } = state
    const index = groups.findIndex(g => g.id === id)

    if (index >= 0) groups.splice(index, 1)
  },

  removeFromPublicGroups(state, id) {
    const { publicGroups: groups } = state
    const index = groups.findIndex(g => g.id === id)

    if (index >= 0) groups.splice(index, 1)
  },

  updateFromPublicGroups(state, group) {
    const { publicGroups: groups } = state
    const index = groups.findIndex(g => g.id === group.id)

    if (index >= 0) groups.splice(index, 1, group)
  },

  SOCKET_USER_COME_ONLINE(state, user) {
    if (state.currentGroup) {
      const member = state.currentGroup.members.find(m => m.id === user.id)

      if (member) member.status = 'online'
    }
  },

  SOCKET_USER_COME_OFFLINE(state, user) {
    if (state.currentGroup) {
      const member = state.currentGroup.members.find(m => m.id === user.id)

      if (member) member.status = 'offline'
    }
  },

  SOCKET_MESSAGE_RECEIVE(state, message) {
    switch (message.chat_type) {
      case 'group': {
        if (state.currentChannel) state.currentChannel.messages.push(message)
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
