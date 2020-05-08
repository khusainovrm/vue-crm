<template>
      <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{'Exchange Rates' | localazeFilter }}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{'Currency' | localazeFilter }}</th>
              <th>{{'Exchange Rates' | localazeFilter }}</th>
              <th>{{'Date' | localazeFilter }}</th>
            </tr>
            </thead>

            <tbody>
              <tr v-for="curr in currency" :key="curr">
                <td>{{curr}}</td>
                <td>{{rates[curr].toFixed(5)}}</td>
                <td>{{date | date("date")}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "currency",
  data: () => ({
    currency : ["RUB", "USD", "EUR"]
  }),
  props: ["rates", "date"]
}

</script>

<style>

</style>
