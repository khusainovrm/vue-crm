<template>
<div>
  <div class="page-title">
    <h3>{{'History of records' | localazeFilter }}</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>

  <Loader v-if="loading" />

  <p v-else-if="!records.length" class="center">{{'No records yet' | localazeFilter }} <br>
    <router-link to="/record">{{'Create record' | localazeFilter }}</router-link>
  </p>

  <section v-else>
    <HistoryTable :records="items" />
    <Paginate
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="prevText"
      :next-text="nextText"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      v-model="page"
    />
  </section>
</div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '../mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'


export default {
  name: 'history',
    data: () => ({
      records: [],
      loading: true,
      prevText: '',
      nextText: ''
    }),
  extends:Pie,
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories =  await this.$store.dispatch('fetchCategories')

    this.setUp(categories)
    this.prevText = this.$store.getters.info.locale === 'ru-RU'
    ? 'Назад' : 'Previous'

     this.nextText = this.$store.getters.info.locale === 'ru-RU'
    ? 'Вперед' : 'Next'
  
    this.loading=false
  },
  methods: {
    setUp(categories) {
      this.setupPagination(this.records.map(r => {
        const categoryName = categories.find(cat => cat.id === r.categoryId).title
        const typeClass = r.type === "income" ? 'green' : 'red'
        const typeText = r.type === "income" ? 'Доход' : 'Расход'
        return {...r, categoryName, typeClass, typeText}
      }))

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(cat => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === cat.id && record.type === 'outcome') {
                total += record.amount
              }
              return total
            },0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  },
  watch: {
    '$route'(to){
      if (!to.query.page){
        // кликнули в сайдбаре на История
        this.pageChangeHandler(1);
        this.page = 1;
      }
    }
  }
}
</script>

<style>

</style>
