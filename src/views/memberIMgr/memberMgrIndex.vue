<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 22:36:26
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-10 14:53:42
 * @FilePath: \orderfood\src\views\memberIMgr\memberMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="topSearch base-background top-box" ref="element">
            <div class="topSearch-base magin-base">
                <span>用户名称：</span>
                <el-input class="topSearch-width" v-model="searchFrom.townName" placeholder="请输入"></el-input>
            </div>
            <div class="topSearch-base magin-base">
                <span>用户手机号：</span>
                <el-input class="topSearch-width" v-model="searchFrom.townName" placeholder="请输入"></el-input>
            </div>
            <div class="topSearch-base magin-base">
                <span>注册时间：</span>
                <el-date-picker v-model="searchFrom.value1" value-format="yyyy-MM-dd" type="daterange"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button class="magin-base" type="primary" size="mini" @click="searchQuery">搜索</el-button>
            <el-button class="magin-base" type="warning" size="mini" @click="resetQuery">重置</el-button>
        </div>
        <div class="content base-background">
            <div class="content-table">
                <el-table :data="tableData" border :height="baseHeight" style="width: 100%">
                    <el-table-column prop="dswr" label="会员ID" fixed="left" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="会员头像" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="会员名称" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="会员手机号" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="会员订单情况" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="disableRow(scope.row)" size="small" class="link-m"
                                type="primary">禁用</el-button>
                            <el-popconfirm confirm-button-text="是的" cancel-button-text="不用了"
                                @confirm="compDelete(scope.row)" title="确定删除吗？">
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
    </div>
</template>
<script>
export default {
    name: 'memberMgrIndex',
    data() {
        return {
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
    },
    mounted() {
        this.$nextTick(() => {
            this.baseHeight = document.body.clientHeight - this.$refs.element.offsetHeight - 297
        })
    },
    methods: {
        searchQuery() {
        },
        resetQuery() {
            this.searchFrom = {};
            this.getList()
        },
        getList() { },
        disableRow(row) {},
        compDelete(row) {}
    }
};
</script>
<style scoped lang='scss'>

</style>