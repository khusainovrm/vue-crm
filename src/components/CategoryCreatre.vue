<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create' | localazeFilter }}</h4>
      </div>

      <form @submit.prevent="create">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"

          >
          <label for="name">{{'Name' | localazeFilter }}</label>
          <span class="helper-text invalid"
                v-if="$v.title.$dirty && !$v.title.required"
          >{{'Enter a name' | localazeFilter }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.title.minValue}"
          >
          <label for="limit">{{'Limit' | localazeFilter }}</label>
          <span class="helper-text invalid"
          v-if="$v.limit.$dirty && !$v.title.minValue"
          >{{'Minimum value' | localazeFilter }} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Create' | localazeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {required, minValue} from "vuelidate/lib/validators"
  import M from "materialize-css"

  export default {
    name: "CategoryCreatre",
    data: () => ({
      title: "",
      limit: 100
    }),
    validations: {
      title: {required},
      limit: {minValue: minValue(100)}
    },
    mounted() {
      M.updateTextFields()
    },
    methods: {
      async create() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
          
          try {
            // eslint-disable-next-line no-unused-vars
            const category = await this.$store.dispatch("createCategory", {title: this.title, limit: this.limit})
            this.title=''
            this.limit=100
            this.$v.$reset()
            this.$emit("createCategory", category)
            this.$message("Категория была создана")
            // eslint-disable-next-line no-empty
          } catch (e) {
          }


      }
    }
  }
</script>

<style scoped>

</style>
