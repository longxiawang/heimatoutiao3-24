import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 移入flexible.js，设置跟标签字体大小（移动端适配）

import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List } from 'vant' // 引入vant组件

Vue.use(Form) // 账号输入表单组件
Vue.use(Field)// 输入框组件
Vue.use(NavBar) // 注册登录导航栏组件
Vue.use(Button) // 引入按钮组件
Vue.use(Tabbar) // 移入底部组件
Vue.use(TabbarItem) // 移入底部标签组件
Vue.use(Icon) // 引入字体图标组件
Vue.use(Tab) // 引入主页功能分区Tab栏
Vue.use(Tabs) // 引入主页功能分区Tab栏
Vue.use(Cell) // 引入内容列表区域单元格组件
Vue.use(List) // 引入上拉加载更多组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
