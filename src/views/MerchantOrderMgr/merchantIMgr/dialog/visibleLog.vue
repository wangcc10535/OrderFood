<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-23 18:19:48
 * @LastEditors: wcc 9316202+wccvidor@user.noreply.gitee.com
 * @LastEditTime: 2023-03-05 00:35:03
 * @FilePath: \orderfood\src\views\MerchantOrderMgr\merchantIMgr\dialog\visibleLog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" append-to-body :close-on-click-modal="false"
            v-if="dialogVisible" width="90%" :before-close="handleClose">
            <div class="log-Box">
                <div class="left-box">
                    <h4>所点订单</h4>
                    <div class="order-list">
                        <div class="item-order">
                            <span class="order-title">菜品名称</span>
                            <span>金额</span>
                            <span>数量</span>
                            <span>操作</span>
                        </div>
                        <div v-if="settlementList.length > 0">
                            <div class="item-order" v-for="(item, index) in settlementList" :key="index">
                                <span class="order-title">{{ item.name }}</span>
                                <span>{{ item.price | numFilter }}</span>
                                <span>✖</span>
                                <el-input style="width:80px" @input="itemNum(item)" v-model="item.num"></el-input>
                                <el-link type="danger" :underline="false" @click="delOrder(item, index)">删除</el-link>
                            </div>
                        </div>
                        <el-empty v-else description="点击右侧菜品添加订单~" />
                    </div>
                    <div class="total-box">
                        <span>合计</span>
                        <span>{{ ContNum || 0 }}份</span>
                        <span>￥&nbsp;{{ moneyNum | numFilter }}</span>
                    </div>
                </div>
                <div class="center-box">
                    <h4>菜单类别</h4>
                    <div class="class-list">
                        <div class="class-item" v-for="(item, index) in dishesClassify" @click="classMenu(item, index)"
                            :class="activeNum === index ? 'active' : ''" :key="index">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="right-box">
                    <div class="title-menu-box">
                        <h4>菜品</h4>
                        <el-input style="width: 240px;margin-left: 20px;" v-model="menuData.foodNo" @input="searchMenu"
                            placeholder="输入菜品编号查询"></el-input>
                    </div>

                    <div class="menu-list">
                        <div v-if="menuList.length > 0" v-loading="loading" element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)">
                            <div class="menu-item" v-for="(item, index) in menuList" :key="index" @click="menuClick(item)">
                                <span v-if="item.foodNo" style="font-size:14px">编号：{{ item.foodNo }}</span>
                                <span>{{ item.name }}</span>
                            </div>
                        </div>

                        <el-empty v-else description="当前分类没有菜品哟！~" />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="subMitAdd">下 单</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getFoodClass, listFood } from '@/api/dishesMgr/dishesIMgr'
