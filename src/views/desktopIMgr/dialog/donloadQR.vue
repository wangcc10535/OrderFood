<!--
 * @Author: wangcc 1053578651@qq.com  二维码导出
 * @Date: 2023-02-03 17:39:52
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-10 14:54:27
 * @FilePath: \orderfood\src\views\desktopIMgr\donloadQR.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog title="导出二维码" :visible.sync="dialogVisible" v-if="dialogVisible" width="60%"
            :before-close="handleClose">
            <div id="exportPdf" ref="exportPdf">
                <div class="qrcode-pic" ref="codeItem"  v-for="(v, i) in dataList" :key="i">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="downLoadPicture" v-preventReClick>确定导出</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
    name: 'donloadQR',
    data() {
        return {
            dialogVisible: false,
            dataList: [],
            qrFile:[]
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        getData(data) {
            this.dataList = []
            data.forEach(item =>{
                item.foodTableVos.forEach(its =>{
                    this.dataList.push(its)
                })
            });//设置需要的数据
            this.bindQRCode(); //组装完数据后调用生成二维码的方法
        },
        bindQRCode: function () {
            this.$nextTick(() => {
                this.dataList.forEach((item, index) => {
                    this.$refs.codeItem[index].innerHTML = '';
                    var qrcode = new QRCode(this.$refs.codeItem[index], {
                        text: item.path, //二维码内容
                        width: 160,
                        height: 160,
                        render: 'table',
                        colorDark: "#333333", //二维码颜色
                        colorLight: "#ffffff", //二维码背景色
                        correctLevel: QRCode.CorrectLevel.H
                    })
                    var childs = document.getElementsByClassName('qrcode-pic')[index].childNodes;
                    document.getElementsByClassName('qrcode-pic')[index].removeChild(childs[0]);
                    let qrText = document.getElementsByClassName('qrcode-pic')[index]
                    var span = document.createElement("span")
                    span.className = 'qrcode-text'
                    span.innerText = item.name
                    qrText.appendChild(span)
                });
            }, 500)
        },
        openVisible(data) {
            this.dialogVisible = true;
            this.getData(data)
        },
        handleClose() {
            this.dialogVisible = false
        },
        subMitAdd() { },
        downLoadPicture() {
            this.$PDFSave(this.$refs.exportPdf, "二维码");
        },
    }
};
</script>
<style scoped lang='scss'>
.qrcode-pic{
    display: inline-flex;
    flex-direction: column;
    margin: 10px;
    justify-content: center;
    align-items: center;
 
}
.qrcode-text{
        text-align: center;
        display: block;
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
    }
</style>