import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import info from '@/store/info'
import category from '@/store/category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  actions: {
    async fetchCurrency () {
      const key = process.env.VUE_APP_FIXER
      const url = `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      const res = await fetch(url)
      return res.json()
    }
  },
  mutations: {
    setError (state,error){
      state.error=error
    },
     clearError (state) {
       state.error = null
     }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category
  }
})
