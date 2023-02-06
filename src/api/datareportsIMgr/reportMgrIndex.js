/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-02-06 13:49:40
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-06 13:51:13
 * @FilePath: \orderfood\src\api\datareportsIMgr\reportMgrIndex.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 日订单
export function DayOrder(query) {
    return request({
        url: '/system/order/getOrderStatisticsByDay',
        method: 'get',
        params: query
    })
}

// 月订单
export function MonthOrder(query) {
    return request({
        url: '/system/order/getOrderStatisticsByMonth',
        method: 'get',
        params: query
    })
}
// 年订单
export function YearOrder(query) {
    return request({
        url: '/system/order/getOrderStatisticsByYear',
        method: 'get',
        params: query
    })
}