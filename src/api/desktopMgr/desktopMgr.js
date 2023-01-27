/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-15 20:21:45
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-27 20:05:05
 * @FilePath: \orderfood\src\api\desktopMgr\desktopMgr.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        url: '/system/area/edit',
        method: 'put',
        data: data
    })
}

// 删除【区域】
export function delArea(id) {
    return request({
        url: '/system/area/del/' + id,
        method: 'delete'
    })
}



// 查询【桌面】列表
export function listTable(query) {
    return request({
        url: '/system/foodTable/list',
        method: 'get',
        params: query
    })
}

// 新增【桌面】
export function addTable(data) {
    return request({
        url: '/system/foodTable/add',
        method: 'post',
        data: data
    })
}

// 修改【桌面】
export function updateTable(data) {
    return request({
        url: '/system/foodTable/edit',
        method: 'put',
        data: data
    })
}

// 删除【桌面】
export function delTable(id) {
    return request({
        url: '/system/foodTable/del/' + id,
        method: 'delete'
    })
}