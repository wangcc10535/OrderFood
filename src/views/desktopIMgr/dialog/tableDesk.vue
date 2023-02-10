<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-15 20:53:43
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-10 14:54:12
 * @FilePath: \orderfood\src\views\desktopIMgr\dialog\tableDesk.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleLog" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%"
            :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="所属区域">
                    <!-- <el-input v-model="saveForm.a"></el-input> -->
                    <span>{{ saveForm.areaName }}</span>
                </el-form-item>
                <el-form-item label="桌面名称" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="subMitAdd" v-preventReClick>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { updateTable, addTable } from '@/api/desktopMgr/desktopMgr'
export default {

    name: 'addOredit',
    props: { titleLog: '' },
    data() {
        return {
            dialogVisible: false,
            saveForm: {},
            rules: {
                name: [{ required: true, message: '请填写桌面名称', trigger: 'blur' }]
            },
            dishesClassify: [],
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        openVisible(item, data) {
            this.dialogVisible = true;
            this.saveForm = {};
            if (data) {
                data.areaName = item.areaName
                this.saveForm = data
            } else {
                this.saveForm.areaName = item.areaName;
                this.saveForm.areaId = item.areaId
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
                        updateTable(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('修改成功！')
                                this.handleClose()
                            }
                        })
                    } else {
                        addTable(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('新增成功！')
                                this.handleClose()
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },
    }
};
</script>
<style scoped lang='scss'>

</style>