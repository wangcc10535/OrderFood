<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-06 18:13:50
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-06 16:29:37
 * @FilePath: \orderfood\src\views\BackOfficeMgr\BackOfficeIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                <!-- 总览看板 -->
                <el-card class="box-card mb20">
                    <div slot="header" class="box-header">
                        <div class="header-left">
                            <span>总览看板</span>
                        </div>
                    </div>
                    <div class="chart-content">
                        <el-form :model="boardObj" :inline="true">
                            <el-form-item label="时间范围">
                                <el-date-picker v-model="boardObj.dateRange" type="daterange" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
                                    size="small" :clearable="false" :editable="false" style="width: 100%" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" @click="getOverviewBoardData">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <el-row :gutter="30">
                            <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item, index) in boardObj.list"
                                :key="index">
                                <div class="box-card-body-item">
                                    <p>
                                        <countTo v-if="boardObj.data[item.key]" :startVal="0"
                                            :endVal="Number(boardObj.data[item.key])" :duration="3000"
                                            :decimals="String(boardObj.data[item.key]).indexOf('.') > -1 ? 2 : 0">
                                        </countTo>
                                        <span v-else>0</span>
                                        <span v-if="item.key == 'salesVolume'">元</span>
                                    </p>
                                    <div class="box-card-body-item-proportion">
                                        <div class="bcbip-item">
                                            <span> {{ item.title }}</span>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <!-- 营收趋势 -->
                <el-card class="box-card">
                    <div slot="header" class="box-header">
                        <div class="header-left">
                            <span>营收趋势</span>
                        </div>
                    </div>
                    <div class="chart-content">
                        <el-form :model="revenueObj" :inline="true">
                            <el-form-item label="时间">
                                <el-date-picker v-model="revenueObj.month" type="month" placeholder="选择月" size="small"
                                    value-format="yyyy-MM" :clearable="false" :editable="false" style="width: 100%" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" @click="getRevenueTrendsData">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <line-chart :chart-data="revenueObj.lineChartData" />
                    </div>
                </el-card>
            </el-col>
            <!-- 销量排行 -->
            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                <el-card class="box-card">
                    <div slot="header" class="box-header">
                        <div class="header-left">
                            <span>销量排行</span>
                        </div>
                    </div>
                    <div class="chart-content">
                        <el-table :data="salesRankingObj.list" border height="768px">
                            <el-table-column type="index" label="排名" width="80" align="center"></el-table-column>
                            <el-table-column v-for="(header, hIndex) in salesRankingObj.header" :key="hIndex"
                                :prop="header.prop" :label="header.label" :width="header.width" :align="header.align"
                                :fixed="header.fixed" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <template v-if="header.type === 'index'">{{ scope.$index + 1 }}</template>
                                    <template v-else>{{ scope.row[header.prop] || '-' }}</template>
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination v-if="salesRankingObj.total > 0" :autoScroll="false" :pageSizes="[20, 40, 100]"
                            :total="salesRankingObj.total" :page.sync="salesRankingObj.queryParams.pageNum"
                            :limit.sync="salesRankingObj.queryParams.pageSize" @pagination="getRankingList" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import LineChart from './LineChart';
