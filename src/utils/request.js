import TheAxios from 'axios'

const axios = TheAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
