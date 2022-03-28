<template>
  <div class="box3">
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
            v-if="NewsItem.cover.type === 1"
          />
        </div>
        <!-- 文章三图 -->
        <div class="thumb-box" v-if="NewsItem.cover.type === 3">
          <img
            :src="ImgUrl"
            alt=""
            srcset=""
            class="thumb"
            v-for="(ImgUrl, index) in NewsItem.cover.images"
            :key="index"
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
          <van-icon name="cross" @click="show = true" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      :cancel-text="message"
      @cancel="onCancel"
      :close-on-click-action="ShutDown"
      @close="onclose"
    />
  </div>
</template>

<script>
// 导入计算多久之前发布的文章封装的函数组件      导入举报文章列表函数组件
import { GetHowLongBefore } from '../utils/dayjs' // 只有vue生成的可以在所有标签上直接使用，而这个不行，所以要保存到VUE上

// 导入 点击不感兴趣按钮，向服务器提交不喜欢的文章id接口        导入举报文章接口函数
import { NoLike, ReportList } from '../api/index'

import { Notify } from 'vant'

export default {
  // 接收ListData传过来的循环每一次，每一项的信息
  props: ['NewsItem'],

  data () {
    return {
      // show控制模态框显示或者隐藏
      show: false,
      // 初始模态框显示的反馈选项
      actions: [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }],
      // 反馈列表下面的取消按钮文字
      message: '取消',
      // 点击反馈分类选项的时候，是否关闭弹出层
      ShutDown: false
    }
  },

  methods: {
    Dayjs: GetHowLongBefore,

    // 弹出的模态框中的反馈列表被选择，触发函数
    onSelect (action, index) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起

      // 如果用户点击了不感兴趣反馈选项，那么就把消息传递给服务器
      if (action.name === '不感兴趣') {
        NoLike(this.NewsItem.art_id).then(
          (res) => {
            // 服务器返回成功，则弹出反馈成功的消息框
            Notify({ type: 'success', message: '反馈成功' })
            // 并且把遮罩层关闭
            this.show = false
            // 并且把这个不感兴趣的文章列表id传递给父组件，父组件再从数据列表中删除，借助VUE数据发生变化机制，从而视图重新渲染，
            this.$emit('DeleteNoLike', this.NewsItem.art_id)
          },
          (error) => {
            console.log(error)
          }
        )
      }
      // 判断如果点击的反馈垃圾内容，则让actions内容区域变为垃圾详情信息
      if (action.name === '反馈垃圾内容') {
        this.actions = [
          { value: 0, name: '其他问题' },
          { value: 1, name: '标题夸张' },
          { value: 2, name: '低俗色情' },
          { value: 3, name: '错别字多' },
          { value: 4, name: '旧闻重复' },
          { value: 6, name: '内容不实' },
          { value: 8, name: '侵权' },
          { value: 5, name: '广告软文' },
          { value: 7, name: '涉嫌违法犯罪' }
        ]

        // 如果切换到了详细的反馈垃圾内容分类列表，则下面的取消按钮文字，要变成返回文字
        this.message = '返回'
        // this.show = false
      }

      // 如果点击的既不是不感兴趣也不是反馈垃圾内容，则必然是二级反馈举报分裂列表
      if (action.name !== '不感兴趣' && action.name !== '反馈垃圾内容') {
        // 向服务器提交举报数据
        ReportList(this.NewsItem.art_id, action.value, '色情低俗').then(
          (res) => {
            console.log('举报文章成功，服务器响应结果为', res)
            Notify({ type: 'success', message: '举报成功' })
            this.show = false
          },
          (error) => {
            console.log(error)
          }
        )
      }
    },

    // 触发 点击反馈列表中的返回，返回上一级返回列表信息的函数
    onCancel () {
      if (this.message === '返回') {
        this.actions = [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }]
        this.message = '取消'
        this.show = true
      }
    },

    // 当关闭遮罩层面板的时候触发
    onclose () {
      // 把一切还原回一级反馈列表
      this.actions = [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }]
      this.message = '取消'
    }
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
