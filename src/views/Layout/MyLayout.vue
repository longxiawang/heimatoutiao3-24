<template>
  <div class="home_container">
    <!-- home页面和uesr个人信息页面展示位置 -->
    <router-view></router-view>
    <!-- 底部导航标签栏 -->
    <!-- 标签加上route 能够开启路由模式 -->
    <!-- 每个子标签加上to to的路径同路由访问路径 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
//防止主页面挡住底部导航栏，设置一个底内边距
.home_container {
  padding-bottom: 50px;
}
//给底部导航栏设置一个顶部边框线
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
