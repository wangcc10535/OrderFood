<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 20:57:10
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-16 11:13:04
 * @FilePath: \orderfood\src\views\businessIMgr\businessMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="topSearch base-background top-box" ref="element">
            <div class="topSearch-base magin-base">
                <span>店铺名：</span>
                <el-input class="topSearch-width" v-model="searchFrom.name" placeholder="请输入"></el-input>
            </div>
            <el-button class="magin-base" type="primary" size="mini" @click="searchQuery">搜索</el-button>
            <el-button class="magin-base" type="warning" size="mini" @click="resetQuery">重置</el-button>
        </div>
        <div class="content base-background">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addBusiness">新增分店</el-button>
            <div class="content-table">
                <el-table :data="tableData" border :height="baseHeight" style="width: 100%">
                    <el-table-column type="index" label="序号" fixed="left" align="center" width="50"></el-table-column>
                    <el-table-column prop="name" label="店铺名称" align="center"></el-table-column>
                    <el-table-column prop="adress" label="地址" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
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
        <add-log ref="addLog" :titleTop="logTitle"></add-log>
    </div>
</template>
<script>
import { listShop, deleteShop } from '@/api/businessMgr/businessIMgr'
import addLog from './dialog/addLog.vue'
export default {
    name: 'businessMgrIndex',
    components: {
        addLog
    },
    data() {
        return {
            searchFrom: {},
            tableData: [],
            logTitle: '',
            total: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            baseHeight: '520'
        }
    },
    created() {
        this.getList();
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
            this.searchFrom = {}
            this.getList()
        },
        addBusiness() {
            this.logTitle = "新增店铺"
            this.$refs.addLog.openVisible()
        },
        edit(row) {
            this.logTitle = "修改店铺"
            this.$refs.addLog.openVisible(row)
        },
        compDelete(row) {
            deleteShop(row.id).then(res => {
                if (res.code == 200) {
                    this.$message.success('删除成功');
                    this.getList()
                }
            })
        },
        async getList() {
            let { code, rows,total } = await listShop({ ...this.searchFrom, ...this.queryParams })
            if (code == 200) {
                this.tableData = rows;
                this.total = total
            }
        }
    }
};
</script>
<style scoped lang='scss'>

</style>