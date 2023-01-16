<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-17 01:34:09
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-17 01:45:16
 * @FilePath: \orderfood\src\views\ordersIMgr\dialog\billLog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog title="结算订单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="120px">
                <el-form-item label="选择支付方式" prop="pay">
                    <el-radio-group v-model="saveForm.pay" size="small">
                        <el-radio :label="item.value" border v-for="(item, index) in dict.type.pay_type" :key="index">{{
                            item.label
                        }}</el-radio>
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
import { putBill } from '@/api/ordersIMgr/ordersMgr'
export default {
    name: 'billLog',
    props: { titleTop: '' },
    dicts: ['pay_type'],
    data() {
        return {
            dialogVisible: false,
            disabShow: false,
            saveForm: {},
            rules: {
                pay: [{ required: true, message: '请选择支付方式', trigger: 'change' }],

            },
            deptList: []
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        openVisible(data) {
            this.dialogVisible = true;
            if (data) {
                this.saveForm = {
                    id: data.id
                }
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
                    putBill(this.saveForm).then(res => {
                        if (res.code == 200) {
                            this.$message.success('操作成功！')
                            this.handleClose()
                        }
                    })
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