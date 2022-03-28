<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        v-GetFocus
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @input="inputFn"
      />
    </div>

    <!-- 搜索建议列表 -->
    <div class="sugg-list">
      <div class="sugg-item" v-for="(item,index) in ResponseData" :key="index" v-html="KeyWordColor(kw,item)" ></div>
    </div>
  </div>
</template>

<script>
// 引入联想搜索功能请求接口
import { RelevantNews } from '../../api/index'

export default {
  // 数据库
  data () {
    return {
      kw: '', // 搜索关键字,v-model双向绑定
      TimeFn: null, // 防抖用
      ResponseData: [] // 服务器响应的搜索关键字数据
    }
  },

  // 自定义指令
  directives: {
    GetFocus (el) {
      // el是绑定自定义指令的元素，通过该元素+原生DOM操作获取到下面的input框
      const ipt = el.querySelector('.van-field__control')
      // 让input框获得焦点
      ipt.focus()
    }
  },

  // 方法库
  methods: {
    // 点击搜索，请求关键词数据
    inputFn () {
      // 设置一个防抖功能
      // 每次在触发表单变化的函数时候，先清除之前的定时器
      clearTimeout(this.TimeFn)
      // 如果输入框没内容了，则把关键词数组清空
      if (this.kw.length === 0) {
        this.ResponseData = []
      } else {
        // 如果输入框有内容则
        // 再重新设置一个定时器
        this.TimeFn = setTimeout(async () => {
          // 定时器内发起请求得到关键词数据
          const res = await RelevantNews(this.kw)
          this.ResponseData = res.data.data.options
        }, 500)
      }
    },

    // 关键词高亮函数  keyWord:关键词   Words:字符串
    KeyWordColor (keyWord, Words) {
      // return 是关键
      return Words.replaceAll(keyWord, `<span style="color:red;" >${keyWord}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
 /*搜索建议列表样式 */
  .sugg-list {
    .sugg-item {
      padding: 0 15px;
      border-bottom: 1px solid #f8f8f8;
      font-size: 14px;
      line-height: 50px;
      // 实现省略号的三行代码
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
