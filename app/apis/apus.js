import request from '@utils/request'

// 省
export function fetchProvince(data) {
  return request({
    url: '/apus/districts/list',
    method: 'get',
    params: {...data}
  })
}

// 客户信息
// 分页查询客户
export function fetchCustomer(data) {
  return request({
    url: '/apus/customers/page',
    method: 'get',
    params: {...data}
  })
}
//查询所有客户
export function fetchAllCustomer() {
  return request({
    url: '/apus/customers/list',
    method: 'get'
  })
}
// 新增
export function addCustomer(data) {
  return request({
    url: '/apus/customers',
    method: 'post',
    data
  })
}
// 修改
export function editCustomer(data) {
  return request({
    url: `/apus/customers/${data.id}`,
    method: 'put',
    data
  })
}
//删除客户
export function deleteCustomer(id) {
  return request({
    url: `/apus/customers/${id}`,
    method: 'delete',
  })
}
//查询客户的物料
export function fetchCpns(id) {
  return request({
    url: `/apus/cpns/${id}`,
    method: 'get',
  })
}
//分页查询物料
export function fetchCpns2(data) {
  return request({
    url: `/apus/cpns/page`,
    method: 'get',
    params: {...data}
  })
}
//新增物料
export function addCpns(data) {
  return request({
    url: '/apus/cpns',
    method: 'post',
    data
  })
}
//修改物料
export function editCpns(data) {
  return request({
    url: `/apus/cpns/${data.id}`,
    method: 'put',
    data
  })
}
//删除物料
export function deleteCpns(id) {
  console.log(id)
  return request({
    url: `/apus/cpns/${id.dtoId}/${id.id}`,
    method: 'delete',
  })
}

// 供应商
//查询
export function fetchVendor(data) {
  return request({
    url: `/apus/vendors/page`,
    method: 'get',
    params: {...data}
  })
}
//查询所有供应商
export function fetchAllVendor() {
  return request({
    url: `/apus/vendors/list`,
    method: 'get',
  })
}
// 新增供应商
export function addVendor(data) {
  return request({
    url: '/apus/vendors',
    method: 'post',
    data
  })
}
// 更新供应商
export function editVendor(data) {
  return request({
    url: `/apus/vendors/${data.id}`,
    method: 'put',
    data
  })
}
// 删除供应商
export function deleteVendor(id) {
  return request({
    url: `/apus/vendors/${id}`,
    method: 'delete',
  })
}
