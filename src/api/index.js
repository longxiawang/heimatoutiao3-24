// 统一封装的接口方法
// 每个方法对应一个请求
// 逻辑页面导入这个接口方法，就能够发起请求
// 好处：请求的url路径，这里可以统一管理

import axios from '../utils/request' // 引入的是()=>{}

// 因为所有请求都要携带token，所以这里引入token的封装函数
import { GetToken } from '../utils/tokens'

// 获取所有频道的axios请求函数
export const getAllChannels = () => {
  return axios({ // axios()实际就是调用了()=>{}，同时把一个对象作为实参传了进去,该函数执行结果是一个promise实例对象
    url: '/v1_0/channels',
    method: 'GET'
  })
}

//  登录验证
export const LoginApi = (mobile, code) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile: mobile, code: code }
  })
}

// 获取用户的关注频道
export const GetVipListApi = (token) => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }

  })
}

// 获取文章新闻列表(默认获取推荐频道列表)
export const GetNewsList = (token, id, time) => {
  return axios({
    url: '/v1_0/articles',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: { channel_id: id, timestamp: time }
  })
}

// 举报文章(NewsId:新闻列表id, NewsType:举报文章的举报类型 ，NewsInstructions：举报附加说名)
export const ReportList = (ListID, TypeID, Message) => {
  return axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GetToken('token')}  `
    },
    data: {
      target: ListID,
      Datatype: TypeID,
      remark: Message
    }
  })
}

// 不感兴趣文章发送请求(NewsId:不喜欢的文章id)
export const NoLike = (NewsId) => {
  return axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GetToken('token')} `
    },
    data: {
      target: NewsId
    }
  })
}

// 删除用户指定的取消关注的频道
export const DeleteLikeList = (id) => {
  return axios({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'

  })
}

// 用户点击新添加关注的频道，向服务器提交添加请求接口函数
export const UpVipList = (Obj) => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: Obj
    }
  })
}
