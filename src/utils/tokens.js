// // 统一设置key的名称
// const key = 'geek-itheima'

// 设置token函数
export const SetToken = (key, value) => {
  localStorage.setItem(key, value)
}

// 获取token函数:注意事项：设置删除都不需要返回值，而得到则需要返回值，所以必须加return
export const GetToken = (key) => {
  return localStorage.getItem(key)
}

// 删除token函数
export const RemoveToken = (key) => {
  localStorage.removeItem(key)
}