import countTo from 'vue-count-to';
import { SalesRanking, SalesVolume, getTotal } from '@/api/BackOfficeMgr/BackOfficeIndex'
export default {
    name: 'BackOfficeIndex',
    components: { LineChart, countTo },
    data() {
        return {

            form: {
                regionId: undefined
            },
            regionList: [],
            // 总览看板
            boardObj: {
                dateRange: [],
                data: {},
                list: [
                    {
                        title: '销售额',
                        key: 'salesVolume'
                    },
                    {
                        title: '订单量',
                        key: 'orderQuantity'
                    }
                ]
            },
            // 营收数据
            revenueObj: {
                month: '',
                lineChartData: {
                    title: '',
                    xAxisData: [],
                    data: [],
                    dataZoom: [
                        {
                            type: 'inside'
                        },
                        {
                            type: 'slider'
                        }
                    ]
                }
            },
            salesRankingObj: {
                total: 0,
                queryParams: {
                    pageNum: 1,
                    pageSize: 20
                },
                header: [
                    { prop: 'foodName', label: '菜品名称', align: 'center' },
                    { prop: 'num', label: '销售量', align: 'center' },
                    { prop: 'price', label: '销售额', align: 'center' }
                ],
                list: []
            },
            deptId:''
        }
    },
    created() {
        this.boardObj.dateRange = [this.parseTime(new Date(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')];
        this.revenueObj.month = this.parseTime(new Date(), '{y}-{m}');
        this.deptId = this.$store.state.user.userInfo.deptId
        this.getSalesRanking()
        this.getSalesVolume()
        this.getTotal()

    },
    mounted() {
    },
    methods: {
        // 查询总览看板
        getOverviewBoardData() {
            this.getTotal()
        },
        // 营收趋势
        getRevenueTrendsData() {
            this.getSalesVolume()
        },
        // 查看菜品排行
        getSalesRanking() {
            console.log(this.boardObj);
            SalesRanking().then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.salesRankingObj.list = res.rows;
                }
            })
        },
        // 营收趋势查询
        getSalesVolume() {
            let params = {
                starDate:this.revenueObj.month
            }
            SalesVolume(params).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    // xAxisData  billTime
                    this.revenueObj.lineChartData.data = res.rows.map(item =>{
                        return item.price
                    });
                    this.revenueObj.lineChartData.xAxisData = res.rows.map(item =>{
                        return item.billTime
                    });
                }
            })
        },
        getTotal() {
            console.log(this.boardObj.dateRange);
            let parms = {
                starDate:this.boardObj.dateRange[0],
                endDate:this.boardObj.dateRange[1]
            }
            getTotal(parms).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.boardObj.data = res.data;
                }
            })
        }
    }
};
</script>
<style scoped lang='scss'>
.app-container {
    padding: 15px;

    .commonfilterselecttreemainpage {
        .cfstreepage-container {
            &-left {
                margin: 0 !important;
                overflow: hidden;
            }

            &-right {
                padding: 0 0 0 10px !important;
            }

            &-rightdefault {
                padding: 0 !important;
            }

            &-switch {
                &-leftbtn {
                    left: 258px !important;
                }

                &-rightbtn {
                    left: 5px !important;
                }
            }
        }
    }

    &-headtree {
        padding: 5px;
        background: #ffffff;
        border-radius: 10px;
    }

    &-queryform {
        padding: 10px;
        background: #ffffff;
        border-radius: 10px;

        .el-form {
            .el-form-item {
                margin-bottom: 16px;

                .el-form-item__content {
                    .el-form-item__error {
                        padding-top: 1px;
                    }
                }
            }
        }
    }

    &-main {
        padding: 10px 15px 15px;
        background: #ffffff;
        border-radius: 10px;
        // min-height: calc(100vh - 198px);

        .cust-spanlink {
            color: #337ab7;
            text-decoration: none;
            cursor: pointer;

            &:hover {
                color: #409eff;
                text-decoration: underline;
            }
        }

        .cust-operategroup {
            .cust-editbtn {
                color: #13ce66;
            }

            .cust-viewbtn {
                color: #909399;
            }

            .cust-deletebtn {
                color: #ff4949;
            }

            .cust-warningbtn,
            .cust-resetpassword {
                color: #ffba00;
            }

            .cust-primarybtn {
                color: #1890ff;
            }

            .cust-defaultbtn {
                color: #606266;
            }
        }
    }

    /* 穿梭框样式 */
    .goods-transfer {
        text-align: left;
        display: inline-block;

        .el-transfer-panel {
            width: 400px;
        }

        .el-transfer-panel__list.is-filterable {
            height: 354px;
        }

        .el-transfer-panel__body {
            height: 400px;
        }
    }
}

.box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-right {
        display: flex;

        &-date {
            width: 300px;
            margin-left: 30px;
        }
    }
}

.box-card-body-item {
    padding: 30px 0;
    text-align: center;
    background-color: #fff;
    border: solid 1px #e6ebf5;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 10px 0;

    p {
        color: #1890ff;
        font-size: 24px;
        margin: 10px 0;
        padding: 0;
        font-weight: 700;
    }
}
</style>