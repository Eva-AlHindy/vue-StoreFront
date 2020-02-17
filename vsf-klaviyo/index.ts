import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { afterRegistration} from './hooks/afterRegistration'
import KlaviyoList from './components/KlaviyoList.vue';
import { klaviyoStore } from './store'
// const KlaviyoStore = {
//   namespaced: true,
//   state: {
//     key: null
//   }
// }
export const KEY = 'klaviyo'
export const cacheStorage = initCacheStorage(KEY)
const klavyioRoutes = [{ name: 'klaviyo', path: '/klaviyo', component: KlaviyoList, alias: '/klaviyo.html' }];

export const KlaviyoModule: StorefrontModule = function ({app, store, router, moduleConfig, appConfig}) {
  console.log("hallo from KlaviyoModule")
  console.log("Klaviyo.public_key:",appConfig.klaviyo.public_key);
  store.registerModule( KEY , klaviyoStore );
  console.log("store:",klaviyoStore );

  // afterRegistration(appConfig, module);
  router.addRoutes(klavyioRoutes) // adding routes here
  router.beforeEach((to, from, next) => { next() })
}
