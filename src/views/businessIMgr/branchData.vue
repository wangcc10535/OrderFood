<!--
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2023-01-05 21:55:05
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-08 14:38:40
 * @FilePath: \orderfood\src\views\businessIMgr\branchData.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-container">
        <div class="content base-background" :style="{height:branchHeight}">
            <div class="branch-box" v-for="(item,index) in branchList" :key="index">
                <div class="branch-box-img">
                    <img src="@/assets/images/md-poll.png" alt="">
                </div>
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'branchData',
    data() {
        return {
            branchList:[
                {
                    id: 1,
                    name: '分店1数据'
                }, {
                    id: 2,
                    name: '分店2数据'
                },
            ],
            branchHeight:''
        }
    },
    created() {
        this.branchHeight = document.body.clientHeight - 126 + 'px'
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style scoped lang='scss'>
.branch-box{
    width: 258px;
    height: 160px;
    border-radius: 4px;
    border: 1px solid #bbbbbb;
    display: flex;
    float: left;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 20px;
    &-img{
        width: 68px;
        height: 68px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.branch-box:last-child{
    margin: unset;
}
.base-background {
    overflow: hidden;
}
.content {
    margin-top: 0;
}
</style>