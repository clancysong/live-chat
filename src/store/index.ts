import Vue from 'vue'
import Vuex from 'vuex'
import { Route } from 'vue-router'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import User from '@/models/User'
import Group from '@/models/Group'
import FriendRequest from '@/models/FriendRequest'
import Channel from '@/models/Channel'

Vue.use(Vuex)

const store = new Vuex.Store({ state, getters, mutations, actions })

export default store

export interface State {
  currentView: Route | null
  user: User | null
  publicGroups: Group[]
  joinedGroups: Group[]
  currentGroup: Group | null
  currentChannel: Channel | null
  privateChats: any
  currentPrivateChat: any
  friends: User[]
  friendRequests: FriendRequest[]
  sensitiveWords: any[]
  peerConnection: RTCPeerConnection | null
}
