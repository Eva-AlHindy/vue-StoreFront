<template>
  <modal name="modal-klaviyo" :width="450">
    <p slot="header">
      {{ $t('Klaviyo Newsletter') }}
    </p>
    <div slot="content">
      <form @submit.prevent="subscribe(onSuccesfulSubmission)" novalidate>
        <div class="mb10">
          <p class="h4">
            {{ $t('Sign up to our newsletter and receive a coupon for 10% off!') }}
          </p>
          <base-input
            focus
            type="email"
            name="email"
            v-model="email"
            autocomplete="email"
            :placeholder="$t('E-mail address *')"
            :validations="[
              {
                condition: $v.email.$error && !$v.email.required,
                text: $t('Field is required.')
              },
              {
                condition: !$v.email.email && $v.email.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />
        </div>
        <button-full
          class="mb35"
          type="submit"
          :disabled="this.$v.$invalid"
          @click.native="$v.email.$touch"
        >
          {{ $t('Subscribe') }}
        </button-full>
      </form>
    </div>
  </modal>
</template>
<script>
import KlaviyoSubscriptionStatus  from 'src/modules/vsf-klaviyo/mixins/KlaviyoSubscriptionStatus'
import KlaviyoSubscribe  from 'src/modules/vsf-klaviyo/mixins/KlaviyoSubscribe'
import i18n from '@vue-storefront/i18n'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'

export default {
  mounted () {
    this.$nextTick(() => {
      this.$bus.$emit('modal-show', 'modal-klaviyo')
    })
  },
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    onSuccesfulSubmission (showSubscribed) {
      if (showSubscribed) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('You have been successfully subscribed to our newsletter!'),
          action1: { label: i18n.t('OK') }
        })
      }

      this.$bus.$emit('modal-hide', 'modal-klaviyo')
    }
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput
  },
  mixins: [
    KlaviyoSubscriptionStatus, KlaviyoSubscribe
  ]
}
</script>
