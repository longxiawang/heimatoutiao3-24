import Vue from 'vue'
import VueRouter from 'vue-router'
import MyNav from '../views/Login/MyNav.vue'
import MyLayOut from '../views/Layout/MyLayout.vue'
import MyHome from '../views/MyHome/MyHome.vue'
import MyUser from '../views/MyUser/MyUser.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/layout'
},
{
  path: '/login',
  component: MyNav
},
{
  path: '/layout',
  component: MyLayOut,
  redirect: '/layout/home',
  children: [
    {
      path: 'home',
      component: MyHome
    },
    {
      path: 'user',
      component: MyUser
    }
  ]
}

]

const router = new VueRouter({
  routes
})

export default router
