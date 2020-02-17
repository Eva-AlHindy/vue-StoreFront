// import rootStore from '@vue-storefront/core/store'
import Vue from 'vue'
import { isServer } from '@vue-storefront/core/helpers'
import fetch from 'isomorphic-fetch'
import { processURLAddress, onlineHelper } from '@vue-storefront/core/helpers'


export function afterRegistration (config, store) {
  if (!isServer && config.klaviyo && config.klaviyo.public_key) {
    console.log("Klaviyo.public_key from afterRegistration hook function:",config.klaviyo.public_key);
    console.log("test1:",config.klaviyo.endpoint.subscribe);
      // fetch(processURLAddress(config.klaviyo.endpoint.subscribe) + '?email=' + encodeURIComponent(email) + '&storeCode=' + config.defaultStoreCode, {
      return new Promise((resolve, reject) => {
        console.log("test2:",config.klaviyo.endpoint.subscribe);

        fetch(processURLAddress(config.klaviyo.endpoint.subscribe) + '?email=eva@kodbruket.se', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        }).then(res => res.json())
          .then(res => {
            if (Array.isArray(res.result) && res.result.length > 0) {
              console.log("actions:klaviyo---subscribe -afterRegistration:",res.result);
              resolve(true)
            } else {
              console.log("actions:klaviyo---unsubscribe",res.result);
              resolve(false)
            }
          }).catch(err => {
            console.log("error",err);
            reject(err)
          })
      })

  }
}
// export async function afterRegistration({ Vue, config, store, isServer }) {
//   if (!isServer && config.klaviyo && config.klaviyo.public_key) {
//     await store.dispatch('klaviyo/loadCustomerFromCache')
//
//     if (!store.state.klaviyo.customer) {
//       const receivedData = await Vue.prototype.$db.checkoutFieldsCollection.getItem('personal-details')
//       if (receivedData) {
//         store.dispatch('klaviyo/identify', { personalDetails: receivedData })
//       }
//     }
//
//     Vue.prototype.$bus.$on('user-after-loggedin', receivedData => {
//       store.dispatch('klaviyo/identify', { user: receivedData })
//     })
//
//     Vue.prototype.$bus.$on('checkout-after-personalDetails', receivedData => {
//       if (!store.state.klaviyo.customer && receivedData.hasOwnProperty('email')) {
//         store.dispatch('klaviyo/identify', { personalDetails: receivedData })
//       }
//     })
//
//     Vue.prototype.$bus.$on('user-before-logout', () => {
//       store.dispatch('klaviyo/resetCustomer')
//     })
//
//     Vue.prototype.$bus.$on('product-after-single', event => {
//       store.dispatch('klaviyo/productViewed', event.product)
//     })
//
//     Vue.prototype.$bus.$on('cart-before-add', event => {
//       store.dispatch('klaviyo/productAddedToCart', event.product)
//     })
//
//     Vue.prototype.$bus.$on('cart-before-delete', event => {
//       let beforeDelete = event.items
//       Vue.prototype.$bus.$on('cart-after-delete', event => {
//         let deleted = beforeDelete.filter(x => !event.items.includes(x))
//
//         if (deleted.length) {
//           store.dispatch('klaviyo/productRemovedFromCart', deleted[0])
//         }
//       })
//     })
//
//     Vue.prototype.$bus.$on('checkout-after-mounted', event => { // TODO: maybe bind it to another event
//       const onCheckoutStarted = event => {
//         Vue.prototype.$bus.$off('cart-after-updatetotals', onCheckoutStarted)
//         let cart = rootStore.state.cart
//         store.dispatch('klaviyo/checkoutStarted', cart)
//       }
//
//       Vue.prototype.$bus.$on('cart-after-updatetotals', onCheckoutStarted)
//     })
//
//     Vue.prototype.$bus.$on('order-after-placed', event => {
//       let cart = rootStore.state.cart
//       let order = {
//         ...event.order,
//         cart
//       }
//       store.dispatch('klaviyo/orderPlaced', order)
//     })
//   }
// }
