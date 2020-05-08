import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store' 
import dateFilter from '@/filter/dateFilter'
import localazeFilter from '@/filter/localaze.filter'
import currencyFilter from '@/filter/currencyFilter'
import messagePlugin from '@/utils/message.plugin'
import tooltipDirective from '@/directives/tooltip.directives'
import Loader from "@/components/app/Loader"
import Paginate from "vuejs-paginate"
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false


Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter("date", dateFilter)
Vue.filter("localazeFilter", localazeFilter)
Vue.filter("currencyFormat", currencyFilter)
Vue.directive("tooltip", tooltipDirective)
Vue.component("Loader", Loader)
Vue.component("Paginate", Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyCd6k5AaZTYN_4yZXCicU7TOyMd7v7SLTE",
  authDomain: "vue-crm-cdc26.firebaseapp.com",
  databaseURL: "https://vue-crm-cdc26.firebaseio.com",
  projectId: "vue-crm-cdc26",
  storageBucket: "vue-crm-cdc26.appspot.com",
  messagingSenderId: "362361645968",
  appId: "1:362361645968:web:1b34ddb2735e5f18dc2115",
  measurementId: "G-TFGF3XRGNK"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})




