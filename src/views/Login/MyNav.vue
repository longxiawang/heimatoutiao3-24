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
        :rules="[{ required: true, message: '密码错误', pattern:pattern2  }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 密码，必须是246810
      },
      pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      pattern2: /^\d{6}$/
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>

<style></style>
