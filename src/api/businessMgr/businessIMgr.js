/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-08 16:13:03
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-14 22:36:54
 * @FilePath: \orderfood\src\api\businessMgr\businessIMgr.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 新增店铺
export function AddShop(data) {
    return request({
        url: '/system/shop/add',
        method: 'POST',
        data: data
    })
}
// 修改店铺
export function editShop(data) {
    return request({
        url: '/system/shop/edit',
        method: 'POST',
        data: data
    })
}
// 删除店铺
export function deleteShop(data) {
    return request({
        url: '/system/shop/del',
        method: 'POST',
        data: data
    })
}

// 查询店铺
export function listShop(query) {
    return request({
        url: '/system/shop/list',
        method: 'get',
        params: query
    })
}