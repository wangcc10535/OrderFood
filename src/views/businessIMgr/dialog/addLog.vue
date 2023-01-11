<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-10 21:35:40
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-10 22:06:08
 * @FilePath: \orderfood\src\views\businessIMgr\dialog\addLog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="店铺名称" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺地址" prop="adress">
                    <el-input v-model="saveForm.adress"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="account">
                    <el-input :disabled="disabShow" v-model="saveForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input :disabled="disabShow" v-model="saveForm.password"></el-input>
                </el-form-item>
                <span v-if="saveForm.id">账号密码请移至系统管理中修改</span>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="subMitAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { AddShop, editShop } from '@/api/businessMgr/businessIMgr'
export default {
    name: 'addLog',
    props: { titleTop: '' },
    data() {
        return {
            dialogVisible: false,
            disabShow: false,
            saveForm: {},
            rules: {
                name: [{ required: true, message: '请填写店铺名', trigger: 'blur' }],
                adress: [{ required: true, message: '请填写店铺地址', trigger: 'blur' }],
                account: [{ required: true, message: '请设置店铺登录账号', trigger: 'blur' }],
                password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        openVisible(data) {
            this.dialogVisible = true;
            console.log(data);
            if (data) {
                this.disabShow = true
            } else {
                this.disabShow = false
            }
            if (data) {
                this.saveForm = data
            }
        },
        handleClose() {
            this.dialogVisible = false;
        },
        subMitAdd() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    if (this.saveForm.id) {
                        editShop(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('修改成功！')
                                this.$emit('getList')
                            }
                        })
                    } else {
                        AddShop(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('新增成功！')
                                this.$emit('getList')
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>
<style scoped lang='scss'>

</style>