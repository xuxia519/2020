import request from '@utils/request'

export function fetchWarehouses(data) {
  return request({
    url: '/pavo/warehouses/page',
    method: 'get',
    params: {...data}
  })
}

// 省
export function fetchProvince(data) {
  return request({
    url: '/pavo/districts/list',
    method: 'get',
    params: {...data}
  })
}

// 新增仓库
export function addWarehouses(data) {
  return request({
    url: '/pavo/warehouses',
    method: 'post',
    data
  })
}

// 删除仓库
export function deleteWarehouse(id) {
  return request({
    url: `/pavo/warehouses/${id}`,
    method: 'delete'
  })
}

// 查询设备类型
export function fetchDeviceType() {
  return request({
    url: '/pavo/device-types/list',
    method: 'get',
  })
}
//添加设备
export function addDevices(data) {
  const { id } = data;
  delete data.id;
  return request({
    url: `/pavo/devices/${id}`,
    method: 'post',
    data
  })
}
// 查询设备(page)
export function fetchDevices(data) {
  const { type } = data;
  delete data.type;
  return request({
    url: `/pavo/devices/${type}/page`,
    method: 'get',
    params: {...data}
  })
}
// 修改设备
export function editDevices(data) {
  const { id } = data;
  delete data.id;
  return request({
    url: `/pavo/devices/${id}`,
    method: 'put',
    data
  })
}
