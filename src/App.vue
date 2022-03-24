<template>
  <div class="box">
    <!-- 登录模块显示位置 -->
  <router-view></router-view>
  </div>

</template>

<script>
import { getAllChannels } from './api/index'
export default {
  async created () {
    const res = await getAllChannels()
    console.log(res)
  }
}
</script>

<style scoped lang='less' >

</style>
