<!--
 * @Author: wangcc 1053578651@qq.com 粉面点餐
 * @Date: 2023-01-23 15:35:14
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-30 23:32:46
 * @FilePath: \orderfood\src\views\MerchantOrderMgr\FlourOrderIMgr\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="merchan-box">
        <div class="log-Box">
            <div class="left-box">
                <h4>所点订单</h4>
                <div class="order-list" id="orderItemOr">
                    <div v-if="settlementList.length > 0">
                        <div class="item-order" v-for="(item, index) in settlementList" :key="index">
                            <span class="order-title">{{ item.name }}</span>
                            <span>{{ item.price | numFilter }}</span>
                            <span>✖</span>
                            <el-input type="number" style="width:80px" @input="itemNum(item)"
                                v-model="item.num"></el-input>
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
                <h4>菜品</h4>
                <div class="menu-list">
                    <div v-if="menuList.length > 0">
                        <div class="menu-item" v-for="(item, index) in menuList" :key="index" @click="menuClick(item)">
                            {{ item.name }}
                        </div>
                    </div>

                    <el-empty v-else description="当前分类没有菜品哟！~" />
                </div>
            </div>
        </div>
        <div slot="footer" class="flour-footer">
            <el-button @click="openVisible">取 消</el-button>
            <el-button type="primary" @click="subMitAdd">结 算</el-button>
        </div>
        <div class="home">
            <router-link to="/">
                <el-button type="primary" icon="el-icon-s-home" circle></el-button>
            </router-link>

        </div>
    </div>
</template>
<script>
import { getFoodClass, listFood } from '@/api/dishesMgr/dishesIMgr'
import { addOrder } from '@/api/MerchantOrderMgr/merchantIMgr/index.js'
import { getLodop } from '@/utils/LodopFuncs' //导入模块
export default {
    name: 'index',
    data() {
        return {
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
        }
    },
    created() {
        this.getFoodClass();
        this.getListFood();
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
        openVisible() {
            this.saveForm = {};
            this.classData = {};
            this.settlementList = [];
            this.ContNum = this.sum(this.settlementList);
            this.moneyNum = this.money(this.settlementList);
            this.getListFood();
        },
        // 获取菜品类别
        async getFoodClass() {
            let { code, rows } = await getFoodClass();
            if (code == 200) {
                this.dishesClassify = rows;
                this.dishesClassify.unshift({ id: 99, name: '全部' })
            }
        },
        // 获取菜品
        async getListFood() {
            let { code, rows } = await listFood(this.classData);
            if (code == 200) {
                rows.forEach(item => {
                    item.num = 1
                })
                this.menuList = rows;

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
            // this.settlementList = Array.from(...new Set(this.settlementList))
            this.settlementList = this.unique(this.settlementList)
            this.ContNum = this.sum(this.settlementList);
            this.moneyNum = this.money(this.settlementList)
        },
        itemNum() {
            this.ContNum = this.sum(this.settlementList);
            this.moneyNum = this.money(this.settlementList)
        },
        subMitAdd() {
            console.log(this.settlementList);
            if (this.settlementList.length == 0) {
                this.$message.error('请选择菜品下单！');
                return false
            }
            let paramsData = this.settlementList.map(item => {
                let data = {}
                data.foodId = item.id;
                data.num = item.num
                return data
            })
            let newTime = new Date()
            let params = {
                tableId: '-1',
                price: this.moneyNum,
                amount: this.moneyNum,
                discountAmount: 0,
                food: paramsData,
                status: '2',
                billTime: this.parseTime(newTime)
            }

            console.log(params);
            let setHtml = this.settlementList.map(item => {
                return `<div class="order-detail-item-list">
                                <span class="order-detail-item-list-title">${item.name}</span>
                                <span class="order-detail-item-list-price">${item.price * item.num
                    }</span>
                                <span class="order-detail-item-list-total">✖${item.num}</span>
                            </div>`
            })


            addOrder(params).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.$message.success('下单成功！');

                    let strHtml = `<div class="order-detail" :id="order.orderNo">
                        <h3 class="order-detail-nickName">${this.$store.state.user.userInfo.nickName}</h3>
                        <p style="padding: 0 10px;">订单编号：${res.data}</p>
                        <span>************************</span>
                        <div class="order-detail-item">
                            <div class="order-detail-item-list">
                                <span class="order-detail-item-list-title weight">菜品名称</span>
                                <span class="order-detail-item-list-price weight">金额</span>
                                <span class="order-detail-item-list-total weight">数量</span>
                            </div>
                            ${setHtml}
                        </div>
                        <span>************************</span>
                        <div class="footer-money">
                            合计金额：${this.moneyNum}
                        </div>
                    </div>`
                    let styleAdd = `
            <style>
            .order-detail {
                width:400px
    height: 100%;
    border: 1px solid #c0c0c0;
    color: #000;}
    .order-detail-nickName {
        text-align: center;
    }
    .order-detail-item {
        border-top: 1px solid #c0c0c0;
        padding: 10px  0 20px 0;
        height: 45vh;
        border-bottom: 1px solid #c0c0c0;
    }
    .order-detail-item-list {
            padding: 0 8px;
    }
    .order-detail-item-list span {
                line-height: 25px;
                float: left;
                display: inline-block;
            }
            .order-detail-item-list-title {
                width: 90px;
                text-align: left;
            }

            .order-detail-item-list-price {
                width: 35px;
                text-align: left;
            }

            .order-detail-item-list-total {
                width: 35px;
                text-align: right;
            }
            .footer-money {
        text-align: right;
        padding: 0 10px 60px 0;
        line-height: 37px;
    }
      </style>`
                    let strHtmlPrint = styleAdd + '<body>' + strHtml + '</body>'
                    this.$nextTick(() => {
                        let LODOP = getLodop()//调用getLodop获取LODOP对象
                        LODOP.PRINT_INIT("")
                        LODOP.SET_LICENSES('', '15F0BE661E7F39DF7491843CB2514F3D', '', '')
                        LODOP.SET_PRINT_PAGESIZE(3, "58mm", 60, "");
                        LODOP.SET_PRINT_STYLE("FontSize", 4);
                        LODOP.ADD_PRINT_HTM('0mm', '0mm', '100%', '100%', strHtmlPrint)
                        // LODOP.PREVIEW()
                        LODOP.PRINT()
                    })
                    this.openVisible()
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
                }
            }
            return result
            // console.log(result);
        },
    }
};
</script>
<style scoped lang='scss'>
.merchan-box {
    height: 100vh;
    padding: 20px;
    position: relative;
    background-color: #FFF;
    overflow: hidden;
}

.flour-footer {
    text-align: right;
}

.log-Box {
    height: 90vh;
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
            height: 80vh;
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
            height: 86vh;

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

        .menu-list {
            overflow: auto;
            height: 86vh;

            .menu-item {
                cursor: pointer;
                line-height: 120px;
                margin: 5px 6px;
                border-top: 1px solid #ccc;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                position: relative;
                font-size: 18px;
                color: #000;
                text-align: center;
                width: 160px;
                display: inline-block;
                float: left;
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
}

.home {
    position: fixed;
    top: 10px;
    right: 10px;
}
</style>