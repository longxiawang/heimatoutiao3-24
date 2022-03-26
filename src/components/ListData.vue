<template>
  <div class="box1">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ItemData
        v-for="item in NewsList"
        :key="item.art_id"
        :NewsItem="item"
      ></ItemData>
    </van-list>
  </div>
</template>

<script>
// 导入单独列模板结构组件
import ItemData from './ItemData.vue'
export default {
  components: {
    ItemData
  },
  props: ['NewsList'], // 新闻列表推荐数据，父MyHome组件传过来的
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
  // 上拉加载更多的函数
    onLoad () {

    }
  }
}
</script>

<style></style>
