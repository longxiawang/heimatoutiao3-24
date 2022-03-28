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
      <van-tabs v-model="activeName" sticky offset-top=1.226666rem>
        <!-- 循环生成vant Tab标签导航栏组件 -->
        <!-- 每一个Vant Tab导航栏标签组件内，在放入内容列表数据的容纳组件 -->
        <!-- ListData为每一列数据结构列表的容纳组件，该组件内放置着组件ItemData，为单列结构模板组件 -->
        <van-tab :title=item.name v-for="item in ListData " :key="item.id" :name="item.id" ><ListData :NewsList=NewsList :MyName='item.id'></ListData> </van-tab>
      </van-tabs>

      <!-- 频道列表多选小图标 -->
      <van-icon name='plus' size="0.37333334rem" class="moreChannels" @click="showPopup"/>
      <!-- 弹出的频道列表选择弹出层      这里html嵌套的不是内容，而是一个已经写好样式的组件  -->
      <van-popup  class="PopupStyle" v-model="show"><SelectChannel :ListData=ListData :UserNotFollowList=UserNotFollowList @DeleteList='DeleteList'  @DeleteFn='DeleteFn' @DownPopup='DownPopup' @UpLikeList='UpLikeList' @ChangeActiveName='ChangeActiveName' ></SelectChannel></van-popup>
    </div>
  </div>
</template>

<script>
// 导入获得用户关注频道的请求函数组件    导入获取所有频道列表的请求函数  导入从服务器删除用户喜欢列表的请求函数
import { GetVipListApi, getAllChannels, DeleteLikeList, UpVipList } from '../../api/index'
// 发送请求需要提交token，导入token函数组件
import { GetToken } from '../../utils/tokens'
// 导入内容列表数据的容纳组件
import ListData from '../../components/ListData.vue'
// 导入点击 + 号，频道列表多选的结构样式组件
import SelectChannel from '../../components/SelectChannel.vue'

export default {
  data () {
    return {
      // 每个频道的索引
      activeName: 0,
      // 用户关注的频道列表数据
      ListData: [],
      // 新闻推荐列表
      NewsList: [],
      // 点击+弹出更多频道列表选择的 弹出层的显示/隐藏
      show: false,
      // 所有频道列表数据
      AllChannels: [],
      // 用户未关注的频道列表
      VipNotList: []

    }
  },
  components: {
    ListData, SelectChannel
  },
  methods: {
    // 通过点击 + 号，来控制 频道选择弹出层显示/隐藏
    showPopup () {
      // this.UserNotFollowList = this.AllChannels

      // for (let i = 0; i < this.UserNotFollowList.length; i++) {
      //   this.ListData.forEach((item) => {
      //     if (this.UserNotFollowList[i].id === item.id) {
      //       this.UserNotFollowList.splice(i, 1)
      //     }
      //   })
      // }
      this.show = true
    },

    // 预设定子组件点击x关闭整个弹出层
    DownPopup () {
      this.show = false
    },
    // 预设定点击删除小图标删除对应用户关注频道的函数(DOM层次删除)
    DeleteList (id) {
      const NewArr0 = this.ListData.filter((item) => {
        return item.id === id
      })
      this.ListData = this.ListData.filter((item) => {
        return item.id !== NewArr0[0].id
      })
      this.UserNotFollowList.push(NewArr0[0])
    },
    // 预设用户点击删除了关注的列表，从服务器端也删除对应的数据(后端数据库层次删除)
    async DeleteFn (id) {
      const res = await DeleteLikeList(id)
      console.log(res)
    },
    // 预设定点击添加未关注的频道列表数据函数
    UpLikeList (id) {
      const arr1 = this.UserNotFollowList.filter((item) => {
        return item.id === id
      })
      console.log('添加的频道为', arr1)
      // DOM层面添加到关注的频道
      this.ListData.push(arr1[0])
      // 从服务器层面添加用户的关注频道
      UpVipList(this.ListData).then((res) => { console.log(res) }, (error) => { console.log(error) })
    },

    // 预设定更多频道列表的弹出层 在点击关注的频道 时跳转至对应的频道列表
    ChangeActiveName (id) {
      this.activeName = id
    }
  },

  computed: {
    // 计算用户还没有关注的频道列表 = 所有频道列表 - 用户已经关注的频道列表
    UserNotFollowList: function () {
      // splice会改变原数组，所以先把所有列表数据数组赋值给一个新的数组
      const NewArr = this.AllChannels

      for (let i = 0; i < NewArr.length; i++) {
        this.ListData.forEach((item) => {
          if (NewArr[i].id === item.id) {
            NewArr.splice(i, 1)
          }
        })
      }
      return NewArr
    }
  },
  // 数据代理完成后，在此钩子获得用户关注频道
  async created () {
    const res = await GetVipListApi(GetToken('token'))
    this.ListData = res.data.data.channels
    console.log('用户关注的列表数据为', this.ListData)

    const res1 = await getAllChannels()
    console.log('所有频道列表数据为', res1)
    this.AllChannels = res1.data.data.channels
    console.log('MyHome组件接收到所有频道列表数据为', this.AllChannels)
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
/deep/ .vant-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

.moreChannels {
  position: fixed;
  top: 62px;
  right:8px;
  z-index: 999;
}
//点击 + 号，弹出频道列表的弹出层大小
.PopupStyle{
  // vh,vw针对于当前窗口的百分比，100就是全屏
  height: 100vh;
  width: 100vw;
}
</style>
