<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-14 23:31:10
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-02-09 23:05:03
 * @FilePath: \orderfood\src\views\dishesIMgr\dialog\addLog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog :title="titleTop" :visible.sync="dialogVisible" v-if="dialogVisible" width="40%"
            :before-close="handleClose">
            <el-form :model="saveForm" ref="ruleForm" :rules="rules" label-width="100px">
                <el-form-item label="菜品名称" prop="name">
                    <el-input v-model="saveForm.name"></el-input>
                </el-form-item>
                <!-- foodNo -->
                <el-form-item label="菜品编号">
                    <el-input v-model="saveForm.foodNo"></el-input>
                </el-form-item>
                <el-form-item label="菜品价格" prop="price">
                    <el-input-number v-model="saveForm.price" :max="99999" label="输入价格"></el-input-number>
                </el-form-item>
                <el-form-item label="所属分类" prop="foodTypeId">
                    <el-select class="topSearch-width" v-model="saveForm.foodTypeId" placeholder="请选择">
                        <el-option v-for="item in dishesClassify" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="enable">
                    <el-radio-group v-model="saveForm.enable">
                        <el-radio :label="1">上架</el-radio>
                        <el-radio :label="0">下架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片">
                    <image-upload :limit="1" @input="titleImg" :value="saveForm.imgFile"></image-upload>
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
import { addFood, updateFood, getFoodClass } from '@/api/dishesMgr/dishesIMgr'
import imageUpload from '@/components/ImageUpload/index'
export default {
    name: 'addLog',
    props: { titleTop: '' },
    components: { imageUpload },
    data() {
        return {
            dialogVisible: false,
            disabShow: false,
            saveForm: {
                enable: 1
            },
            rules: {
                name: [{ required: true, message: '请填写菜品名称', trigger: 'blur' }],
                price: [{ required: true, message: '请输入菜品价格', trigger: 'blur' }],
                foodTypeId: [{ required: true, message: '请选择菜品分类', trigger: 'change' }],
            },
            dishesClassify: []
        }
    },
    created() {
        this.getFoodClass()
    },
    mounted() {
    },
    methods: {
        openVisible(data) {
            this.dialogVisible = true;
            console.log(data);
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
                    // alert('submit!');
                    console.log(this.saveForm);
                    if (this.saveForm.id) {
                        updateFood(this.saveForm).then(res => {
                            if (res.code == 200) {
                                this.$message.success('修改成功！')
                                this.handleClose()
                            }
                        })
                    } else {
                        addFood(this.saveForm).then(res => {
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
        // 获取封面地址
        titleImg(img) {
            console.log(img);
            this.saveForm.imgFile = img
        },
        // 查询分类列表
        async getFoodClass() {
            let params = {
                pageNum: 1,
                pageSize: 999
            }
            let { code, rows } = await getFoodClass(params);
            if (code == 200) {
                this.dishesClassify = rows
            }
        },
    }
};
</script>
<style scoped lang='scss'>

</style>