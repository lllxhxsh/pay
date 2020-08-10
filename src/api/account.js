import request from '@/utils/request'

export function queryAccount(data) {
  return request({
    url: '/opt/queryAccount',
    method: 'post',
    data: data
  })
}
