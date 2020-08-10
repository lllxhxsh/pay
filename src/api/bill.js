import request from '@/utils/request'

export function queryBill(data) {
  return request({
    url: '/opt/queryBill',
    method: 'post',
    data: data
  })
}

export function queryBillType(data) {
  return request({
    url: '/acct/queryBillType',
    method: 'post',
    // data :data
  })
}
