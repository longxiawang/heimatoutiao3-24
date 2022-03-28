import TheAxios from 'axios'

// 引入router组件

const axios = TheAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }

})

// 请求拦截器
// axios.interceptors.request.use(function (config) {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
// }
// )
// 相应拦截器
export default ({
  url,
  method = 'GET',
  params = {},
  data = {},
  headers = {}
}) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
