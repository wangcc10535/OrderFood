<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-15 12:39:10
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-15 14:44:41
 * @FilePath: \orderfood\src\views\dishesIMgr\dialog\addClass.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%"
            :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <el-form-item label="显示状态" prop="enable">
                    <el-radio-group v-model="saveForm.enable">
                        <el-radio :label="1">显示</el-radio>
                        <el-radio :label="0">不显示</el-radio>
                    </el-radio-group>
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
import { addFoodClass, updateFoodClass } from '@/api/dishesMgr/dishesIMgr'
export default {
    name: 'addClass',
    props: { titleTop: '' },
    data() {
        return {
            dialogVisible: false,
            saveForm: {},
            rules: {
                name: [{ required: true, message: '请填写菜品分类名称', trigger: 'blur' }]
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
            this.saveForm = {
                enable: 1
            };
            if (data) {
                this.saveForm = data
            }
        },
        handleClose() {
            this.dialogVisible = false;
            this.$parent.getList()
        },
        subMitAdd() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if (this.saveForm.id) {
                        updateFoodClass(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('修改成功！')
                                this.handleClose()
                            }
                        })
                    } else {
                        addFoodClass(this.saveForm).then(res => {
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