import TheAxios from 'axios'

const axios = TheAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

export default axios
