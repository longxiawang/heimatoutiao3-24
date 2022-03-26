<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ NewsItem.title }}</span>
        <!-- 文章单图 -->
        <img
          :src="NewsItem.cover.images[0]"
          alt=""
          srcset=""
          class="thumb"
          v-if="NewsItem.cover.type===1"
        />
      </div>
      <!-- 文章三图 -->
      <div class="thumb-box" v-if="NewsItem.cover.type===3" >
        <img
          :src="ImgUrl"
          alt=""
          srcset=""
          class="thumb"
          v-for="(ImgUrl, index) in NewsItem.cover.images"
          :key='index'
        />
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ NewsItem.aut_name }}</span>
          <span>{{ NewsItem.comm_count }}评论</span>
          <span>{{ Dayjs(NewsItem.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>

<script>
// 导入计算多久之前发布的文章封装的函数组件
import { GetHowLongBefore } from '../utils/dayjs' // 只有vue生成的可以在所有标签上直接使用，而这个不行，所以要保存到VUE上
export default {
  // 接收ListData传过来的循环每一次，每一项的信息
  props: ['NewsItem'],
  methods: {
    Dayjs: GetHowLongBefore
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

// 单图文章图片大小
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
// 三图文章图片大小
.thumb.box {
  display: flex;
  justify-content: space-between;
}
</style>
