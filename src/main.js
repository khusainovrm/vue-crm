import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filter/dateFilter'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.filter("date", dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
