<template>
  <div class="customer">
    <h1>I'm a customer</h1>
    <p>I see {{ totalTvCount }} TVs!</p>
    <p v-show="!totalTvCount">I can't buy any..</p>
    <p v-show="happyStaff">The staff seems happy!</p>
    <p v-show="!totalTvCount">I can't buy any..</p>
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
    }
  },
  methods: {
    buyTv() {
      console.log("buyTV - METHOD")
      this.$store.dispatch('klaviyo/removeTv',1)
    },
  buyTwoTvs() {
      // Dispatch the action to buy two TVs
      this.$store.dispatch('klaviyo/removeTv', 2)
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
