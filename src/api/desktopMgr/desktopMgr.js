import request from '@/utils/request'

// 查询【区域】列表
export function listArea(query) {
    return request({
        url: '/system/area/list',
        method: 'get',
        params: query
    })
}

// 新增【区域】
export function addArea(data) {
    return request({
        url: '/system/area/add',
        method: 'post',
        data: data
    })
}

// 修改【区域】
export function updateArea(data) {
    return request({
        url: '/system/area',
        method: 'put',
        data: data
    })
}

// 删除【区域】
export function delArea(id) {
    return request({
        url: '/system/area/' + id,
        method: 'delete'
    })
}



// 查询【桌面】列表
export function listTable(query) {
    return request({
        url: '/system/table/list',
        method: 'get',
        params: query
    })
}

// 新增【桌面】
export function addTable(data) {
    return request({
        url: '/system/table/add',
        method: 'post',
        data: data
    })
}

// 修改【桌面】
export function updateTable(data) {
    return request({
        url: '/system/table',
        method: 'put',
        data: data
    })
}

// 删除【桌面】
export function delTable(id) {
    return request({
        url: '/system/table/' + id,
        method: 'delete'
    })
}