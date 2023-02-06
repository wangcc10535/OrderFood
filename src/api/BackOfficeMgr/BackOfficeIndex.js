/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-02-06 10:55:22
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-06 11:05:10
 * @FilePath: \orderfood\src\api\BackOfficeMgr\BackOfficeIndex.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 菜品销量排行
export function SalesRanking(query) {
    return request({
        url: '/system/order/getSalesRanking',
        method: 'get',
        params: query
    })
}


// 营收趋势
export function SalesVolume(query) {
    return request({
        url: '/system/order/getSalesVolume',
        method: 'get',
        params: query
    })
}

// 订单量销售额
export function getTotal(query) {
    return request({
        url: '/system/order/getTotal',
        method: 'get',
        params: query
    })
}
