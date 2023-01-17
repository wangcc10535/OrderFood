<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 22:20:04
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-17 04:25:45
 * @FilePath: \orderfood\src\views\dishesIMgr\dishesMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="topSearch base-background top-box" ref="element">
            <div class="topSearch-base magin-base">
                <span>菜品名称：</span>
                <el-input class="topSearch-width" v-model="searchFrom.name" placeholder="请输入"></el-input>
            </div>
            <div class="topSearch-base magin-base">
                <span>菜品分类：</span>
                <el-select class="topSearch-width" v-model="searchFrom.foodTypeId" placeholder="请选择">
                    <el-option v-for="item in dishesClassify" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
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
                    <el-table-column prop="name" label="菜品名称" align="center"></el-table-column>
                    <el-table-column prop="cropName" label="封面图" align="center">
                        <template slot-scope="{row}">
                            <div class="row-img-box" v-viewer>
                                <img :src="row.imgFile" alt="">
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column label="菜品分类" align="center">
                        <template slot-scope="{row}">
                            <span>{{dishesClassify[row.enable].name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="enable" label="状态" align="center">
                        <template slot-scope="{row}">
                            <span>{{ selectDictLabel(dict.type.enable_status, row.enable) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template slot-scope="scope">
                            <!-- <el-button @click="Shelves(scope.row)" size="small" class="link-m"
                                type="primary" v-if="scope.row.enable != 1">上架</el-button>
                            <el-button @click="Takedown(scope.row)" size="small" class="link-m"
                                type="primary" v-if="scope.row.enable != 0">下架</el-button> -->
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
        <add-log ref="dishesIMgr" :titleTop="titleTop"></add-log>
    </div>
</template>
<script>
import { listFood, delFood, getFoodClass } from '@/api/dishesMgr/dishesIMgr'
import addLog from './dialog/addLog.vue'
export default {
    name: 'dishesMgrIndex',
    dicts: ['enable_status','order_status'],
    components: {
        addLog
    },
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
            activeName: '99',
            dishesType: [
                {
                    id: '0',
                    label: '全部',
                    status: '99'
                },
                {
                    id: '1',
                    label: '销售中',
                    status: '1'
                },
                {
                    id: '2',
                    label: '下架中',
                    status: '0'
                }
            ],
            titleTop: ''

        }
    },
    created() {
        this.getList();
        this.getFoodClass();
    },
    mounted() {
        this.$nextTick(() => {
            this.baseHeight = document.body.clientHeight - this.$refs.element.offsetHeight - 353
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
        // 新增
        addDishes() {
            this.titleTop = '新增菜品'
            this.$refs.dishesIMgr.openVisible()
        },
        // 上架  下架
        Shelves(row) { },
        Takedown(row) { },
        // 修改
        edit(row) {
            this.titleTop = '修改菜品'
            this.$refs.dishesIMgr.openVisible(row)
        },
        // 删除
        compDelete(row) {
            delFood(row.id).then(res => {
                if (res.code == 200) {
                    this.$message.success('删除成功！');
                    this.getList();
                }
            })
        },
        // 列表查询
        async getList() {
            if (this.searchFrom.enable == '99') {
                delete this.searchFrom.enable
            }
            let { code, rows,total } = await listFood({ ...this.searchFrom, ...this.queryParams });
            if (code == 200) {
                this.tableData = rows;
                this.total = total;
            }
        },
        // 查询分类列表
        async getFoodClass() {
            let { code, rows } = await getFoodClass();
            if (code == 200) {
                this.dishesClassify = rows
            }
        },
        handleClick(tab, event) {
            this.searchFrom.enable = tab.name;
            this.getList()
        }
    }
};
</script>
<style scoped lang='scss'>
.row-img-box {
    width: 80px;
    height: 60px;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>