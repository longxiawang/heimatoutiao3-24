import Vue from 'vue'
import VueRouter from 'vue-router'
import MyNav from '../views/Login/MyNav.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: MyNav }

]

const router = new VueRouter({
  routes
})

export default router
