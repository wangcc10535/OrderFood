/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-27 16:46:20
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-28 02:58:33
 * @FilePath: \orderfood\src\api\MerchantOrderMgr\merchantIMgr\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 新增订单
export function addOrder(data) {
    return request({
        url: '/system/order/add',
        method: 'post',
        data: data
    })
}

// 删除【订单】
export function delOrder(id) {
    return request({
        url: '/system/order/del/' + id,
        method: 'delete'
    })
}

// 批量结算【订单】
export function billsOrder(data) {
    return request({
        url: '/system/order/bills',
        method: 'put',
        data: data
    })
}

// 查询未结算【订单】
export function detailOrder(query) {
    return request({
        url: '/system/order/detail',
        method: 'get',
        params: query
    })
}

// 修改【订单】
export function editOrder(data) {
    return request({
        url: '/system/order/edit',
        method: 'put',
        data: data
    })
}

// /dev-api/system/foodTable/list
// 查询桌面
export function foodTableList(query) {
    return request({
        url: '/system/area/list',
        method: 'get',
        params: query
    })
}
