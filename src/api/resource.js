import request from '@/utils/request'

export function queryResource(data) {
  return request({
    url: '/admin/queryResource',
    method: 'post',
    data: data
  })
}

export function addResource(data) {
  return request({
    url: '/admin/addResource',
    method: 'post',
    data: data
  })
}

export function editResource(data) {
  return request({
    url: '/admin/editResource',
    method: 'post',
    data: data
  })
}

export function deleteResource(data) {
  return request({
    url: '/admin/deleteResource',
    method: 'post',
    data: data
  })
}

export function queryMenuResourceList(data) {
  return request({
    url: '/admin/queryMenuResourceList',
    method: 'post',
    data: data
  })
}

