import { MutationTree } from 'vuex'
import { State } from './index'

const mutations: MutationTree<State> = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}

export default mutations
