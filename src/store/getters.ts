import { GetterTree } from 'vuex'
import { State } from './index'

const getters: GetterTree<State, any> = {
  getCurrentGroup: state => (id: number) => state.groups.get(id)
}

export default getters
