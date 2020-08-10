import request from '@/utils/request'

export function menuList(data) {
  return request({
    url: '/admin/queryMenu',
    method: 'post',
    data: data
  })
}

export function deleteMenu(data) {
  return request({
    url: '/admin/deleteMenu' ,
    method: 'post',
    data: data
  })
}

export function createMenu(data) {
  return request({
    url: '/admin/addMenu',
    method: 'post',
    data: data
  })
}

export function updateMenu(data) {
  return request({
    url: '/admin/editMenu',
    method: 'post',
    data: data
  })
}

export function getMenu(id) {
  return request({
    url: '/menu/' + id,
    method: 'get',
  })
}

export function updateHidden(id, params) {
  return request({
    url: '/menu/updateHidden' + id,
    method: 'post',
    params: params
  })
}
export function menuAssignResource(data) {
  return request({
    url: '/admin/menuAssignResource',
    method: 'post',
    data: data
  })
}

