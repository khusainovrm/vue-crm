<template>
<div>
  <div class="page-title">
    <h3>{{'Bill_plan' | localazeFilter }}</h3>
    <h4>{{info.bill | currencyFormat() }}</h4>
  </div>

  <Loader v-if="loading" />

  <p v-else-if="!categories.length" class="center">Категории еще не созданы. <br>
    <router-link to="/categories">{{'Add category' | localazeFilter }}</router-link>
  </p>

  <section v-else>
    <div v-for="c in categories" :key="c.id">
      <p>
        <strong>{{c.title}}:</strong>
        {{c.spent | currencyFormat}} из {{c.limit | currencyFormat}}
      </p>
      <div class="progress" v-tooltip="c.tooltip">
        <div
            class="determinate"
            :class="[c.progressColor]"
            :style="{width: c.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {mapGetters} from "vuex"
import currencyFilter from '@/filter/currencyFilter'
import localizeFilter from '../filter/localaze.filter'

export default {
  data: () => ({
    categories: [],
    loading: true
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    // eslint-disable-next-line no-unused-vars
    const records = await this.$store.dispatch("fetchRecords")
    const categories = await this.$store.dispatch("fetchCategories")

    this.categories = categories.map(cat => {
      const spent = records
        .filter(c => c.categoryId === cat.id)
        .filter(o => o.type === "outcome")
        .reduce((total, record) => {
          return total+= +record.amount
        }, 0)

      const percent = 100 * spent /cat.limit
      const progressPercent = percent>100? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : "red"

      const tooltipValue = cat.limit - spent
      const tooltip = `${tooltipValue < 0 ? localizeFilter('Excess over the limit') : localizeFilter('Balance')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {...cat, spent, progressPercent, progressColor, tooltip}

    })


    this.loading = false
  }

}
</script>

<style>

</style>
