<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-15 20:36:57
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-16 11:55:00
 * @FilePath: \orderfood\src\views\desktopIMgr\dialog\RegionDesk.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%"
            :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="区域名称" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="subMitAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { updateArea, addArea } from '@/api/desktopMgr/desktopMgr'
export default {

    name: 'addOredit',
    props: { titleTop: '' },
    data() {
        return {
            dialogVisible: false,
            saveForm: {},
            rules: {
                name: [{ required: true, message: '请填写区域名称', trigger: 'blur' }]
            },
            dishesClassify: []
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        openVisible(data) {
            this.dialogVisible = true;
            this.saveForm = {};
            console.log(data);
            if (data) {
                let saveData = {
                    id:data.areaId,
                    name: data.areaName
                }
                // data.id =
                this.saveForm = saveData
            }
        },
        handleClose() {
            this.dialogVisible = false;
            this.$parent.getListArea()
        },
        subMitAdd() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if (this.saveForm.id) {
                        updateArea(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('修改成功！')
                                this.handleClose()
                            }
                        })
                    } else {
                        addArea(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('新增成功！')
                                this.handleClose()
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
};
</script>
<style scoped lang='scss'>

</style>