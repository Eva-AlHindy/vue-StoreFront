import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import KlaviyoState from '../../types/klaviyoState'
import newsletterActions from './newsletterActions'

const actions: ActionTree<KlaviyoState, RootState> = {
  ...newsletterActions,
}

export default actions
