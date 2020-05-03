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
    <HistoryTable :records="records" />
  </section>

</div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
    data: () => ({
      records: [],
      loading: true
    }),
  components: {
    HistoryTable
  },
  async mounted() {

    const categories =  await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')

    this.records = records.map(r => {
      const categoryName = categories.find(cat => cat.id === r.categoryId).title
      const typeClass = r.type === "income" ? 'green' : 'red'
      const typeText = r.type === "income" ? 'Доход' : 'Расход'
      return {...r, categoryName, typeClass, typeText}
    })

    this.loading=false
  }
}
</script>

<style>

</style>
