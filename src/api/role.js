import request from '@/utils/request'

export function roleList(data) {
  return request({
    url: '/admin/queryRole',
    method: 'post',
    data: data
  })
}

export function createRole(data) {
  return request({
    url: '/admin/addRole',
    method: 'post',
    data: data
  })
}

export function updateRole(data) {
  return request({
    url: '/admin/editRole',
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus' + id,
    method: 'post',
    params: params
  })
}

export function deleteRole(data) {
  return request({
    url:'/admin/deleteRole',
    method:'post',
    data:data
  })
}



export function queryRoleMenuList(data) {
  return request({
    url: '/admin/queryRoleMenuList',
    method: 'post',
    data:data
  })
}

export function roleAssignMenu(data) {
  return request({
    url: '/admin/roleAssignMenu',
    method: 'post',
    data:data
  })
}
