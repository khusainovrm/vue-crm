<template>
  <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p class="currency-line" v-for="curr in currency" :key="curr">
            <span>{{getCurrency(curr) | currencyFormat(curr) }}</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name:"bill",
  data: () => ({
    currency: ["RUB", "USD", "EUR"]
  }),
  props: ["rates"],
  computed: {
    base () {
      return this.$store.getters.info.bill/ (this.rates['RUB']) / (this.rates['EUR'])
    }
  },
   methods: {
    getCurrency (curr) {
      return Math.floor(this.base*this.rates[curr])
    }
   }
}
</script>

<style>

</style>
