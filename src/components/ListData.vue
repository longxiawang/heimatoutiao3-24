<template>
  <div class="box1">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" loading-text='加载中...' >
         <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check='false'
    >
      <ItemData
        v-for="item in NewList"
        :key="item.art_id"
        :NewsItem="item"
      ></ItemData>
    </van-list>
</van-pull-refresh>

  </div>
</template>

<script>
// 导入单独列模板结构组件
import ItemData from './ItemData.vue'
// 导入请求数据列表的组件
import { GetNewsList } from '../api/index'
// 导入获得token值的封装函数组件
import { GetToken } from '../utils/tokens'

export default {
  components: {
    ItemData
  },

  props: ['NewsList', 'name'], // 新闻列表推荐数据，父MyHome组件传过来的，name为本列表容器频道分类的id值，比如我这个列表是html类频道，则我的id就是1.比如我的分类是css频道，则我的id则为4...，这个数据实在循环生成列表分类的时候，父组件传过来的

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      NewList: [],
      TheTime: new Date().getTime(),
      isLoading: false
    }
  },

  // 每个List页面容器组件，数据代理完成勾子节点上，去发送请求拿到自己该类频道的列表数据，这里this.name 就是父在循环生成本容器的时候，传递过来的每个分类频道的id值，拿这个ID值去请求数据，则能获得本分类频道的数据列表
  async created () {
    const NewsList = await GetNewsList(
      GetToken('token'),
      this.name,
      // 初始打开频道分类页面的请求时间戳，为本地最新时间戳
      this.TheTime
    )
    // 返回的数据中抽离出文章列表集合赋值给数据库的数组内
    this.NewList = NewsList.data.data.results
    // 把每次请求回来的一个 请求前一页历史数据的时间戳,的一个参数，赋值给数据库里面的TheTime，
    this.TheTime = NewsList.data.data.pre_timestamp
  },

  methods: {
    // 上拉加载更多的函数
    async onLoad () {
      const OldNewsList = await GetNewsList(
        GetToken('token'),
        this.name,
        // 上拉加载更多的时候，时间戳就为上一次的服务器返回的时间戳
        this.TheTime
      )
      // 每次请求完加一个判断，如果请求回来的数据长度为0，则说明没数据了，那么久按照组件文档说明，设置finished为true，并且返回即可
      if (OldNewsList.data.data.results.length === 0) {
        this.finished = true
        return false
      }
      // 把返回来的新数据+原来的列表数据合并起来，以此来 循环单列结构模板组件ItemData
      this.NewList = [...this.NewList, ...OldNewsList.data.data.results]
      // 继续覆盖时间戳
      this.TheTime = OldNewsList.data.data.pre_timestamp

      this.loading = false
    },
    // 下拉刷新方法函数
    async onRefresh () {
      // 既然是下拉刷新，那就把该清的数据都清掉，回到最初状态
      this.NewList = []
      this.TheTime = new Date().getTime()

      const F5 = await GetNewsList(
        GetToken('token'),
        this.name,
        this.TheTime
      )

      this.NewList = F5.data.data.results

      this.TheTime = F5.data.data.pre_timestamp

      // 操作完把下拉刷新的v-model绑定的值设置成false，表示加载处理完成

      this.isLoading = false
    }
  }
}
</script>

<style></style>
