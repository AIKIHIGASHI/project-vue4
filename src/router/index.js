import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

