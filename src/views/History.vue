<template>
<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>

  <Loader v-if="loading" />

  <p v-else-if="!records.length" class="center">Записей пока нет. <br>
    <router-link to="/record">Создать запись</router-link>
  </p>

  <section v-else>
    <HistoryTable :records="items" />
    <Paginate
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
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


export default {
  name: 'history',
    data: () => ({
      records: [],
      loading: true
    }),
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories =  await this.$store.dispatch('fetchCategories')


    this.setupPagination(this.records.map(r => {
      const categoryName = categories.find(cat => cat.id === r.categoryId).title
      const typeClass = r.type === "income" ? 'green' : 'red'
      const typeText = r.type === "income" ? 'Доход' : 'Расход'
      return {...r, categoryName, typeClass, typeText}
    }))

    this.pageChangeHandler()
    this.loading=false
  }
}
</script>

<style>

</style>
