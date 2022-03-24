import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 移入flexible.js，设置跟标签字体大小（移动端适配）

import { NavBar, Form, Field, Button } from 'vant' // 引入vant组件

Vue.use(Form) // 账号输入表单组件
Vue.use(Field)// 输入框组件
Vue.use(NavBar) // 注册登录导航栏组件
Vue.use(Button) // 引入按钮组件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
