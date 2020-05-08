<template>
<div>


    <div class="page-title">
      <h3>{{'New record' | localazeFilter}}</h3>
    </div>
   <Loader v-if="loading" />
    <p v-else-if="!categories.length">{{'Categories not created yet' | localazeFilter}} <br>
    <router-link to="/categories">{{'Add category' | localazeFilter}}</router-link>
    </p>
    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="input-field" >
        <select
          ref="select" v-model="category">
          <option
            v-for="c in categories"
            :value="c.id"
            :key="c.id"
          >{{c.title}}</option>
        </select>
        <label>{{'Select a category' | localazeFilter }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{'Income' | localazeFilter }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{'Expense' | localazeFilter }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: !this.$v.amount.minValue}"
        >
        <label for="amount">{{'Amount' | localazeFilter }}</label>
        <span v-if="!this.$v.amount.minValue" class="helper-text invalid">{{'Minimum value' | localazeFilter }} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: this.$v.description.$dirty  && !this.$v.description.required}"
        >
        <label for="description">{{'Description' | localazeFilter }}</label>
        <span
          v-if="this.$v.description.$dirty  && !this.$v.description.required"
          class="helper-text invalid">
          {{'Enter income / expense description' | localazeFilter }}
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>


</template>

<script>
import M from "materialize-css"
import {minValue, required} from "vuelidate/lib/validators";
import {mapGetters} from "vuex"

export default {
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    category: null,
    type: "outcome",
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {minValue:minValue(1)},
    description: {required}
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
     if (this.type === "income") {
       return true
     }

     return this.info.bill >= this.amount

  }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
          try {
            await this.$store.dispatch("createRecord", {
              categoryId: this.category,
              type: this.type,
              amount: this.amount,
              description: this.description,
              date: new Date().toJSON() //для корректного сохранения в firebase используем метод JSON
            })

            const bill = this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount

            await this.$store.dispatch('updateInfo', {bill})

            this.$message('Запись успешно создана')
            this.$v.$reset()
            this.amount = 1
            this.description = ""

            // eslint-disable-next-line no-empty
          } catch (e) {
          }
      } else {
        this.$message(`Недостаточно средств, лимит превышен на (${this.amount - this.info.bill})`)
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories")
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style>

</style>
