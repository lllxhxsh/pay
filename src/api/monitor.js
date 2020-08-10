import request from '@/utils/request'

export function monitorList(params) {
  return request({
    url: '/opt/monitorData',
    method: 'post',
    // params: params
  })
}

export function monitorListdd(params) {
    return request({
      url: '/monitor/Listdd',
      method: 'get',
      params: params
    })
  }