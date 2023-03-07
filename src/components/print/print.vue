<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-29 22:44:30
 * @LastEditors: wcc 9316202+wccvidor@user.noreply.gitee.com
 * @LastEditTime: 2023-03-05 21:29:55
 * @FilePath: \orderfood\src\components\print\print.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="order-detail">
            <h3 class="order-detail-nickName">{{ order.nickName }}</h3>
            <p style="padding: 0 10px;">订单编号：{{ order.orderNo }}</p>
            <div class="order-detail-item">
                <div class="order-detail-item-list">
                    <span class="order-detail-item-list-title weight">菜品名称</span>
                    <span class="order-detail-item-list-price weight">金额</span>
                    <span class="order-detail-item-list-total weight">数量</span>
                </div>
                <div class="order-detail-item-list" v-for="(items, ids) in order.food" :key="ids">
                    <span class="order-detail-item-list-title">{{ items.foodName }}</span>
                    <span class="order-detail-item-list-price">{{
                        items.price * items.num | numFilter
                    }}</span>
                    <span class="order-detail-item-list-total">{{ items.num }}</span>
                </div>
            </div>
            <div class="footer-money">
                合计金额：{{ order.price | numFilter }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            order: {},
        }
    },
    created() {
    },
    mounted() {
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后三位
            let tempVal = parseFloat(value).toFixed(3)
            let realVal = tempVal.substring(0, tempVal.length - 1)
            return realVal
        }
    },
    methods: {

    }
};
</script>
<style scoped lang='scss'>
.order-detail {
    height: 100%;
    border: 1px solid #c0c0c0;
    color: #000;

    &-nickName {
        text-align: center;
    }

    &-item {
        border-top: 1px solid #c0c0c0;
        padding: 10px 0;
        height: 45vh;
        border-bottom: 1px solid #c0c0c0;

        &-list {
            display: flex;
            padding: 0 8px;
            justify-content: space-between;

            span {
                line-height: 25px;
            }

            &-title {
                width: 50%;
                text-align: left;
            }

            &-price {
                width: 25%;
                text-align: left;
            }

            &-total {
                width: 25%;
                text-align: left;
            }
        }
    }

    .weight {
        font-weight: 600;
    }

    .footer-money {
        text-align: right;
        padding: 0 10px;
        line-height: 37px;
    }
}
</style>