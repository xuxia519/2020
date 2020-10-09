import request from '@utils/request'

export function fetchUser(data) {
  console.log(data)
  return request({
    url: '/orion/users/admin/page',
    method: 'get',
    params: {...data}
  })
}

// 添加用户
export function addUser(data) {
  console.log(data)
  return request({
    url: '/orion/users/admin',
    method: 'post',
    data
  })
}

// 修改用户信息
export function editUserInfo(data) {
  console.log(data)
  return request({
    url: `/orion/users/admin/${data.id}/base-info`,
    method: 'put',
    data
  })
}

//所有角色
export function fetchRole() {
  return request({
    url: '/orion/roles/list',
    method: 'get'
  })
}

//分页查询角色
export function fetchRoleByParam(data) {
  console.log(data)
  return request({
    url: '/orion/roles/page',
    method: 'get',
    params: {...data}
  })
}

//所有权限
export function fetchPermissions() {
  return request({
    url: '/orion/permissions/list',
    method: 'get'
  })
}

//分页查询权限
export function fetchPermissionsByParam(data) {
  return request({
    url: '/orion/permissions/page',
    method: 'get',
    params: {...data}
  })
}

//所有资源
export function fetchResource() {
  return request({
    url: '/orion/resources/tree',
    method: 'get'
  })
}

//分页查询资源
export function fetchResourceByParam(data) {
  return request({
    url: '/orion/resources/page',
    method: 'get',
    params: {...data}
  })
}

export function editUser(data) {
  return request({
    url: `/orion/users/admin/${data.id}/roles`,
    method: 'put',
    data: {roleIds: data.roleIds}
  })
}

// 添加角色
export function addRole(data) {
  console.log(data)
  return request({
    url: `/orion/roles`,
    method: 'post',
    data
  })
}

// 添加权限
export function addPermission(data) {
  console.log(data)
  return request({
    url: `/orion/permissions`,
    method: 'post',
    data
  })
}

//修改角色
export function editRole(data) {
  return request({
    url: `/orion/roles/${data.id}`,
    method: 'put',
    data
  })
}

//修改权限资源
export function editPermission(data) {
  console.log(data)
  return request({
    url: `/orion/permissions/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/orion/users/admin/${id}`,
    method: 'delete'
  })
}

// 删除用户的角色
export function deleteUserRole(data) {
  return request({
    url: `/orion/users/admin/${data.id}/roles`,
    method: 'put',
    data
  })
}
// 删除角色
export function deletePermission(id) {
  return request({
    url: `/orion/roles/${id}`,
    method: 'delete'
  })
}

// 删除权限
export function deletePower(id) {
  return request({
    url: `/orion/permissions/${id}`,
    method: 'delete'
  })
}

//所有部门
export function fetchDepartment() {
  return request({
    url: '/orion/departments/list',
    method: 'get'
  })
}
