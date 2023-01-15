<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 22:27:19
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-15 13:27:52
 * @FilePath: \orderfood\src\views\dishesIMgr\menuClassify.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="content base-background">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addMenu">新增分类</el-button>
            <div class="content-table">
                <el-table :data="tableData" border :height="baseHeight" style="width: 100%">
                    <el-table-column type="index" label="序号" fixed="left" align="center" width="50"></el-table-column>
                    <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" size="small" class="link-m"
                                type="warning">修改</el-button>
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
        <add-class ref="addClass" :titleTop="titleTop"></add-class>
    </div>
</template>
<script>
import addClass from './dialog/addClass.vue';
import { getFoodClass, delFoodClass } from '@/api/dishesMgr/dishesIMgr'
export default {
    name: 'menuClassify',
    components: { addClass },
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
            titleTop: ''
        }
    },
    created() {
        this.getList()
    },
    mounted() {
        this.$nextTick(() => {
            this.baseHeight = document.body.clientHeight - 280
        })
    },
    methods: {
        searchQuery() {
            this.getList()
        },
        resetQuery() {
            this.searchFrom = {}
            this.getList()
        },
        addMenu() {
            this.titleTop = '新增分类'
            this.$refs.addClass.openVisible()
        },
        getList() {
            getFoodClass({ ...this.searchFrom, ...this.queryParams }).then(res => {
                if (res.code == 200) {
                    this.tableData = res.rows;
                    this.total = res.total;
                }
            })
        },
        edit(row) {
            this.titleTop = '修改分类'
            this.$refs.addClass.openVisible(row)
        },
        compDelete(row) {
            delFoodClass(row.id).then(res => {
                if (res.code == 200) {
                    this.$message.success('删除成功！')
                    this.getList()
                }
            })
        }
    }
};
</script>
<style scoped lang='scss'>
.content {
    margin-top: 0;
}
</style>