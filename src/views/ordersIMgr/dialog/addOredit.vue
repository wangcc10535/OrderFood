<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-15 17:23:29
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-15 17:40:30
 * @FilePath: \orderfood\src\views\ordersIMgr\dialog\addOredit.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%"
            :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="选择店铺" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <el-form-item label="选择桌位" prop="enable">
                    <el-radio-group v-model="saveForm.enable">
                        <el-radio :label="1">显示</el-radio>
                        <el-radio :label="0">不显示</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用餐人数" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <el-form-item label="选择日期" prop="name">
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
export default {

    name: 'addOredit',
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
            console.log(data);
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
                    // alert('submit!');
                    console.log(this.saveForm);
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