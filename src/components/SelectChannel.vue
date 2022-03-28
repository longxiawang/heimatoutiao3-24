<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" @click="DownPopup" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title"> 点击{{BadgeStatus?'删除':'进入'}}频道 </span>
        </span>
        <span @click="UpItem">{{BadgeStatus?'完成':'编辑'}}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in ListData " :key='item.id' @click='ClickChannel(item.id)' >
          <div class="channel-item van-hairline--surround"  >
            {{item.name}}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-show="BadgeStatus&&item.id!==0">
              <template #content>
                <van-icon
                  name="cross"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in UserNotFollowList" :key=item.id @click='UpLikeList(item.id)' >
          <div class="channel-item van-hairline--surround">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制每个频道列表右上角x图标上来默认为false不显示
      BadgeStatus: false
    }
  },
  props: ['ListData', 'UserNotFollowList'],
  created () {
    console.log(this.ListData)
  },
  methods: {
    // 点击编辑按钮
    UpItem () {
      // 每个频道标签右上角x图标取反，
      this.BadgeStatus = !this.BadgeStatus
    },

    // 点击每一个我关注的频道列表标签触发事件
    ClickChannel (id) {
      // 点击的时候先判断，如果 BadgeStatus的值为true，也就是x图标显示，也就是处在删除列表界面的时候，才会去删除点击项
      if (this.BadgeStatus && id !== 0) {
        // 拿到了每个频道列表的id值
        console.log(id)
        // 通知父组件执行从服务器获取到的用户关注列表数组中，删除掉对应的id的预设定函数(DOM层面删除)
        this.$emit('DeleteList', id)
        // 且通知父组件执行，向服务器提交用户取消关注的频道的预设定函数(服务器层面删除)
        this.$emit('DeleteFn', id)
      }

      // 那么如果点击的时候值为false也就是x图标不显示，那么现在就要执行点击那个频道跳转到那个频道的功能
      if (this.BadgeStatus === false) {
        // 如果进入判断，则同样通知父组件关闭弹出层 + 跳转至对应的频道列表
        this.$emit('DownPopup')
        console.log(id)
        this.$emit('ChangeActiveName', id)
      }
    },
    // 点击x通知父组件关闭整个弹出层
    DownPopup () {
      this.$emit('DownPopup')
    },

    // 点击未关注的频道列表,将会把点击的添加到关注的频道列表里面
    UpLikeList (id) {
      this.$emit('UpLikeList', id)
    }
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
