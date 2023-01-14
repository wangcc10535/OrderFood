import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listFood(query) {
  return request({
    url: '/system/food/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getFood(id) {
  return request({
    url: '/system/food/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addFood(data) {
  return request({
    url: '/system/food',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateFood(data) {
  return request({
    url: '/system/food',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delFood(id) {
  return request({
    url: '/system/food/' + id,
    method: 'delete'
  })
}
