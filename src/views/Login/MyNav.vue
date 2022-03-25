<template>
  <div>
    <!-- 黑马登录抬头组件结构，直接引入的vant组件 -->
    <van-nav-bar title="龙虾头条-登录" />
    <!-- 登录账号密码组件，提交表单组件 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        required
        placeholder="请输入手机号"
        :rules="[{ pattern, message: '请输入正确手机号' }]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        required
        placeholder="请输入6位密码"
        :rules="[{ required: true, message: '密码错误', pattern: pattern2 }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading=loading
          :disabled=loading
          loading-text="加载中..."
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入登录验证接口
import { LoginApi } from '../../api/index'
// 导入存储Token的组件
import { SetToken } from '../../utils/tokens'
// 导入消息通知组件，此组件为函数，下面直接调用即可
import { Notify } from 'vant'
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 密码，必须是246810
      },
      loading: false, // 控制点击登录后按钮加载的样式变化
      pattern:
        /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      pattern2: /^\d{6}$/
    }
  },
  methods: {
    // 触发了表单提交事件开始请求验证账号
    async onSubmit (values) {
      this.loading = true
      // 登陆验证可能报错，所以try catch包裹
      try {
        // 调用配置好的LoginApi请求接口函数，并传递实参过去
        const res = await LoginApi(this.user.mobile, this.user.code)
        console.log(res)
        // 登陆成功，弹出成功消息提示组件
        Notify({ type: 'success', message: '登录成功' })
        // 请求成功的时候，调用token组件内的设置token的函数,从而把token存储到本地。做持久化登录
        SetToken('token', res.data.data.token)
        // 登录成功最后，实行编程式路由跳转至显示页面组件layout
        this.$router.push('/layout/home')
      } catch (error) {
        // 登陆失败，弹出错误消息提示组件
        Notify({ type: 'danger', message: '登陆失败，账号或密码错误！' })
      }
      // 不管登录成功还是失败，请求发送完成接收到响应后，就要把按钮状态设为初始状态
      this.loading = false
    }

  }
}
</script>

<style></style>
