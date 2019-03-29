import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import User from '@/models/User'
import Group from '@/models/Group'

Vue.use(Vuex)

const store = new Vuex.Store({ state, getters, mutations, actions })

export default store

export interface State {
  user: User | null
  groups: Group[] | null
  currentGroup: Group | null
}
