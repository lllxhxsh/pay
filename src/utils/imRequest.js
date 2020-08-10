import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'


// 创建axios实例
const service = axios.create({
  // baseURL: "https://192.168.3.122:12000", // api的base_url
  baseURL:'/opens/',
  timeout: 15000, // 请求超时时间
  headers: {
    "Content-Type": "application/json"
  },

})

// request拦截器
// service.interceptors.request.use(config => {
//   console.log(process.env.BASE_API);
//   if (store.getters.token) {
//     config.headers['jwtToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//   }
//   console.log("jwtToken: "+config.headers['jwtToken']);
//   console.log(config.url)
//   return config
// }, error => {
//   console.log("11111:"+error) // for debug
//   Promise.reject(error)
// })

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    return response.data
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
