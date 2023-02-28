<!--
 * @Author: wangcc 1053578651@qq.com 桌面订单统计
 * @Date: 2023-01-24 22:09:27
 * @LastEditors: wcc 9316202+wccvidor@user.noreply.gitee.com
 * @LastEditTime: 2023-02-28 20:25:31
 * @FilePath: \orderfood\src\views\MerchantOrderMgr\merchantIMgr\dialog\orderDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="tableTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" v-if="dialogVisible"
            width="90%" :before-close="handleClose">
            <div class="center-order">
                <div class="addBtn">
                    <!-- supplement -->
                    <el-button type="primary" @click="supplementMenu">加菜</el-button>
                </div>

                <div class="detail-box" v-for="(order, index) in orderList" :key="index">
                    <div class="order-detail" :id="order.orderNo">
                        <h3 class="order-detail-nickName">{{ order.nickName }}</h3>
                        <p style="padding: 0 10px;">订单编号：{{ order.orderNo }}</p>
                        <span>************************</span>
                        <div class="order-detail-item">
                            <div class="order-detail-item-list">
                                <span class="order-detail-item-list-title weight">菜品名称</span>
                                <span class="order-detail-item-list-price weight">金额</span>
                                <span class="order-detail-item-list-total weight">数量</span>
                            </div>
                            <div class="order-detail-item-list" v-for="(items, ids) in order.food" :key="ids">
                                <span class="order-detail-item-list-title">{{ items.foodName }}</span>
                                <span class="order-detail-item-list-price">{{
                                    items.price * items.num
                                }}</span>
                                <span class="order-detail-item-list-total">✖{{ items.num }}</span>
                            </div>

                        </div>
                        <span>************************</span>
                        <div class="footer-money">
                            合计金额：{{ order.price | numFilter }}
                        </div>
                    </div>
                    <div class="footer-button">
                        <el-button type="warning" size="small" plain @click="editOrder(order)">修改订单</el-button>
                        <el-button type="primary" size="small" plain @click="printClick(order)">打印小票</el-button>
                        <el-button type="danger" size="small" plain @click="delOrder(order)">取消点餐</el-button>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="subMitAdd">清 台</el-button>
            </span>
            <!-- 修改订单 -->
            <edit ref="edit" @getDetail="getDetail" :titleTop="titleTop"></edit>
            <visible-log ref="visible" @getDetail="getDetail" :titleTop="visibleTitle"></visible-log>
            <el-dialog width="40%" title="结算" :visible.sync="innerVisible" append-to-body>
                <div class="settlement-box">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="桌面：">
                            {{ tableTitle }}
                        </el-form-item>
                        <el-form-item label="消费总金额：">
                            {{ money(orderList) }}元
                        </el-form-item>
                        <!-- <el-form-item label="收款方式：" prop="pay">
                            <el-radio-group v-model="ruleForm.pay" size="small">
                                <el-radio :label="item.value" border v-for="(item, index) in dict.type.pay_type"
                                    :key="index">{{ item.label }}</el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="settlementClose">取 消</el-button>
                    <el-button type="primary" @click="settlement">确定清台</el-button>
                </span>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
