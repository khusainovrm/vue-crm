<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model="email"
          :class="{invalid:(!$v.email.required && $v.email.$dirty) || (!$v.email.required && $v.email.email)}"
      >
      <label for="email">Email</label>
      <small v-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid">Email не должен быть пустым</small>
      <small v-else-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid">Введите корректный email</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model="password"
          :class="{invalid:($v.password.$dirty && !$v.password.required) ||($v.password.$dirty && !$v.password.minLength)}"

      >
      <label for="password">Пароль</label>
      <small v-if="$v.password.$dirty && !$v.password.required" class="helper-text invalid">Введите пароль</small>
      <small v-else-if="$v.password.$dirty && !$v.password.minLength" class="helper-text invalid">`Пароль должен быть не менее {{$v.password.$params.minLength.min}} символов, вы ввели {{password.length}}`</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid:(!$v.name.required && $v.name.$dirty)}"
      >
      <label for="name">Имя</label>
      <small v-if="!$v.name.required && $v.name.$dirty" class="helper-text invalid">Name</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree"/>
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email:'',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    onSubmit () {
      console.log(this.$v.agree)
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$router.push("/")
      const obj = {
        name:this.name,
        pass:this.password,
        agree: this.agree}
      console.log(obj)

    }
  }

}
</script>

<style>

</style>
