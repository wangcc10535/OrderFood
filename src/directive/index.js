/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-14 22:34:47
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-27 16:02:15
 * @FilePath: \orderfood\src\directive\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'
import dialogDrag from './dialog/drag'
import dialogDragWidth from './dialog/dragWidth'
import dialogDragHeight from './dialog/dragHeight'
import clipboard from './module/clipboard'
import preventReClick from './PreventReClick';

const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
  Vue.directive('clipboard', clipboard)
  Vue.directive('dialogDrag', dialogDrag)
  Vue.directive('preventReClick', preventReClick);
  Vue.directive('dialogDragWidth', dialogDragWidth)
  Vue.directive('dialogDragHeight', dialogDragHeight)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  window['preventReClick'] = preventReClick;
  Vue.use(install); // eslint-disable-line
}

export default install
