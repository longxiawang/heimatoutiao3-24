<template>
  <div>
    <!-- 头部导航区域 fixed：控制导航区域始终固定在顶部-->
    <van-nav-bar fixed>
      <template #left>
        <img src="../../assets/toutiao_logo.png" alt="" srcset="" class="log" />
      </template>
      <template #right>
        <!-- postcss无法转换行内样式的px，需要手动计算 -->
        <van-icon name="search" size="0.48rem" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- Tab栏分区切换区域  sticky：粘性定位，offset-top=1.226666rem 行内样式插件无法计算手动46/37.5-->
    <div class="tab" >
      <van-tabs v-model="active" sticky offset-top=1.226666rem >
        <!-- 循环生成vant Tab标签导航栏组件 -->
        <!-- 每一个Vant Tab导航栏标签组件内，在放入内容列表数据的容纳组件 -->
        <!-- ListData为每一列数据结构列表的容纳组件，该组件内放置着组件ItemData，为单列结构模板组件 -->
        <van-tab :title=item.name v-for="item in ListData " :key="item.id" ><ListData></ListData> </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 导入获得用户关注频道的请求函数组件
import { GetVipListApi } from '../../api/index'
// 发送请求需要提交token，导入token函数组件
import { GetToken } from '../../utils/tokens'
// 导入内容列表数据的容纳组件
import ListData from '../../components/ListData.vue'

export default {
  data () {
    return {
      active: 0,
      ListData: []
    }
  },
  components: {
    ListData
  },
  // 数据代理完成后，在此钩子获得用户关注频道
  async created () {
    const res = await GetVipListApi(GetToken('token'))
    console.log('用户关注的频道数据是', res)
    this.ListData = res.data.data.channels
    console.log(this.ListData)
  }
}
</script>

<style scoped lang="less">
.log {
  width: 100px;
  height: 30px;
}
//由于顶部导航固定定位，脱离标准流，下方盒子顶上去了，所以设置一个盒子的上内边距，在顶下来
.tab{
  padding-top: 46px;
}

</style>
