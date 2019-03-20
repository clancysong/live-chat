import { ActionTree } from 'vuex'
import router from '@/router'
import * as authService from '@/services/auth'
import { State } from './index'

const actions: ActionTree<State, any> = {
  async login(context, data: {}) {
    const rs = await authService.login(data)
    if (rs) router.push({ path: '/' })
  },
  async register(context, data: {}) {
    const rs = await authService.register(data)
    if (rs) router.push({ path: '/' })
  },
  async authorize(context) {
    const rs = await authService.authorize()
    context.commit('setUserInfo', rs.data)
  }
}

export default actions
