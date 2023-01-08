<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 22:47:28
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-08 13:41:03
 * @FilePath: \orderfood\src\views\datareportsIMgr\commodityMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="topSearch base-background top-box" ref="element">
            <div class="topSearch-base magin-base">
                <span>状态：</span>
                <el-input class="topSearch-width" v-model="searchFrom.townName" placeholder="请输入"></el-input>
            </div>
            <div class="topSearch-base magin-base">
                <span>时间：</span>
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
                    <el-table-column prop="dswr" label="菜品名称" fixed="left" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="菜品图片" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="销售量" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="菜品创建时间" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="菜品状态" align="center"></el-table-column>
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
    name:'commodityMgrIndex',
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
            console.log(this.searchFrom);
        },
        resetQuery() {
            this.searchFrom = {};
            this.getList()
        },
        getList() { },
    }
};
</script>
<style scoped lang='scss'>
</style>