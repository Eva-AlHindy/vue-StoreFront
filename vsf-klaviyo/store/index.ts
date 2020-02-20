import { Module } from 'vuex'
import KlaviyoState from '../types/KlaviyoState'
import * as types from './mutation-types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const klaviyoStore: Module<KlaviyoState, any> = {
  namespaced: true,
  state: {
    totalTvCount: 10,
    isLarryHappy: true,
    isJennyHappy: true,
    isSubscribed: false,
    emailsList:[]
  },
  getters,
  mutations,
  actions,
}
