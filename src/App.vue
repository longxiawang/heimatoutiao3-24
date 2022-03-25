<template>
  <div class="box">
    <!-- 登录模块显示位置 -->
  <router-view></router-view>

  </div>

</template>

<script>
// 导入获取所有频道的axios请求函数组件
import { getAllChannels } from './api/index'
export default {
  // 获取所有频道的axios请求函数
  async created () {
    const res = await getAllChannels()
    console.log('所有频道列表数据是', res)
  }
}
</script>

<style scoped lang='less' >

</style>
