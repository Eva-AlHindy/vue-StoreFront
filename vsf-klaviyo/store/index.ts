import { Module } from 'vuex'
import KlaviyoState from '../types/KlaviyoState'
import * as types from './mutation-types'
import config from 'config'
import fetch from 'isomorphic-fetch'
import { processURLAddress, onlineHelper } from '@vue-storefront/core/helpers'

export const klaviyoStore: Module<KlaviyoState, any> = {
  namespaced: true,
  state: {
    totalTvCount: 10,
    isLarryHappy: true,
    isJennyHappy: true,
    isSubscribed: null,
    emailsList:[]
  },
  getters: {
    happyStaff: state => state.isLarryHappy && state.isJennyHappy,
    isSubscribedNewsLetter: state => state.isSubscribed
  },
  mutations: {
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
  },
  actions: {
    // Larry
    removeTv(context, amount) {
      if(context.state.totalTvCount >= amount) {
        context.commit(types.REMOVE_TV, amount)
      }
    },
    async status ({ commit }): Promise<boolean> {
      // fetch(processURLAddress(config.klaviyo.endpoint.subscribe) + '?email=' + encodeURIComponent(email) + '&storeCode=' + config.defaultStoreCode, {
      return new Promise((resolve, reject) => {
        fetch(processURLAddress(config.klaviyo.endpoint.subscribe) + '?email=andreas@kodbruket.se', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        }).then(res => res.json())
          .then(res => {
            if (Array.isArray(res.result) && res.result.length > 0) {
              console.log("actions:klaviyo---res.result:",res.result);
              commit(types.NEWSLETTER_SUBSCRIBE)
              commit(types.EMIALS_LIST,res.result)
              resolve(true)
            } else {
              console.log("actions:klaviyo---unsubscribe",res.result);
              commit(types.NEWSLETTER_UNSUBSCRIBE)
              resolve(false)
            }
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
}
