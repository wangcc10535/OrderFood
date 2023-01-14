<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-14 23:31:10
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-15 00:29:01
 * @FilePath: \orderfood\src\views\dishesIMgr\dialog\addLog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%"
            :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="菜品名称" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <el-form-item label="菜品价格" prop="price">
                    <el-input-number v-model="saveForm.price" :max="99999" label="输入价格"></el-input-number>
                </el-form-item>
                <el-form-item label="所属分类" prop="account">
                    <el-select class="topSearch-width" v-model="saveForm.eventType" placeholder="请选择">
                        <el-option v-for="item in dishesClassify" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="password">
                    <el-radio-group v-model="saveForm.enable">
                        <el-radio :label="1">上架</el-radio>
                        <el-radio :label="0">下架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片" prop="password">
                    <image-upload :limit="1" @input="titleImg" :value="saveForm.img_file"></image-upload>
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
import { addFood, updateFood } from '@/api/dishesMgr/dishesIMgr'
import imageUpload from '@/components/ImageUpload/index'
export default {
    name: 'addLog',
    props: { titleTop: '' },
    components: { imageUpload },
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
        },
        // 获取封面地址
        titleImg(img) {
            console.log(img);
        },
    }
};
</script>
<style scoped lang='scss'>

</style>