<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 22:49:42
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-06 14:56:09
 * @FilePath: \orderfood\src\views\datareportsIMgr\reportMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="app-container">
            <div class="topSearch base-background top-box" ref="element">
                <div class="topSearch-base magin-base" v-if="activeName == 'day'">
                    <span>时间：</span>
                    <el-date-picker v-model="searchFrom.day" value-format="yyyy-MM-dd" type="daterange"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="topSearch-base magin-base" v-if="activeName == 'month'">
                    <span>时间：</span>
                    <el-date-picker v-model="searchFrom.month" value-format="yyyy-MM" type="month" placeholder="选择月">
                    </el-date-picker>
                </div>
                <div class="topSearch-base magin-base" v-if="activeName == 'year'">
                    <span>时间：</span>
                    <el-date-picker v-model="searchFrom.year" value-format="yyyy" type="year" placeholder="选择年">
                    </el-date-picker>
                </div>
                <el-button class="magin-base" type="primary" size="mini" @click="searchQuery">搜索</el-button>
                <el-button class="magin-base" type="warning" size="mini" @click="resetQuery">重置</el-button>
            </div>
            <div class="content base-background">
                <div class="content-table">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane v-for="(item, index) in reportList" :key="index" :label="item.label"
                            :name="item.name"></el-tab-pane>
                    </el-tabs>
                    <el-table :data="tableData" border :height="baseHeight" style="width: 100%">
                        <el-table-column prop="dswr" label="日期" fixed="left" align="center"></el-table-column>
                        <el-table-column prop="cropName" label="订单数" align="center"></el-table-column>
                        <el-table-column prop="cropName" label="订单金额" align="center"></el-table-column>
                        <el-table-column prop="cropName" label="优惠金额" align="center"></el-table-column>
                        <el-table-column prop="cropName" label="实际营业额" align="center"></el-table-column>
                    </el-table>
                    <p v-if="activeName == 'day'">2022年5月日表统计，合计：订单数：480单，订单金额：142000元；实际营业额：140000元</p>
                    <p v-if="activeName == 'month'">2022年1月至今统计，合计：订单数：24000单，订单金额：1440000元；合计营业额：1440000元</p>
                    <!--   分页   -->
                    <div class="pagination-box" v-if="total > 0">
                        <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                            @pagination="getList" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { DayOrder, MonthOrder, YearOrder } from '@/api/datareportsIMgr/reportMgrIndex'
export default {
    name: 'reportMgrIndex',
    data() {
        return {
            searchFrom: {},
            tableData: [],
            total: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            baseHeight: '520',
            activeName: 'day',
            reportList: [
                {
                    id: 1,
                    label: '日报表',
                    name: 'day'
                },
                {
                    id: 2,
                    label: '月报表',
                    name: 'month'
                },
                {
                    id: 3,
                    label: '年报表',
                    name: 'year'
                }
            ]
        }
    },
    created() {
        var date = new Date();
        date.setDate(1);
        var dateStart = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.searchFrom.day = [dateStart, this.parseTime(new Date(), '{y}-{m}-{d}')];
        this.searchFrom.month = this.parseTime(new Date(), '{y}-{m}');
        if (this.activeName == 'day') {
            this.getDayOrder()
        } else if (this.activeName == 'month') {
            this.getMonthOrder()
        } else if (this.activeName == 'year') {
            this.getYearOrder()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.baseHeight = document.body.clientHeight - this.$refs.element.offsetHeight - 297
        })
    },
    methods: {
        searchQuery() {
            console.log(this.searchFrom);
            if (this.activeName == 'day') {
                this.getDayOrder()
            } else if (this.activeName == 'month') {
                this.getMonthOrder()
            } else if (this.activeName == 'year') {
                this.getYearOrder()
            }
        },
        resetQuery() {
            this.searchFrom = {};
            this.getList()
        },
        getList() { },
        // 获取日报表
        getDayOrder() {
            let params = {
                starDate: this.searchFrom.day[0],
                endDate: this.searchFrom.day[1]
            }
            DayOrder(params).then(res => {
                if (res.code == 200) {
                    console.log(res);
                }
            })
        },
        // 获取月报表
        getMonthOrder() {
            MonthOrder().then(res => {
                if (res.code == 200) {
                    console.log(res);
                }
            })
        },
        // 获取年报表
        getYearOrder() {
            YearOrder().then(res => {
                if (res.code == 200) {
                    console.log(res);
                }
            })
        },
        handleClick(event) {
            console.log(event.name);
            if (event.name == 'day') {
                this.getDayOrder()
            } else if (event.name == 'month') {
                this.getMonthOrder()
            } else if (event.name == 'year') {
                this.getYearOrder()
            }
        }
    }
};
</script>
<style scoped lang='scss'>
.content-table {
    margin-top: 0;
}
</style>