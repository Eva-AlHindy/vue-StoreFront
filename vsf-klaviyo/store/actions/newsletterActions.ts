import * as types from '../mutation-types'
import config from 'config'
import fetch from 'isomorphic-fetch'
import { processURLAddress, onlineHelper } from '@vue-storefront/core/helpers'

const newsletterActions = {
  // Larry
  removeTv(context, amount) {
    if(context.state.totalTvCount >= amount) {
      context.commit(types.REMOVE_TV, amount)
    }
  },
  async status ({ commit },email): Promise<boolean> {
    // fetch(processURLAddress(config.klaviyo.endpoint.subscribe) + '?email=' + encodeURIComponent(email) + '&storeCode=' + config.defaultStoreCode, {
    return new Promise((resolve, reject) => {
      fetch(processURLAddress(config.klaviyo.endpoint.subscribe) + '?email='+email, {
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
  },

  subscribe ({ commit, state }, email): Promise<Response> {
    if (!state.isSubscribed) {
      return new Promise((resolve, reject) => {
        fetch(config.klaviyo.endpoint.subscribe, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify({ email })
        }).then(res => {
          console.log("You have subscribed successfully");
          commit(types.NEWSLETTER_SUBSCRIBE)

          // if (!state.customer) {
          //   let customer = mapCustomer({ email })
          //   commit(types.SET_CUSTOMER, customer)
          // }

          resolve(res)
        }).catch(err => {
          console.log("You have not subscribed, something went wrong.");
          reject(err)
        })
      })
    }
  },

  unsubscribe ({ commit, state }, email): Promise<Response> {
    if (state.isSubscribed) {
      return new Promise((resolve, reject) => {
        fetch(config.klaviyo.endpoint.subscribe, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify({ email })
        }).then(res => {
          commit(types.NEWSLETTER_UNSUBSCRIBE)

          // if (!rootStore.state.user.current || !rootStore.state.user.current.email) {
          //   commit(types.SET_CUSTOMER, null)
          // }

          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default newsletterActions
