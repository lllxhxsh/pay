
import request from '@/utils/imRequest'

export function checkUser(data) {
  return request({
    url:'/sso/v11/queryUserInfo',
    method:'post',
    data:data
  })
}
