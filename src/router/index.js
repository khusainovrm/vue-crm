import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      name: 'login',
      meta: {layout: "empty"},
      component: () => import ('../views/Login.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: "main"},
      component: () => import ("../views/DetailRrecord.vue")
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: "main"},
      component: () => import ("../views/Categories.vue")
    },
    {
      path: '/history',
      name: 'histoty',
      meta: {layout: "main"},
      component: () => import ("../views/History.vue")
    },
    {
      path: '/',
      name: 'home',
      meta: {layout: "main"},
      component: () => import ("../views/Home.vue")
    },
    {
      path: '/planing',
      name: 'planing',
      meta: {layout: "main"},
      component: () => import ("../views/Planing.vue")
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: "main"},
      component: () => import ("../views/Profile.vue")
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: "main"},
      component: () => import ("../views/Record.vue")
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: "empty"},
      component: () => import ("../views/Register.vue")
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
