<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-06 13:37:00
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-16 01:10:23
 * @FilePath: \orderfood\src\views\desktopIMgr\QRcodeMgrIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="content base-background" :style="{ 'min-height': branchHeight }">
            <div class="content-table center_QR_desktop">
                <div class="top_box">
                    <h4>二维码管理</h4>
                    <div>

                        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addArea">新增区域</el-button>
                        <el-button type="primary" size="mini" icon="el-icon-download"
                            @click="ExportQRcode">一键导出二维码</el-button>
                    </div>
                </div>
                <div class="center-list">
                    <div class="list_item" v-for="(item, index) in ArrayList" :key="index">
                        <div class="region_title">
                            {{ item.areaName }}
                            <el-link type="primary" @click="editRegionDesk(item)">修改</el-link>
                            <!-- <el-link type="danger" @click="regionDesk(item)">删除</el-link> -->
                        </div>
                        <div class="desktop_list">
                            <div class="desktop_item" v-for="(ites, index) in item.ChildrenList" :key="index">
                                <div class="item-name">
                                    {{ ites.deskName }}
                                </div>
                                <div class="QR-img">
                                    <el-link type="primary" @click="editDesk(item,ites)">修改</el-link>
                                    <el-link type="danger" @click="delDesk(ites)">删除</el-link>
                                    <img src="@/assets/images/qr_code.png" alt="">
                                </div>
                            </div>
                            <div class="desktop_item item-plus" @click="addDesk(item)">
                                <i class="el-icon-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <area-view ref="areaView" :titleTop="titleTop"></area-view>
        <desk-view ref="deskView" :titleLog="titleLog"></desk-view>
    </div>
</template>
<script>
import { listArea, delArea, listTable, delTable } from '@/api/desktopMgr/desktopMgr'
import areaView from './dialog/RegionDesk.vue'
import deskView from './dialog/tableDesk.vue'
export default {
    name: 'QRcodeMgrIndex',
    components: {
        areaView,
        deskView
    },
    data() {
        return {
            branchHeight: '',
            areaList: [],
            titleTop: '',
            titleLog: '',
            desktopList: [],
            dataList: [],
            ArrayList: []
        }
    },
    created() {
        this.getListArea();
        // this.getListTable();


    },
    mounted() {
        this.$nextTick(() => {
            this.branchHeight = document.body.clientHeight - 126 + 'px'
        })

    },
    methods: {
        async ExportQRcode() {

        },
        // 查询桌面
        async getListTable() {
            let { code, rows } = await listTable();
            if (code == 200) {
                this.desktopList = [];
                rows.forEach(element => {
                    let data = {}
                    data.id = 'desk' + element.id
                    data.deskId = element.id;
                    data.deskName = element.name;
                    data.areaId = element.areaId
                    data.parentId = 'area' + element.areaId;
                    this.dataList.push(data)
                })
                this.ArrayList = [];
                this.ArrayList = this.delTreeData(this.dataList, 'id', 'parentId', 'ChildrenList')
            }
        },
        // 新增桌面
        addDesk(item) {
            this.titleLog = '新增桌面'
            this.$refs.deskView.openVisible(item)
        },
        // 修改桌面
        editDesk(item,its) {
            this.titleLog = '修改桌面'
            this.$refs.deskView.openVisible(item,its)
        },
        // 删除桌面
        delDesk(item) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delTable(item.deskId).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });

                        this.getListArea()
                    }
                })

            })
        },

        // 查询区域
        async getListArea() {
            let { code, rows } = await listArea();
            if (code == 200) {
                this.areaList = [];
                this.dataList = [];
                rows.forEach(element => {
                    let areaData = {}
                    areaData.areaName = element.name
                    areaData.areaId = element.id
                    areaData.id = 'area' + element.id
                    this.dataList.push(areaData)
                })
                this.getListTable()
            }
        },
        // 新增区域
        addArea() {
            this.titleTop = '新增区域'
            this.$refs.areaView.openVisible()
        },
        // 修改区域
        editRegionDesk(item) {
            this.titleTop = '修改区域'
            this.$refs.areaView.openVisible(item)
        },
        // 删除区域
        regionDesk(item) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delArea(item.id).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });

                        this.getListArea()
                    }
                })

            })
        },
        delTreeData(treeArr, id, parentId, childrenList) {
            // 数据克隆
            let cloneData = JSON.parse(JSON.stringify(treeArr));
            return cloneData.filter(fatherItem => {
                let warpArr = cloneData.filter(sonItem => fatherItem[id] == sonItem[parentId]);
                warpArr.length ? fatherItem[childrenList] = warpArr : null;
                return !fatherItem[parentId];
            })
        },

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

                .item-plus {
                    text-align: center;
                    line-height: 145px;

                    i {
                        font-size: 36px;
                    }
                }

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
                        justify-content: space-evenly;

                        img {
                            width: 17px;
                            height: 17px;
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