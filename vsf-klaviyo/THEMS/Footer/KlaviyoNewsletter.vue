<template>
  <div class="klaviyo-newsletter" v-show="!showSubscribed">
    <div class="container">
      <div class="newsletter-content m0 row middle-sm start-md">
        <div class="col-md-8 col-xs-12">
          <h3 class="h3 cl-accent weight-400 m0" style="color:#ff0000">
            {{ $t('Subscribe to the Klaviyo Newsletter and receive a coupon for 10% off') }}
          </h3>
        </div>
        <div class="newsletter-button col-md-4 col-xs-12 end-md">
          <button-outline
            @click.native="showNewsletterPopup"
            color="dark"
            data-testid="openNewsletterButton"
          >
            {{ $t('Subscribe') }}
          </button-outline>
        </div>
      </div>
    </div>
    <newsletter-popup v-if="loadNewsletterPopup" />
  </div>
</template>

<script>
import KlaviyoSubscriptionStatus  from 'src/modules/vsf-klaviyo/mixins/KlaviyoSubscriptionStatus'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import { mapState } from 'vuex'
const NewsletterPopup = () => import(/* webpackChunkName: "vsf-klaviyo-modal" */ 'theme/components/core/KlaviyoNewsletterPopup.vue')

export default {
  name: 'KlaviyoNewsletter',
  data () {
    return {
      loadNewsletterPopup: false
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.ui.newsletterPopup
    })
  },
  methods: {
    showNewsletterPopup () {
      this.loadNewsletterPopup = true
      this.$bus.$emit('modal-show', 'modal-klaviyo')
    }
  },
  mixins: [KlaviyoSubscriptionStatus],
  components: {
    ButtonOutline,
    NewsletterPopup
  }
}
</script>

<style scoped>
  .klaviyo-newsletter{
    background: #cccccc;
    padding: 25px;
  }
  @media (min-width: 767px) and (max-width: 1200px){
    .button-outline{
      min-width: 100%;
    }
  }
  @media (max-width: 767px) {
    .h3 {
      font-size: 18px;
      text-align: center;
    }
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }
</style>
