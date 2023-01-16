/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-15 16:57:32
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-17 01:34:40
 * @FilePath: \orderfood\src\api\ordersIMgr\ordersMgr.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 查询【订单】列表
export function listOrder(query) {
    return request({
        url: '/system/order/list',
        method: 'get',
        params: query
    })
}

// 查询【订单】详细
export function getOrder(id) {
    return request({
        url: '/system/order/' + id,
        method: 'get'
    })
}

// 新增【订单】
export function addOrder(data) {
    return request({
        url: '/system/order/add',
        method: 'post',
        data: data
    })
}

// 修改【订单】
export function updateOrder(data) {
    return request({
        url: '/system/order',
        method: 'put',
        data: data
    })
}

// 删除【订单】
export function delOrder(id) {
    return request({
        url: '/system/order/' + id,
        method: 'delete'
    })
}

// 订单结算
export function putBill(data) {
    return request({
        url: '/system/order/bill',
        method: 'put',
        data: data
    })
}