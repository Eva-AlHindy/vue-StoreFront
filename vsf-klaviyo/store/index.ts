import { Module } from 'vuex'
import KlaviyoState from '../types/KlaviyoState'
import * as types from './mutation-types'

export const klaviyoStore: Module<KlaviyoState, any> = {
  namespaced: true,
  state: {
    totalTvCount: 10,
    isLarryHappy: true,
    isJennyHappy: true
  },
  getters: {
    happyStaff: state => state.isLarryHappy && state.isJennyHappy
  },
  mutations: {
    // Jenny
    [types.REMOVE_TV](state, amount) {
      state.totalTvCount-= amount
    }
  },
  actions: {
    // Larry
    removeTv(context, amount) {
      if(context.state.totalTvCount >= amount) {
        context.commit(types.REMOVE_TV, amount)
      }
    }
  }
}

//   [types.TV_DEL_ITEM] (state) {
//     console.log("buyTv - mutations")
//     state.totalTvCount--
//   }
// },
// actions: {
//   removeItem (context, amount) {
//     if(context.state.totalTvCount >= amount) {
//       console.log("buyTv - action")
//       context.commit(types.TV_DEL_ITEM, amount)
//     }
//   }
// }
