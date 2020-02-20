import { GetterTree } from 'vuex'
import KlaviyoState from '../types/KlaviyoState'
import RootState from '@vue-storefront/core/types/RootState'
import config from 'config'

const getters: GetterTree<KlaviyoState, RootState> = {
  happyStaff: state => state.isLarryHappy && state.isJennyHappy,
  isSubscribedNewsLetter: state => state.isSubscribed
}

export default getters
