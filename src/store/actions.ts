import { ActionTree, Commit } from 'vuex'
import * as authService from '@/services/auth'
import { State } from './index'

const actions: ActionTree<State, any> = {
  async login(context, data: {}) {
    const rs = await authService.login(data)
  },
  async register(context, data: {}) {
    const rs = await authService.register(data)
  }
}

export default actions
