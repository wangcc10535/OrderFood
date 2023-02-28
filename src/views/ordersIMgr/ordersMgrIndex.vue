<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 22:31:48
 * @LastEditors: wcc 9316202+wccvidor@user.noreply.gitee.com
 * @LastEditTime: 2023-02-28 20:19:47
 * @FilePath: \orderfood\src\views\ordersIMgr\ordersMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="topSearch base-background top-box" ref="element">
            <div class="topSearch-base magin-base">
                <span>订单编号：</span>
                <el-input class="topSearch-width" v-model="searchFrom.townName" placeholder="请输入"></el-input>
            </div>
            <div class="topSearch-base magin-base">
                <span>订单状态：</span>
                <el-select class="topSearch-width" v-model="searchFrom.eventType" placeholder="请选择">
                    <el-option v-for="item in dict.type.order_status" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="topSearch-base magin-base">
                <span>查询日期：</span>
                <el-date-picker v-model="dateValue" type="daterange" value-format="yyyy-MM-dd" align="right"
                    unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>

            </div>
            <el-button class="magin-base" type="primary" size="mini" @click="searchQuery">搜索</el-button>
            <el-button class="magin-base" type="warning" size="mini" @click="resetQuery">重置</el-button>
        </div>
        <div class="content base-background">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addOrders">插入订单</el-button>
            <div class="content-table">
                <el-table :data="tableData" border v-loading="loading" element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    :height="baseHeight" style="width: 100%">
                    <el-table-column prop="orderNo" label="订单编号" align="center"></el-table-column>
                    <el-table-column prop="shopName" label="所属店铺" align="center"></el-table-column>
                    <el-table-column label="桌号" align="center">
                        <template slot-scope="{row}">
                            <span v-if="row.tableId < 0">-</span>
                            <span v-else>{{ row.tableName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="点餐菜品" align="center" width="180">
                        <template slot-scope="{row}">
                            <div class="listRows">
                                <span v-for="(item, index) in row.food" :key="index">{{ item.foodName }}X{{
                                    item.num
                                }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="createTime" label="开台时间" align="center"></el-table-column> -->
                    <el-table-column prop="billTime" label="结算时间" align="center">
                        <template slot-scope="{row}">
                            {{ row.billTime || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="订单金额" align="center"></el-table-column>
                    <el-table-column prop="amount" label="实收金额" align="center"></el-table-column>
                    <el-table-column prop="discountAmount" label="优惠金额" align="center">
                        <template slot-scope="{row}">
                            {{ row.discountAmount || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="订单状态" align="center">
                        <template slot-scope="{row}">
                            <span>{{ selectDictLabel(dict.type.order_status, row.status) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pay" label="收款方式" align="center">
                        <template slot-scope="{row}">
                            <span>{{ selectDictLabel(dict.type.pay_type, row.pay) || '-' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template slot-scope="scope">
                            <el-button @click="detail(scope.row)" size="small" class="link-m"
                                type="primary">查看</el-button>
                            <el-button @click="settlement(scope.row)" size="small" class="link-m" type="warning"
                                v-if="scope.row.status == 1">结算</el-button>
                            <el-popconfirm confirm-button-text="是的" cancel-button-text="不用了"
                                @confirm="compDelete(scope.row)" title="确定删除吗？" v-hasPermi="['system:order:delete']">
                                <el-button type="danger" size="small" class="link-m" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!--   分页   -->
                <div class="pagination-box" v-if="total > 0">
                    <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                        @pagination="getList" />
                </div>
            </div>
        </div>
        <add-log ref="addOrEdit" :titleTop="titleTop"></add-log>
        <detail ref="detail"></detail>
        <billLog ref="billLog"></billLog>
    </div>
</template>
<script>
import { listOrder, delOrder } from '@/api/ordersIMgr/ordersMgr'
import detail from './downLog/detail.vue'
import addLog from './dialog/addOredit.vue'
import billLog from './dialog/billLog.vue'
export default {
    name: 'ordersMgrIndex',
    dicts: ['order_status', 'pay_type'],
    components: { addLog, detail, billLog },
    data() {
        return {
            titleTop: '',
            loading: false,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            dateValue: [],
            searchFrom: {},
            tableData: [],
            total: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            baseHeight: '520'
        }
    },
    created() {
        this.getList()
    },
    mounted() {
        this.$nextTick(() => {
            this.baseHeight = document.body.clientHeight - this.$refs.element.offsetHeight - 297
        })
    },
    methods: {
        searchQuery() {
            this.getList()
        },
        resetQuery() {
            this.searchFrom = {};
            this.dateValue = []
            this.getList()
        },
        addOrders() {
            this.titleTop = '插入订单'
            this.$refs.addOrEdit.openVisible()
        },
        async getList() {
            this.loading = true;
            if (this.dateValue) {
                this.searchFrom.starDate = this.dateValue[0]
                this.searchFrom.endDate = this.dateValue[1]
            }
            let { total, code, rows } = await listOrder({ ...this.searchFrom, ...this.queryParams });
            if (code == 200) {
                this.total = total;
                this.loading = false;
                let rowsList = rows.map(element => {
                    if (element.discountAmount == null) {
                        element.discountAmount = 0
                    }
                    element.amount = element.price - element.discountAmount
                    return element
                });
                this.tableData = rowsList
            }
        },
        detail(row) {
            this.$refs.detail.openDrawer(row)
        },
        settlement(row) {
            this.$refs.billLog.openVisible(row)
        },
        compDelete(row) {
            delOrder(row.id).then(res => {
                if (res.code == 200) {
                    this.$message.success('操作成功！');
                    this.getList()
                }
            })
        }
    }
};
</script>
<style scoped lang='scss'>
.listRows {
    display: flex;
    flex-direction: column;
}
</style>