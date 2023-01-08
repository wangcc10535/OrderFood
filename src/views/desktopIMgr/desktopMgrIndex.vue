<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-06 13:36:07
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-08 15:56:52
 * @FilePath: \orderfood\src\views\desktopIMgr\desktopMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEzhuom
-->
<template>
    <div class="app-container">
        <div class="content base-background" :style="{ height: branchHeight }">
            <div class="content-table center_QR_desktop">
                <div class="top_box">
                    <h4>打印机管理</h4>
                    <el-button type="primary" size="mini" icon="el-icon-plus" @click="ExportQRcode">新增打印机</el-button>
                </div>
                <div class="center-list">
                    <div class="list_item" v-for="(item, index) in desktopList" :key="index">
                        <div class="desktop_list">
                            <div class="desktop_item">
                                <div class="item-name">
                                    {{ item.title }}
                                </div>
                                <div class="QR-img">
                                    数量：{{ item.quantity }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'QRcodeMgrIndex',
    data() {
        return {
            branchHeight: '',
            desktopList: [
                {
                    id: 1,
                    title: '佳博(Gprinter) GP-L80180I',
                    quantity: '2'
                }
            ]
        }
    },
    created() {

    },
    mounted() {
        this.$nextTick(() => {
            this.branchHeight = document.body.clientHeight - 126 + 'px'
        })

    },
    methods: {
        ExportQRcode() { }
    }
};
</script>
<style scoped lang='scss'>
.content-table {
    margin-top: 0;
}

.content {
    margin: unset;
}

.center_QR_desktop {
    .top_box {
        display: flex;
        height: 60px;
        width: 100%;
        border-bottom: 1px solid #BBB;
        align-items: center;
        justify-content: space-between;
    }

    .center-list {
        padding: 24px 0;

        .list_item {
            margin-bottom: 20px;

            .region_title {
                border-left: 3px solid #E5A01C;
                line-height: 32px;
                padding-left: 20px;
                margin-bottom: 20px;
            }

            .desktop_list {
                overflow: hidden;
                padding: 0 10px;

                .desktop_item {
                    width: 145px;
                    height: 140px;
                    background: #F5F5F5 100%;
                    border-radius: 6px;
                    border: 1px solid #DCDCDC;
                    cursor: pointer;
                    transition: 0.3s;
                    box-sizing: border-box;
                    float: left;
                    margin-right: 20px;
                    margin-bottom: 20px;

                    .item-name {
                        border-bottom: 1px solid #bbbbbb;
                        text-align: center;
                        height: 73px;
                        display: flex;
                        align-items: center;
                        padding: 0 5px;

                    }

                    .QR-img {
                        width: 100%;
                        height: 64px;
                        align-items: center;
                        display: flex;
                        justify-content: center;

                        img {
                            width: 33px;
                            height: 33px;
                        }
                    }
                }

                .desktop_item:hover {
                    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

                }

            }
        }
    }
}
</style>