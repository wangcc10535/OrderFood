<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 22:20:04
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-07 00:02:15
 * @FilePath: \orderfood\src\views\dishesIMgr\dishesMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="topSearch base-background top-box" ref="element">
            <div class="topSearch-base magin-base">
                <span>菜品名称：</span>
                <el-input class="topSearch-width" v-model="searchFrom.townName" placeholder="请输入"></el-input>
            </div>
            <div class="topSearch-base magin-base">
                <span>菜品分类：</span>
                <el-select class="topSearch-width" v-model="searchFrom.eventType" placeholder="请选择">
                    <el-option v-for="item in dishesClassify" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <el-button class="magin-base" type="primary" size="mini" @click="searchQuery">搜索</el-button>
            <el-button class="magin-base" type="warning" size="mini" @click="resetQuery">重置</el-button>
        </div>
        <div class="content base-background">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addDishes">发布菜品</el-button>
            <div class="content-table">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane v-for="(item, index) in dishesType" :key="index" :label="item.label"
                        :name="item.status"></el-tab-pane>
                </el-tabs>
                <el-table :data="tableData" border :height="baseHeight" style="width: 100%">
                    <el-table-column type="index" label="序号" fixed="left" align="center" width="50"></el-table-column>
                    <el-table-column prop="cropName" label="菜品名称" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="封面图" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="菜品分类" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="状态" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="总销量" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="创建时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" size="small" class="link-m"
                                type="primary">上架</el-button>
                            <el-button @click="edit(scope.row)" size="small" class="link-m"
                                type="warning">编辑</el-button>
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
    name: 'dishesMgrIndex',
    dicts: [],
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
            dishesClassify: [],
            activeName: '0',
            dishesType: [
                {
                    id: 1,
                    label: '全部',
                    status: '0'
                },
                {
                    id: 2,
                    label: '销售中',
                    status: '1'
                },
                {
                    id: 3,
                    label: '下架中',
                    status: '2'
                }
            ]

        }
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {
            this.baseHeight = document.body.clientHeight - this.$refs.element.offsetHeight - 353
        })
    },
    methods: {
        searchQuery() { },
        resetQuery() { },
        addDishes() { },
        getList() { },
        handleClick(tab, event) {
            console.log(tab, event)
        }
    }
};
</script>
<style scoped lang='scss'>
</style>