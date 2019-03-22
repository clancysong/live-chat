import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import List from '@/utils/List'

Vue.use(Vuex)

const store = new Vuex.Store({ state, getters, mutations, actions })

export default store

export interface State {
  user: {} | null
  groups: List
}
