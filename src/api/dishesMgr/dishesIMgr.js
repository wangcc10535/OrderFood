/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-14 23:26:33
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-14 23:28:19
 * @FilePath: \orderfood\src\api\dishesMgr\dishesIMgr.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 查询【菜品】列表
export function listFood(query) {
    return request({
        url: '/system/food/list',
        method: 'get',
        params: query
    })
}

// 查询【菜品】详细
export function getFood(id) {
    return request({
        url: '/system/food/' + id,
        method: 'get'
    })
}

// 新增【菜品】
export function addFood(data) {
    return request({
        url: '/system/food',
        method: 'post',
        data: data
    })
}

// 修改【菜品】
export function updateFood(data) {
    return request({
        url: '/system/food',
        method: 'put',
        data: data
    })
}

// 删除【菜品】
export function delFood(id) {
    return request({
        url: '/system/food/' + id,
        method: 'delete'
    })
}