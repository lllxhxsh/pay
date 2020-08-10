import request from '@/utils/request'

export function userList(data) {

  return request({
    url: '/admin/queryUser',
    method: 'post',
    data: data
  })
}

export function createUser(data) {
  return request({
    url: '/admin/addUser',
    method: 'post',
    data: data
  })
}

export function editUser(data) {
  return request({
    url: '/admin/editUser',
    method: 'post',
    data: data
  })
}

export function deleteUser(data) {
  return request({
    url:'/admin/deleteUser',
    method:'post',
    data:data
  })
}

export function modifyUserState(data) {
  return request({
    url:'/admin/modifyUserState',
    method:'post',
    data:data
  })
}

export function userAssignRole(data) {
  return request({
    url:'/admin/userAssignRole',
    method:'post',
    data:data
  })
}

export function queryUserRole(data) {
  return request({
    url:'/admin/queryUserRole',
    method:'post',
    data:data
  })
}