import { addOrder } from '@/api/MerchantOrderMgr/merchantIMgr/index.js'
export default {

    name: 'visibleLog',
    props: { titleTop: '' },
    data() {
        return {
            dialogVisible: false,
            loading: false,
            radio1: '',
            saveForm: {},
            activeNum: '',
            // 菜品分类
            dishesClassify: [],
            menuList: [],
            classData: {},
            // 结算数组
            settlementList: [],
            ContNum: 0,
            moneyNum: 0,
            paramsData: [],
            menuData: {}

        }
    },
    created() {
    },
    mounted() {
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后三位
            let tempVal = parseFloat(value).toFixed(3)
            let realVal = tempVal.substring(0, tempVal.length - 1)
            return realVal
        }
    },

    methods: {
        openVisible(data) {
            this.dialogVisible = true;
            this.classData = {};
            this.settlementList = [];
            if (data) {
                this.saveForm = data
            }
            this.getFoodClass();
            this.getListFood();
        },
        handleClose() {
            this.dialogVisible = false;
            if (this.saveForm.price) {
                this.$emit('getDetail', '更新')
            } else {
                this.$parent.getFoodTable()
            }

        },

        // 获取菜品类别
        async getFoodClass() {
            let params = {
                pageNum: 1,
                pageSize: 999,
            }
            let { code, rows } = await getFoodClass(params);
            if (code == 200) {
                this.dishesClassify = rows;
                this.dishesClassify.unshift({ id: 99, name: '全部' })
            }
        },
        // 获取菜品
        async getListFood() {
            let params = {
                pageNum: 1,
                pageSize: 999
            }
            this.loading = true;
            let { code, rows } = await listFood({ ...this.classData, ...params, ...this.menuData });
            if (code == 200) {
                rows.forEach(item => {
                    item.num = 1;
                })
                this.menuList = rows;
                this.loading = false;
            }
        },
        classMenu(item, index) {
            this.activeNum = index;
            if (item.id == 99) {
                this.classData = {
                }
            } else {
                this.classData = {
                    foodTypeId: item.id
                }
            }
            this.getListFood();
        },
        searchMenu() {
            this.getListFood()
        },
        // 删除单个
        delOrder(item, index) {
            this.settlementList.forEach(element => {
                if (element.id == item.id) {
                    this.settlementList.splice(index, 1)
                    this.ContNum = this.sum(this.settlementList);
                    this.moneyNum = this.money(this.settlementList)
                    this.getListFood();
                }
            })
        },
        // 点击拼接结算
        menuClick(item) {
            this.settlementList.push(item)
            // this.settlementList = Array.from(new Set(this.settlementList))
            this.settlementList = this.unique(this.settlementList)
            this.ContNum = this.sum(this.settlementList);
            this.moneyNum = this.money(this.settlementList)
        },
        itemNum(data) {
            this.ContNum = this.sum(this.settlementList);
            this.moneyNum = this.money(this.settlementList)
        },
        subMitAdd() {
            // console.log(this.settlementList);
            if (this.settlementList.length == 0) {
                this.$message.error('请选择菜品下单！');
                return false
            }
            this.paramsData = this.settlementList.map(item => {
                let data = {}
                data.foodId = item.id;
                data.num = item.num
                return data
            })
            let params = {
                tableId: this.saveForm.id,
                tableName: this.saveForm.name,
                price: this.moneyNum,
                amount: this.moneyNum,
                discountAmount: 0,
                food: this.paramsData
            }
            // console.log(params);
            addOrder(params).then(res => {
                if (res.code == 200) {
                    this.$message.success('下单成功！');
                    this.handleClose()
                }
            })
        },
        // 数相加
        sum(arr) {
            let total = 0
            for (const i of arr) {
                total += Number(i.num)
            }
            return total
        },
        // 钱相加
        money(arr) {
            var s = 0;
            arr.forEach(function (val, idx, arr) {
                s += Number(val.num) * Number(val.price);
            }, 0);
            return s;
        },
        unique(arr) {
            var result = [];
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i].id]) {
                    result.push(arr[i]);
                    obj[arr[i].id] = true;
                } else {
                    ++arr[i].num
                }
            }
            return result
            // console.log(result);
        },

    }
};
</script>
<style scoped lang='scss'>
.log-Box {
    height: 560px;
    display: flex;
    justify-content: space-between;

    h4 {
        font-size: 18px;
        color: #000;
        font-weight: 600;
        margin: 10px 0;
    }

    .left-box {
        width: 30%;
        position: relative;

        .order-list {
            height: 455px;
            border-bottom: 1px solid #ccc;
            overflow: auto;

            .item-order {
                display: flex;
                height: 50px;
                font-size: 16px;
                color: #000;
                line-height: 50px;
                align-items: center;
                justify-content: space-between;

                .order-title {
                    min-width: 25%;
                }
            }
        }

        .order-list::-webkit-scrollbar {
            height: 20px;
            width: 4px;
        }

        .order-list::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
            background: #535353;
        }

        .total-box {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: #1890ff;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            font-size: 18px;
        }
    }

    .center-box {
        width: 15%;
        padding: 0 20px;
        margin: 0 10px;
        border-left: 1px solid;
        border-right: 1px solid;
        border-color: #f0f0f0;

        .class-list {
            display: flex;
            flex-direction: column;
            overflow: auto;
            height: 502px;

            .class-item {
                cursor: pointer;
                line-height: 50px;
                margin: 2px 0;
                border-top: 1px solid #ccc;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                position: relative;
                font-size: 18px;
                color: #000;
                text-align: center;
            }

            .class-item:nth-child(n)::before {
                position: absolute;
                content: '';
                left: 0;
                background: #f65f54;
                height: 100%;
                width: 6px;
            }

            .class-item:nth-child(5n+4)::before {
                position: absolute;
                content: '';
                left: 0;
                background: #f49c0f;
                height: 100%;
                width: 6px;
            }

            .class-item:nth-child(2n+1)::before {
                position: absolute;
                content: '';
                left: 0;
                background: #3fb671;
                height: 100%;
                width: 6px;
            }

            .class-item:nth-child(3n+2)::before {
                position: absolute;
                content: '';
                left: 0;
                background: #a945bb;
                height: 100%;
                width: 6px;
            }

            .class-item:nth-child(4n+3)::before {
                position: absolute;
                content: '';
                left: 0;
                background: #3d50b5;
                height: 100%;
                width: 6px;
            }
        }

        .class-list::-webkit-scrollbar {
            height: 20px;
            width: 4px;
        }

        .class-list::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
            background: #535353;
        }

    }

    .right-box {
        width: 55%;

        .title-menu-box {
            display: flex;
            align-items: center;
        }

        .menu-list {
            overflow: auto;
            height: 502px;

            .menu-item {
                cursor: pointer;
                height: 120px;
                margin: 5px 6px;
                border-top: 1px solid #ccc;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                position: relative;
                font-size: 18px;
                color: #000;
                text-align: center;
                width: 160px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                float: left;
                padding: 0 20px;
                /* 火狐 */
                -moz-user-select: none;
                /* Safari 和 欧朋 */
                -webkit-user-select: none;
                /* IE10+ and Edge */
                -ms-user-select: none;
                /* Standard syntax 标准语法(谷歌) */
                user-select: none;
            }

            .menu-item:nth-child(n)::before {
                position: absolute;
                content: '';
                left: 0;
                background: #f65f54;
                height: 100%;
                width: 6px;
            }
        }

        .menu-list::-webkit-scrollbar {
            height: 20px;
            width: 4px;
        }

        .menu-list::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
            background: #535353;
        }
    }

    .active {
        background-color: #697eee;
        color: #fff !important;
    }
    .el-loading-parent--relative{
        height: 100%;
    }
}
</style>