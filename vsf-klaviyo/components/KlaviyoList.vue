<template>
  <div class="customer">
    <h1>I'm a customer</h1>
    <p>I see {{ totalTvCount }} TVs!</p>
    <p v-show="!totalTvCount">I can't buy any..</p>
    <p v-show="happyStaff">The staff seems happy!</p>
    <p v-show="showSubscribed">Subscribed to the News Letter</p>
    <p v-show="showSubscribed">The Emails list is: {{ showEmailsList }}</p>
    <button
      :disabled="!totalTvCount"
      @click="buyTv">
      Buy TV
    </button>
    <button
      :disabled="totalTvCount < 2"
      @click="buyTwoTvs">
      Buy Two TVs
    </button>
    <button @click="showSubscribe"> Show Subscribe </button>
  </div>
</template>

<script>

module.exports = {
  name: 'Klaviyo',
  computed: {
    totalTvCount () {
      return this.$store.state.klaviyo.totalTvCount
    },
    happyStaff () {
      // Check in the getter if the staff is happy
      return this.$store.getters['klaviyo/happyStaff']
    },
    showSubscribed () {
      return this.$store.getters['klaviyo/isSubscribedNewsLetter']
    },
    showEmailsList() {
      return this.$store.state.klaviyo.emailsList
    }
  },
  methods: {
    buyTv() {
      console.log("buyTV - METHOD")
      this.$store.dispatch('klaviyo/removeTv',1)
    },
    buyTwoTvs() {
      console.log("buyTV - METHOD")
      this.$store.dispatch('klaviyo/removeTv',2)
    },
  showSubscribe() {
      this.$store.dispatch('klaviyo/status')
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
