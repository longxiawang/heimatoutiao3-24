// 统一封装的接口方法
// 每个方法对应一个请求
// 逻辑页面导入这个接口方法，就能够发起请求
// 好处：请求的url路径，这里可以统一管理

import axios from '../utils/request' // 引入的是()=>{}

// 获取所有频道的axios请求函数
export const getAllChannels = () => {
  return axios({ // axios()实际就是调用了()=>{}，同时把一个对象作为实参传了进去,该函数执行结果是一个promise实例对象
    url: '/v1_0/channels',
    method: 'GET'
  })
}