import edit from './edit.vue'
import visibleLog from './visibleLog.vue'
import { detailOrder, delOrder, billsOrder } from '@/api/MerchantOrderMgr/merchantIMgr/index.js'
import { getLodop } from '@/utils/LodopFuncs' //导入模块
import printView from '@/components/print/print.vue'
export default {
    name: '',
    props: { tableTitle: '' },
    components: {
        edit,
        visibleLog,
        printView
    },
    dicts: ['pay_type'],
    data() {
        return {
            strHtml: null,
            titleTop: '',
            visibleTitle: '',
            dialogVisible: false,
            innerVisible: false,
            saveFrom: {},
            rules: {
                pay: [{ required: true, message: '请选择支付方式', trigger: 'change' }]
            },
            ruleForm: {},
            tableData: {},
            orderList: []
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
            this.$parent.getFoodTable()
        },
        settlementClose() {
            this.innerVisible = false;
        },
        openVisible(data) {
            this.tableData = data;
            this.dialogVisible = true;
            this.getDetailOrder();
        },
        getDetailOrder() {
            let params = {
                tableId: this.tableData.id
            }
            detailOrder(params).then(res => {
                if (res.code == 200) {
                    if (res.rows.length == 0) {
                        this.handleClose()
                    }
                    this.orderList = res.rows.map(item => {
                        item.nickName = this.$store.state.user.userInfo.nickName;
                        return item;
                    })
                }
            })

        },
        getDetail() {
            this.getDetailOrder()
        },
        // 结算订单
        subMitAdd() {
            this.innerVisible = true
        },
        // 打印小票
        printClick(data) {
            let strHtml = document.getElementById(data.orderNo).innerHTML
            let styleAdd = `
            <style>
            .order-detail {
                width:400px
    height: 100%;
    border: 1px solid #c0c0c0;
    color: #000;}
    .order-detail-nickName {
        text-align: center;
    }
    .order-detail-item {
        border-top: 1px solid #c0c0c0;
        padding: 10px  0 20px 0;
        height: 45vh;
        border-bottom: 1px solid #c0c0c0;
    }
    .order-detail-item-list {
            padding: 0 8px;
    }
    .order-detail-item-list span {
                line-height: 25px;
                float: left;
                display: inline-block;
            }
            .order-detail-item-list-title {
                width: 90px;
                text-align: left;
            }

            .order-detail-item-list-price {
                width: 35px;
                text-align: left;
            }

            .order-detail-item-list-total {
                width: 35px;
                text-align: right;
            }
            .footer-money {
        text-align: right;
        padding: 0 10px 60px 0;
        line-height: 37px;
    }
      </style>`
            let strHtmlPrint = styleAdd + '<body>' + strHtml + '</body>'
            // console.log(this.strHtml);
            this.$nextTick(() => {
                let LODOP = getLodop()//调用getLodop获取LODOP对象
                LODOP.PRINT_INIT("")
                LODOP.SET_LICENSES('', '15F0BE661E7F39DF7491843CB2514F3D', '', '')
                LODOP.SET_PRINT_PAGESIZE(3, "58mm", 60, "");
                LODOP.SET_PRINT_STYLE("FontSize", 4);
                LODOP.ADD_PRINT_HTM('0mm', '0mm', '100%', '100%', strHtmlPrint)
                // LODOP.PREVIEW()
                LODOP.PRINT()
            })
        },
        // 修改订单
        editOrder(data) {
            this.titleTop = '修改订单'
            this.$refs.edit.openVisible(data)
        },
        // 取消订单
        delOrder(data) {
            this.$confirm('此操作将取消当前订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delOrder(data.id).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.getDetailOrder()
                    }
                })

            })
        },
        supplementMenu() {
            this.visibleTitle = '加菜'
            this.$refs.visible.openVisible(this.tableData)
        },
        // 确定收款
        settlement() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let dataArray = this.orderList.map(item => {
                        return item.id
                    })
                    let params = {
                        ids: dataArray,
                        pay: this.ruleForm.pay
                    }
                    billsOrder(params).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '结算成功!'
                            });
                            this.handleClose()
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        money(arr) {
            var s = 0;
            arr.forEach(function (val, idx, arr) {
                s += Number(val.price)
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
        width: 210px;
        float: left;
        margin: 0 10px 10px 0;

        .footer-button {
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }

    .detail-box:nth-child(5n) {
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
        min-height: 30vh;
        border-bottom: 1px solid #c0c0c0;

        &-list {
            padding: 0 8px;

            span {
                line-height: 25px;
                // float: left;
                display: inline-block;
            }

            &-title {
                width: 90px;
                text-align: left;
            }

            &-price {
                width: 70px;
                text-align: left;
            }

            &-total {
                width: 30px;
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

::v-deep .el-button--small {
    padding: 8px 4px;
}

.addBtn {
    position: absolute;
    top: 0;
    right: 20px;
}
</style>