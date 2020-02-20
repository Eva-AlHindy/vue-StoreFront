import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import KlaviyoState from '../types/KlaviyoState'
import config from 'config'

const mutations: MutationTree<KlaviyoState> = {
  // Jenny
  [types.REMOVE_TV](state, amount) {
    state.totalTvCount-= amount
  },
  [types.NEWSLETTER_SUBSCRIBE] (state) {
    state.isSubscribed = true
  },
  [types.NEWSLETTER_UNSUBSCRIBE] (state) {
    state.isSubscribed = false
  },
  [types.EMIALS_LIST] (state ,payload) {
    state.emailsList = payload
  }
}

export default mutations
