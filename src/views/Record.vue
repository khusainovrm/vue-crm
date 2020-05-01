<template>
<div>


    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
   <Loader v-if="loading" />
    <form v-else class="form">
      <div class="input-field" >
        <select
          ref="select" v-model="categories">
          <option
            v-for="c in categories"
            :value="c.title"
            :key="c.id"
          >{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
        >
        <label for="description">Описание</label>
        <span
          class="helper-text invalid">description пароль</span>
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
export default {
  data: () => ({
    categories: [],
    loading: true,
    select: null
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories")
    this.loading = false

    setTimeout(() => this.select = M.FormSelect.init(this.$refs.select), 0)

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
