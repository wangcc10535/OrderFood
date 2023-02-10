<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-10 21:35:40
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-16 11:47:13
 * @FilePath: \orderfood\src\views\businessIMgr\dialog\addLog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="分店名称" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <el-form-item label="分店地址" prop="adress">
                    <el-input v-model="saveForm.adress"></el-input>
                </el-form-item>
                <el-form-item label="绑定店铺" prop="deptId">
                    <el-select v-model="saveForm.deptId" placeholder="请选择绑定店铺">
                        <el-option v-for="item in deptList" :key="item.deptId" :label="item.deptName"
                            :value="item.deptId">
                        </el-option>
                    </el-select>
                </el-form-item>
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
import { listDept } from "@/api/system/dept";
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
                deptId: [{ required: true, message: '请选择绑定店铺', trigger: 'change' }],

            },
            deptList: []
        }
    },
    created() {
        this.getListDept()
    },
    mounted() {
    },
    methods: {
        openVisible(data) {
            this.dialogVisible = true;
            this.saveForm = {
                parentId: this.$store.state.user.userInfo.deptId
            }
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
            this.$parent.getList()
        },
        getListDept() {
            this.deptList = []
            let queryParams = {
                parentId: this.$store.state.user.userInfo.deptId
            }
            listDept(queryParams).then(response => {
                this.deptList = this.handleTree(response.data, "deptId");
                this.deptList.push(this.$store.state.user.userInfo.dept)
            });
        },
        subMitAdd() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    console.log(this.saveForm);
                    if (this.saveForm.id) {
                        editShop(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('修改成功！')
                                this.handleClose()
                            }
                        })
                    } else {
                        AddShop(this.saveForm).then(res => {
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
        }
    }
};
</script>
<style scoped lang='scss'>

</style>