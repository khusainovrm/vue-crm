<template>
<div>
  <div class="page-title">
    <h3>{{'ProfileTitle' | localazeFilter }}</h3>
  </div>

  <form class="form" @submit.prevent="onSumbit">
    <div class="input-field">
      <input 
      id="description" 
      type="text" 
      v-model="name"
      :class="{invalid:$v.name.$dirty && !$v.name.required}"
      >

      <label for="description">{{'Name' | localazeFilter}}</label>
      <span 
      class="helper-text invalid"
      v-if='$v.name.$dirty && !$v.name.required'
       > {{'EnterName' | localazeFilter }} </span>
    </div>

      <div class="switch" >
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{'Update' | localazeFilter}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import M from 'materialize-css'
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    name:'',
    isRuLocale: true
    }),
    computed: {
      ...mapGetters(['info'])
    },
    validations: {
      name: {required}
    },
    methods: {
      ...mapActions(['updateInfo']),
      async onSumbit() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          await this.updateInfo({
            name:this.name,
            locale:this.isRuLocale ? 'ru-RU' : 'en-US'
            })
        // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    },
    mounted () {
      this.isRuLocale = this.info.locale === 'ru-RU'
      this.name = this.info.name
      setTimeout(()=>M.updateTextFields())
    }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
