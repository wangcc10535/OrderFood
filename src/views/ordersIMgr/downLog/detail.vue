<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-16 23:01:13
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-29 00:50:10
 * @FilePath: \orderfood\src\views\ordersIMgr\downLog\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="dialog-box">
        <el-drawer title="订单详情" :visible.sync="drawer" size="80%" :direction="direction" :before-close="handleClose">
            <div class="center-dialog-box">
                <div class="base-box" style="margin-top: 0">
                    <div class="title-class">
                        <span></span>基本信息
                    </div>
                    <div class="row-box">
                        <el-row>
                            <el-col :span="12" v-for="(item, index) in baseList" :key="index">
                                <div class="item-class">
                                    <el-row>
                                        <el-col :span="6">
                                            <div class="left-class">{{ item.label }}：</div>
                                        </el-col>
                                        <el-col :span="18">
                                            <div v-if="item.type === 'status'">
                                                {{ selectDictLabel(dict.type.order_status, details[item.key]) || '-' }}</div>
                                            <div v-else-if="item.type === 'pay'">
                                                {{ selectDictLabel(dict.type.pay_type, details[item.key])  || '-'}}
                                            </div>
                                            <div v-else>{{ details[item.key]  || '-'}}</div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="center-dialog-box">
                <div class="base-box" style="margin-top: 0">
                    <div class="title-class">
                        <span></span>菜单详情
                    </div>
                    <div class="row-box">
                        <el-table :data="details.food" border height="540" style="width: 100%">
                            <el-table-column prop="foodName" label="菜品名称" align="center"></el-table-column>
                            <el-table-column prop="num" label="购买数量" align="center"></el-table-column>
                            <el-table-column prop="price" label="菜品价格(元)" align="center"></el-table-column>
                            <el-table-column label="合计金额（元）" align="center">
                                <template slot-scope="{row}">
                                    {{ Number(row.num) *  Number(row.price) || '-'}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { getOrder } from '@/api/ordersIMgr/ordersMgr'
export default {
    name: 'detail',
    dicts: ['order_status', 'pay_type'],
    data() {
        return {
            drawer: false,
            direction: 'rtl',
            details: {},
            dataTime: '',
            tableData: [],
            baseList: [
                { id: 1, label: '订单编号', value: '', key: 'orderNo' },
                { id: 9, label: '所属门店', value: '', key: 'shopName' },
                { id: 9, label: '桌面', value: '', key: 'tableName' },
                {
                    id: 2,
                    label: '开台时间',
                    value: '',
                    key: 'createTime',
                    type: 'status'
                },
                { id: 3, label: '结算时间', value: '', key: 'billTime' },
                { id: 4, label: '订单状态', value: '', key: 'status', type: 'status' },
                { id: 5, label: '结算方式', value: '', key: 'pay', type: 'pay' },
                { id: 6, label: '订单金额', value: '', key: 'price' },
                { id: 7, label: '实际支付', value: '', key: 'amount', },
                {
                    id: 8,
                    label: '优惠金额',
                    value: '是/否',
                    key: 'discountAmount',
                    type: 'isInvoice'
                }
            ]
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        openDrawer(row) {
            console.log(row);
            this.drawer = true;
            this.details = row
            // this.getOrderDetail(row.id)
        },
        // getOrderDetail(id) {
        //     getOrder(id).then(res =>{
        //         if (res.code == 200) {
        //             console.log(res);
        //             this.details = res.data;
        //         }
        //     })
        // },
        handleClose() {
            this.drawer = false;
        }
    }
};
</script>
<style scoped lang='scss'>
.dialog-box {
    .tables-box {
        margin-top: 25px;
    }

    .center-dialog-box {
        padding: 20px;

        .base-box {
            margin-top: 30px;
        }

        .row-box {
            margin-top: 15px;
        }

        .item-class {
            // line-height: 24px;
            padding: 10px 0;
            color: #696969;

            .left-class {
                text-align: right;
                color: #000000;
            }
        }

        .logistics-box {
            margin-top: 25px;
            padding-left: 8%;
            width: 500px;
        }

        .time-line-box {
            margin-top: 25px;
            padding-left: 8%;
            width: 500px;

            .center-box {
                position: relative;
                font-size: 18px;

                .name-class span {
                    position: absolute;
                    right: 0;
                    top: 0;
                    font-size: 18px;
                }

                .name-class span.parcelType-color {
                    font-size: 14px;
                    font-weight: 600;
                }

                .address {
                    font-size: 14px;
                }

                .ok-class {
                    color: #67c23a;
                }

                .wait-class {
                    color: #e6a23c;
                }

                .describe-class {
                    font-size: 15px;
                    color: #3f3f3f;
                    padding: 10px 0;
                    min-height: 40px;

                    .el-icon-paperclip {
                        font-size: 24px;
                        position: relative;
                        top: 2px;
                        margin-right: 5px;
                    }

                    img {
                        cursor: pointer;
                    }
                }

                .describe-color {
                    color: #909399;
                }
            }
        }
    }

    .time-line-box ::v-deep .el-timeline-item__node {
        width: 20px;
        height: 20px;
        left: -6px;
    }

    .title-class {
        font-size: 17px;
        position: relative;
        color: #000000;

        span {
            display: inline-block;
            position: absolute;
            top: 0;
            left: -10px;
            width: 4px;
            height: 24px;
            background-color: #0095ff;
        }
    }
}
</style>