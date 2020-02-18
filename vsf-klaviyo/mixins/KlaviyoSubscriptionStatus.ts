import { required, email } from 'vuelidate/lib/validators'
import config from 'config'

export default {
  name: 'KlaviyoSubscriptionStatus',
  data () {
    return {
      email: '',
      user: {
        isSubscribed: false
      }
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    showSubscribed () {
      console.log("showSubscribed from mixins")
      return this.$store.getters['klaviyo/isSubscribedNewsLetter'] && this.user.isSubscribed
    }
  },
  methods: {
    onLoggedIn () {
      this.email = this.$store.state.user.current.email
      console.log("user login:",this.email);
      if (this.$store.dispatch('klaviyo/status',this.email)){
        this.user.isSubscribed = true
      }
    }
  },
  beforeMount () {
    // the user might already be logged in, so check the subscription status
    if (this.$store.state.user.current) this.onLoggedIn()
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
  }
}
