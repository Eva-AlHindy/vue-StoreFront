import KlaviyoState from '../types/KlaviyoState'

// @deprecated moved to store
export const KlaviyoComponent = {
  name: 'KlaviyoComponent',
  computed: {
    totalTvCount () {
      return this.$store.state.klaviyo.totalTvCount
    }
  }
}
