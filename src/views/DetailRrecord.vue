<template>
<div>
  <Loader v-if="loading" />
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{ 'Bill_history' | localazeFilter }}</router-link>
      <a class="breadcrumb" @click.prevent>
        {{ record.type === 'outcome'? 'Outcome' : 'Income' | localazeFilter }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div
          class="card"
          :class="[record.recordType]"

        >
          <div class="card-content white-text">
            <p>{{ 'Outcome' | localazeFilter }}: {{record.description}} </p>
            <p>{{ 'Amount' | localazeFilter }}: {{record.amount | currencyFormat}} </p>
            <p>{{ 'Category1' | localazeFilter }}: {{record.categoryName}}</p>
            <small>{{record.date | date("datetime") }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="center">Запись с id=<strong>{{$route.params.id}}</strong> не найдена.</p>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import localazeFilter from '../filter/localaze.filter'

export default {
  name: "Detailed",
  data: () => ({
    record: null,
    loading: true,
    typeCard: ''
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)


    const recordType = record.type==='outcome'
      ? 'red'
      :'green'

    this.record = {
      ...record,
      categoryName: category.title,
      recordType
    }
    this.loading = false

  }

}
</script>

<style>

</style>
