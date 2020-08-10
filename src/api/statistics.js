import request from '@/utils/request'

export function statisticsList(params) {
  return request({
    url: '/opt/vendorStatistics',
    method: 'post',
    data: params
  })
}