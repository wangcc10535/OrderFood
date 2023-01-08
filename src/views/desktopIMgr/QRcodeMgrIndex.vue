<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-06 13:37:00
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-08 15:47:41
 * @FilePath: \orderfood\src\views\desktopIMgr\QRcodeMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="content base-background" :style="{ height: branchHeight }">
            <div class="content-table center_QR_desktop">
                <div class="top_box">
                    <h4>二维码管理</h4>
                    <el-button type="primary" size="mini" icon="el-icon-download"
                        @click="ExportQRcode">一键导出二维码</el-button>
                </div>
                <div class="center-list">
                    <div class="list_item" v-for="(item,index) in desktopList" :key="index">
                        <div class="region_title">
                            {{item.title}}
                        </div>
                        <div class="desktop_list">
                            <div class="desktop_item" v-for="(ites,index) in item.child" :key="index">
                                <div class="item-name">
                                    {{ites.name}}
                                </div>
                                <div class="QR-img">
                                    <img src="@/assets/images/qr_code.png" alt="">
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
            desktopList:[
                {
                    id: 1,
                    title: '一楼大厅',
                    child:[
                        {
                            id: 1,
                            name: '1号桌'
                        },
                        {
                            id: 2,
                            name: '2号桌'
                        },
                        {
                            id: 3,
                            name: '3号桌'
                        }
                    ]
                },
                {
                    id: 2,
                    title: '二楼包房',
                    child:[
                        {
                            id: 1,
                            name: '牡丹亭'
                        },
                        {
                            id: 2,
                            name: '888'
                        },
                        {
                            id: 3,
                            name: '兰花厅'
                        }
                    ]
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
                        line-height: 73px;
                        border-bottom: 1px solid rgba(187, 187, 187, 1);
                        text-align: center;
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