<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-15 17:23:29
 * @LastEditors: wcc 9316202+wccvidor@user.noreply.gitee.com
 * @LastEditTime: 2023-03-09 00:33:00
 * @FilePath: \orderfood\src\views\ordersIMgr\dialog\addOredit.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
    <el-dialog :title="titleTop" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%"
            :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <!-- <el-form-item label="选择店铺" prop="shopId">
                                                <el-select v-model="saveForm.shopId" style="width:100%" placeholder="请选择店铺" @change="handleChange">
                                                    <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item> -->
                <el-form-item label="选择桌位" prop="tableId">
                    <el-select v-model="saveForm.tableId" style="width:100%" placeholder="请选择桌位">
                        <el-option v-for="item in desktopList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用餐人数" prop="number">
                    <el-input v-model="saveForm.number" placeholder="输入就餐人数"></el-input>
                </el-form-item>
                <el-form-item label="选择日期" prop="billTime">
                    <el-date-picker v-model="saveForm.billTime" style="width:100%" value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="菜单选择">
                    <el-button type="text" circle @click="addMenuList">添加</el-button>
                    <el-table ref="multipleTableMenu" :data="arrayMenuList" style="width: 100%">
                        <el-table-column prop="name" label="菜品名称">
                        </el-table-column>
                        <el-table-column prop="num" label="菜品数量">
                        </el-table-column>
                        <el-table-column prop="aumtPrice" label="小计价格">
                            <template slot-scope="{row}">
                                <span>{{ row.aumtPrice | numFilter }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="{ row,$index }">
                                <el-link type="danger" @click="delMenuList(row, $index, arrayMenuList)">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="订单金额">
                    <el-input disabled v-model="saveForm.price"></el-input>
                </el-form-item>
                <!-- <el-form-item label="优惠金额" prop="discountAmount">
                                                            <el-radio-group v-model="saveForm.discountAmount" size="small">
                                                                <el-radio :label="item.value" border v-for="(item, index) in dict.type.preferential_type"
                                                                    :key="index">{{ item.label }}</el-radio>
                                                            </el-radio-group>
                                                        </el-form-item> -->
                <el-form-item label="是否结算" prop="status">
                    <el-radio-group v-model="saveForm.status" size="small">
                        <el-radio :label="item.value" border v-for="(item, index) in dict.type.order_status" :key="index">{{
                            item.label
                        }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="支付方式" prop="pay">
                    <el-radio-group v-model="saveForm.pay" size="small">
                        <el-radio :label="item.value" border v-for="(item, index) in dict.type.pay_type" :key="index">{{
                            item.label
                        }}</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="subMitAdd">确 定</el-button>
            </span>
        <el-dialog :close-on-click-modal="false" width="40%" v-dialog-drag title="选择菜单" :modal="false"
            modal-append-to-body :visible.sync="choiceType">
                <el-table ref="multipleTable" v-loading="loading" element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading" :data="menuList" style="width: 100%" height="500"
                    @selection-change="selectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column v-for="(item, index) in tableColumn" :key="index" :prop="item.key" :label="item.label">
                        <!-- <template v-if="item.id == 1" slot="header">
                                <el-input v-model="search" size="mini" placeholder="输入菜品名搜索" />
                            </template> -->
                        <template slot-scope="{ row }">
                            <div v-if="item.type === 'input'">
                            <el-input v-model="row.num" type="number" placeholder="请输入"></el-input>
                        </div>
                        <div v-else>{{ row[item.key] }}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <!--   分页   -->
                <!-- <div class="pagination-box" v-if="total > 0">
                                <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                                    @pagination="getMenuList" />
                            </div> -->
                <div slot="footer" class="dialog-footer">
                    <el-button @click="choiceType = false">关 闭</el-button>
                    <el-button @click="goodsSub" type="primary">确 定</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
import { listShop } from '@/api/businessMgr/businessIMgr'
// import { listTable } from '@/api/desktopMgr/desktopMgr'
import { foodTableList } from '@/api/MerchantOrderMgr/merchantIMgr/index.js'
import { listFood } from '@/api/dishesMgr/dishesIMgr'
import { addOrder } from '@/api/ordersIMgr/ordersMgr'

export default {

    name: 'addOredit',
    props: { titleTop: '' },
    dicts: ['pay_type', 'preferential_type', 'order_status'],
    data() {
        return {
            dialogVisible: false,
            choiceType: false,
            loading: false,
            saveForm: {},
            rules: {
                shopId: [{ required: true, message: '请选择店铺', trigger: 'change' }],
                tableId: [{ required: true, message: '请选择桌面', trigger: 'change' }],
                number: [{ required: true, message: '请填写就餐人数', trigger: 'blur' }],
                billTime: [{ type: 'string', required: true, message: '请日期时间', trigger: 'change' }],
                pay: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
                price: [{ required: true, message: '请选择菜单计算金额', trigger: 'blur' }]
            },
            dishesClassify: [],
            shopList: [],
            desktopList: [],
            menuList: [],
            arrayMenuList: [],
            shopId: '',
            tableColumn: [
                { id: 1, name: '', label: '菜品名称', key: 'name' },
                { id: 2, name: '', label: '菜品价格', key: 'price' },
                {
                    id: 3,
                    name: '',
                    label: '购买数量',
                    key: 'num',
                    type: 'input'
                },
            ],
            search: '',
            choiceTypeData: [],
            moneyCont: [],
            total: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 999
            },
        }
    },
    created() {
        this.getList()
    },
    mounted() {
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2)
            return realVal
        }
    },
    methods: {
        openVisible(data) {
            this.dialogVisible = true;
            this.getListTable()
            this.getMenuList();
            this.saveForm = {
                status: '2',
                food: []
            };
            if (data) {
                this.saveForm = data
            }
        },
        handleClose() {
            this.dialogVisible = false;
            this.$parent.getList()
        },
        async getList() {
            let { code, rows, total } = await listShop({ ...this.searchFrom, ...this.queryParams })
            if (code == 200) {
                this.shopList = rows;
            }
        },
        // 选择店铺
        handleChange(e) {
            this.getListTable(e)
            this.getMenuList(e)
            this.shopId = e.shopId
        },
        async getListTable(shopId) {
            let { code, rows } = await foodTableList();
            if (code == 200) {
                this.desktopList = []
                rows.forEach(element => {
                    element.foodTableVos.forEach(its => {
                        let data = {}
                        data.id = its.id
                        data.name = element.areaName + its.name
                        data.enable = '1'
                        data.deptId = its.deptId
                        this.desktopList.push(data)
                    })
                })
            }
        },
        async getMenuList() {
            this.loading = true;
            let { code, rows, total } = await listFood(this.queryParams)
            if (code == 200) {
                this.loading = false;
                this.total = total
                this.menuList = rows;
            }
        },
        subMitAdd() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    if (this.saveForm.food.length == 0) {
                        this.$message.error('请选择菜单')
                        return false;
                    }
                    // this.saveForm.createTime = this.saveForm.billTime
                    this.saveForm.isBill = '1'
                    this.saveForm.amount = this.saveForm.price
                    this.saveForm.discountAmount = 0
                    // console.log(this.saveForm);
                    addOrder(this.saveForm).then(res => {
                        if (res.code == 200) {
                            this.$message.success('新增成功！')
                            this.handleClose()
                        }
                    })
                    // if (this.saveForm.id) {
                    //     updateFoodClass(this.saveForm).then(res => {
                    //         if (res.code == 200) {
                    //             this.$message.success('修改成功！')
                    //             this.handleClose()
                    //         }
                    //     })
                    // } else {
                    //     addFoodClass(this.saveForm).then(res => {
                    //         if (res.code == 200) {
                    //             this.$message.success('新增成功！')
                    //             this.handleClose()
                    //         }
                    //     })
                    // }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 选择菜单
        selectionChange(e) {
            this.choiceTypeData = e
        },
        // 确定菜单
        goodsSub() {
            this.arrayMenuList = []
            this.saveForm.food = []
            for (let i = 0; i < this.choiceTypeData.length; i++) {
                let arrayData = {};
                if (!this.choiceTypeData[i].num) {
                    this.$message.error('选择的菜品必须输入数量！');
                    return false;
                }
                arrayData.foodId = this.choiceTypeData[i].id;
                arrayData.name = this.choiceTypeData[i].name;
                arrayData.num = this.choiceTypeData[i].num;
                arrayData.aumtPrice = Number(this.choiceTypeData[i].num) * Number(this.choiceTypeData[i].price);
                this.arrayMenuList.push(arrayData)
                this.saveForm.food.push({
                    foodId: this.choiceTypeData[i].id,
                    num: this.choiceTypeData[i].num
                })
            }
            this.saveForm.price = this.sumArr(this.arrayMenuList);
            this.choiceType = false;
        },
        // 增加菜单
        addMenuList() {
            this.search = ''
            this.choiceType = true;
            this.arrayMenuList = []
            if (this.choiceTypeData.length > 0) {
                this.$refs.multipleTable.clearSelection()
            }

        },
        delMenuList(row, index, rows) {
            rows.splice(index, 1);
            this.saveForm.food.forEach(element => {
                if (element.foodId == row.foodId) {
                    this.saveForm.food.splice(element, 1);
                }
            })

            this.arrayMenuList.forEach(element => {
                if (element.foodId == row.foodId) {
                    this.arrayMenuList.splice(element, 1);
                }
            })
            this.saveForm.price = this.sumArr(this.arrayMenuList);
        },
        sumArr(arr) {
            var num = 0
            arr.forEach(item => {
                num += Number(item.aumtPrice.toFixed(2))
            })
            return num;
        },
    }
};
</script>
<style scoped lang='scss'>
.addMenu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>