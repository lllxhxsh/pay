import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'


// 创建axios实例
const service = axios.create({
  baseURL:'/api',
  // baseURL:process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    "Content-Type": "application/json"
  }
})

// request拦截器
service.interceptors.request.use(config => {
  // console.log(process.env.BASE_API);
  if (store.getters.token) {
    config.headers['jwtToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  console.log("request->  jwtToken: " + config.headers['jwtToken']);
  // config.headers = {
  //   'Content-Type': 'application/json'
  // };
  console.log("request->  " + config.baseURL + config.url)
  console.log("request->  " + JSON.stringify(config.data));
  return config
}, error => {
  // Do something with request error
  console.log("11111:" + error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非200是抛错 可结合自己业务进行修改
    */
    const res = response.data;

    console.log("response->  " + JSON.stringify(response));
    if (res.businessCode !== 1) {
      var msg = res.businessMsg;
      if (res.returnMsg == "TOKEN_EXPIRED") {//TOKEN_EXPIRED
          msg = '登录已超时,请重新登录';
          Message({
            message: msg,
            type: 'error',
            duration: 3 * 1000
          })
          console.log("登录已超时,请重新登录");
          // this.$store.dispatch('LogOut').then(() => {
          //   location.reload() // 为了重新实例化vue-router对象 避免bug
          // })
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
      } else if (res.businessCode == 1001) {
        msg = '该账户不存在,请重新登录';
      } else if (res.businessCode == 9999) {
        msg = '服务异常,稍后再试';
      } else if (response.config.url.search("admin/userLogin") != -1) {
        if (res.businessCode == 2) {
          msg = '手机未注册';
        } else if (res.businessCode == 3) {
          msg = '密码错误';
        } else if (res.businessCode == 4) {
          msg = '登录太频繁';
        } else if (res.businessCode == 5) {
          msg = '数据异常';
        } else if (res.businessCode == 6) {
          msg = '登录失败超过次数，请10分钟后尝试或进行快捷登录';
        }

      } else if (response.config.url.search("admin/queryUser") != -1 || response.config.url.search("admin/queryUserRole") != -1  || response.config.url.search("admin/userQueryRole") != -1 || response.config.url.search("admin/queryRole") != -1 || response.config.url.search("admin/queryRoleMenuList") != -1 || response.config.url.search("admin/queryMenu") != -1 || response.config.url.search("admin/queryResourceType") != -1 || response.config.url.search("admin/queryResource") != -1) {//查询类接口
        msg = '查询失败';
      } else if (response.config.url.search("admin/queryUser") != -1  || response.config.url.search("admin/addMenu") != -1 || response.config.url.search("admin/addResourceType") != -1 || response.config.url.search("admin/addResource") != -1) {//添加类接口
        msg = '操作失败';
      } else if (response.config.url.search("admin/editUser") != -1 || response.config.url.search("admin/editMenu") != -1 || response.config.url.search("admin/editResourceType") != -1 || response.config.url.search("admin/editResource") != -1) {//编辑类接口
        msg = '操作失败';

      } else if (response.config.url.search("admin/userAssignRole") != -1 || response.config.url.search("admin/modifyUserState") != -1 || response.config.url.search("admin/roleAssignMenu") != -1 || response.config.url.search("admin/menuAssignResource") != -1) {//操作类接口
        msg = '操作失败';
      } else if (response.config.url.search("admin/deleteUser") != -1 || response.config.url.search("admin/deleteRole") != -1 || response.config.url.search("admin/deleteMenu") != -1 || response.config.url.search("admin/deleteResourceType") != -1 || response.config.url.search("admin/deleteResource") != -1) {//删除类接口
        msg = '操作失败';
      } else if (response.config.url.search("admin/addUser") != -1) {
        if (res.businessCode == 0) {
          msg = '该用户已添加';
        }
      }else if(response.config.url.search("admin/addRole") != -1 || response.config.url.search("admin/editRole") != -1 ){
        if (res.businessCode == 2) {
          msg = '操作失败';
        } else if (res.businessCode == 3) {
          msg = '角色名称已存在';
        }
      }




      if(response.config.url.search("admin/userQueryMenuList") != -1 && res.returnMsg == "NOT_AUTH"){
        return Promise.reject('该账户没有权限,请先分配角色')
      }else{
        console.log("msg: " + msg);
        Message({
          message: msg,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject('error')
      }

    } else {
      return response.data
    }
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
