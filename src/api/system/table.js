import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listTable(query) {
  return request({
    url: '/system/table/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getTable(id) {
  return request({
    url: '/system/table/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addTable(data) {
  return request({
    url: '/system/table',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateTable(data) {
  return request({
    url: '/system/table',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delTable(id) {
  return request({
    url: '/system/table/' + id,
    method: 'delete'
  })
}
