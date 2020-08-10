import request from '@/utils/request'

export function queryResourceType(data) {
  return request({
    url: '/admin/queryResourceType',
    method: 'post',
    data: data
  })
}

export function addResourceType(data) {
  return request({
    url: '/admin/addResourceType',
    method: 'post',
    data: data
  })
}

export function editResourceType(data) {
  return request({
    url: '/admin/editResourceType',
    method: 'post',
    data: data
  })
}

export function deleteResourceType(data) {
  return request({
    url: '/admin/deleteResourceType',
    method: 'post',
    data: data
  })
}
