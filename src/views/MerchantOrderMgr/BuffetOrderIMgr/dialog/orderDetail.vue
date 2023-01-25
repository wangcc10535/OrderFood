<!--
 * @Author: wangcc 1053578651@qq.com 桌面订单统计
 * @Date: 2023-01-24 22:09:27
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-25 01:45:47
 * @FilePath: \orderfood\src\views\MerchantOrderMgr\merchantIMgr\dialog\orderDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="tableTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" v-if="dialogVisible"
            width="45%" :before-close="handleClose">
            <div class="center-order">
                <div class="detail-box" v-for="(order,index) in orderList" :key="index">
                    <div class="order-detail">
                        <h3 class="order-detail-nickName">{{ order.nickName }}</h3>
                        <p style="padding: 0 10px;">订单编号：{{order.orderId}}</p>
                        <div class="order-detail-item">
                            <div class="order-detail-item-list">
                                <span class="order-detail-item-list-title weight">菜品名称</span>
                                <span class="order-detail-item-list-price weight">金额</span>
                                <span class="order-detail-item-list-total weight">数量</span>
                            </div>
                            <div class="order-detail-item-list" v-for="(items,ids) in order.orderList" :key="ids">
                                <span class="order-detail-item-list-title">{{items.name}}</span>
                                <span class="order-detail-item-list-price">{{items.price | numFilter}}</span>
                                <span class="order-detail-item-list-total">{{items.num}}</span>
                            </div>
                        </div>
                        <div class="footer-money">
                            合计金额：{{order.totalNum |numFilter}}
                        </div>
                    </div>
                    <div class="footer-button">
                        <el-button type="warning" size="small" plain @click="editOrder(order)">修改订单</el-button>
                        <el-button type="primary" size="small" plain @click="print">打印小票</el-button>
                        <el-button type="danger" size="small" plain @click="delOrder(order)">取消</el-button>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="subMitAdd">结 算</el-button>
            </span>
            <visible-log ref="visible" :titleTop="titleTop"></visible-log>
            <el-dialog width="40%" title="结算" :visible.sync="innerVisible" append-to-body>
                <div class="settlement-box">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="桌面：" prop="name">
                            {{ tableTitle }}
                        </el-form-item>
                        <el-form-item label="消费总金额：" prop="name">
                            {{money(orderList)}}元
                        </el-form-item>
                        <el-form-item label="收款方式：" prop="name">
                            <el-radio-group v-model="saveFrom.pay" size="small">
                                <el-radio :label="item.value" border v-for="(item, index) in dict.type.pay_type"
                                    :key="index">{{ item.label }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="settlementClose">取 消</el-button>
                    <el-button type="primary" @click="settlement">确定收款</el-button>
                </span>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: '',
    props: { tableTitle: '' },
    dicts: ['pay_type'],
    data() {
        return {
            titleTop: '',
            dialogVisible: false,
            innerVisible: false,
            saveFrom: {},
            rules: {},
            ruleForm: {},
            orderList:[
                {
                    totalNum:888,
                    orderId:'12450124',
                    nickName: this.$store.state.user.userInfo.nickName,
                    orderList:[
                        {
                            name:'麻辣小龙虾',
                            price:88,
                            num:1
                        },
                        {
                            name:'麻辣小龙虾',
                            price:88,
                            num:1
                        },
                        {
                            name:'麻辣小龙虾',
                            price:88,
                            num:1
                        }
                    ]
                },
                {
                    totalNum:420,
                    orderId:'0121451',
                    nickName:this.$store.state.user.userInfo.nickName,
                    orderList:[
                        {
                            name:'红烧蹄膀',
                            price:68,
                            num:1
                        },
                        {
                            name:'麻辣小龙虾',
                            price:88,
                            num:1
                        },
                        {
                            name:'火爆腰花',
                            price:26,
                            num:1
                        }
                    ]
                }
            ]
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
        handleClose() {
            this.dialogVisible = false;
        },
        settlementClose() {
            this.innerVisible = false;
        },
        openVisible(data) {
            console.log(data);
            this.dialogVisible = true;
        },
        // 结算订单
        subMitAdd() {
            this.innerVisible = true
        },
        // 打印小票
        print() { },
        // 修改订单
        editOrder(data) {
            this.titleTop = '修改订单'
            this.$refs.visible.openVisible(data)
        },
        // 取消订单
        delOrder(data) {
            this.$confirm('此操作将取消当前订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            })
        },
        supplementMenu() {
            this.titleTop = '加菜'
            this.$refs.visible.openVisible()
        },
        // 确定收款
        settlement() {

        },
        money(arr) {
            var s = 0;
            arr.forEach(function (val, idx, arr) {
                s += Number(val.totalNum)
            }, 0);
            return s;
        },
    }
};
</script>
<style scoped lang='scss'>
.center-order {
    overflow: auto;
    max-height: 615px;

    .detail-box {
        width: 45%;
        float: left;
        margin: 0 10px 10px 0;

        .footer-button {
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }

    .detail-box:nth-child(4n) {
        margin-right: 0;
    }


}

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

::v-deep .el-dialog__body {
    position: relative;
}

.addBtn {
    position: absolute;
    top: 0;
    right: 20px;
}
</style>