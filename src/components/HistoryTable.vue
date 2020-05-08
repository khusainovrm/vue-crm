<template>
<div>

  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'Amount' | localazeFilter }}</th>
      <th>{{'Record time' | localazeFilter }}</th>
      <th>{{'Category' | localazeFilter }}</th>
      <th>{{'Type' | localazeFilter }}</th>
      <th>{{'Open' | localazeFilter }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(r, index) in records" :key="r.id">
      <td>{{index+1}}</td>
      <td>{{r.amount | currencyFormat}}</td>
      <td>{{r.date | date("datetime")}}</td>
      <td>{{r.categoryName}}</td>
      <td>
        <span class="white-text badge"
              :class="[r.typeClass]"
        >{{ r.typeText }}</span>
      </td>
      <td>
        <button class="btn-small btn"
                @click="$router.push('/detail/' + r.id)"
                v-tooltip="`Посмтреть запись`"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
  export default {
    name: "HistoryTable",
    data: () => ({
      categories: []
    }),
    props: {
      records: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
