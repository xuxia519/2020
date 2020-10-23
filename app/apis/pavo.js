import request from '@utils/request'

export function fetchWarehouses(data) {
  return request({
    url: '/pavo/warehouses/page',
    method: 'get',
    params: {...data}
  })
}
export function fetchWarehousesAll(data) {
  return request({
    url: '/pavo/warehouses/list',
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
// 删除设备
export function deleteDevice(id) {
  return request({
    url: `/pavo/devices/${id}`,
    method: 'delete'
  })
}
//BOM
export function fetchBOM(data) {
  return request({
    url: `/pavo/devices/6/page`,
    method: 'get',
    params: {...data}
  })
}
//
export function fetchDevicesByCode(code) {
  return request({
    url: `/pavo/devices/${code}/code-list`,
    method: 'get',
  })
}
// 添加bom
export function addBOM(data) {
  return request({
    url: `/pavo/devices/6`,
    method: 'post',
    data
  })
}

// 添加库区
export function addWarehouseAreas(data) {
  return request({
    url: `/pavo/warehouse-areas`,
    method: 'post',
    data
  })
}
//查询库位
export function fetchWarehouseAreas(data) {
  return request({
    url: `/pavo/warehouse-areas/page`,
    method: 'get',
    params: {...data}
  })
}
//入库
//查询
export function fetchInboundRecords(data) {
  return request({
    url: `/pavo/inbound-records/page`,
    method: 'get',
    params: {...data}
  })
}
// 新增
export function addInboundRecords(data) {
  return request({
    url: `/pavo/inbound-records`,
    method: 'post',
    data
  })
}
// 删除
export function deleteInboundRecords(id) {
  return request({
    url: `/pavo/inbound-records/${id}`,
    method: 'delete'
  })
}
//出库
//查询
export function fetchOutboundRecords(data) {
  return request({
    url: `/pavo/outbound-records/page`,
    method: 'get',
    params: {...data}
  })
}
//
export function addOutboundRecords(data) {
  return request({
    url: `/pavo/outbound-records`,
    method: 'post',
    data
  })
}
// 标签
export function fetchCodeDevices(data) {
  return request({
    url: `/pavo/code-devices/page`,
    method: 'get',
    params: {...data}
  })
}
export function getCode(data) {
  return request({
    url: `/pavo/code-devices/${data.warehouseAreaCode}/${data.userCode}/${data.printNumber}/code`,
    method: 'get'
  })
}
//批量添加便签
export function addCodeDevices(data) {
  return request({
    url: `/pavo/code-devices/bach`,
    method: 'post',
    data
  })
}
// 清洗
// 查询
export function fetchWashRecords(data) {
  return request({
    url: `/pavo/wash-records/page`,
    method: 'get',
    params: {...data}
  })
}
// add
export function addWashRecords(data) {
  return request({
    url: `/pavo/wash-records`,
    method: 'post',
    data
  })
}
// pack
// search
export function fetchPackRecords(data) {
  return request({
    url: `/pavo/pack-records/page`,
    method: 'get',
    params: {...data}
  })
}
//unpack
// search
export function fetchUnPackRecords(data) {
  return request({
    url: `/pavo/unpack-records/page`,
    method: 'get',
    params: {...data}
  })
}