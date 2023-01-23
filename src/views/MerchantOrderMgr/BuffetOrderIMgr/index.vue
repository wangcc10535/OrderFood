<!--
 * @Author: wangcc 1053578651@qq.com  自助餐点餐
 * @Date: 2023-01-23 15:35:22
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2023-01-23 15:44:49
 * @FilePath: \orderfood\src\views\MerchantOrderMgr\BuffetOrderIMgr\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="merchan-box">
        <div class="merchan-list">
            <div class="list-item" v-for="(item, index) in desktopList" :key="index">
                <div class="title-top">
                    <span>{{ item.title }}</span>
                </div>
                <div class="desktop-list">
                    <div v-for="(item, index) in item.child" :key="index"
                        :class="item.status == 0 ? 'item-box' : 'item-box item-box-ing'">
                        <div :class="item.status == 0 ? 'top-item' : 'top-item top-item-ing'">
                            {{ item.deskTitle }}
                        </div>
                        <div :class="item.status == 0 ? 'status-span' : 'status-span status-span-ing'">
                            <span v-if="item.status == 0">空闲</span>
                            <span v-if="item.status == 1">{{ item.money }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="home">
            <router-link to="/">
                <el-button type="primary" icon="el-icon-s-home" circle></el-button>
            </router-link>

        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            desktopList: [
                {
                    id: 1,
                    title: '一楼A区',
                    child: [
                        {
                            id: 1,
                            deskTitle: '1号桌',
                            status: 0,
                            money: null
                        },
                        {
                            id: 2,
                            deskTitle: '2号桌',
                            status: 1,
                            money: '199.0'
                        },
                        {
                            id: 3,
                            deskTitle: '2号桌',
                            status: 1,
                            money: '199.0'
                        }
                    ]
                },
                {
                    id: 2,
                    title: '二楼B区',
                    child: [
                        {
                            id: 1,
                            deskTitle: '牡丹房',
                            status: 0,
                            money: null
                        },
                        {
                            id: 2,
                            deskTitle: '菊花厅',
                            status: 1,
                            money: '899.0'
                        }
                    ]
                },
                {
                    id: 2,
                    title: '二楼B区',
                    child: [
                        {
                            id: 1,
                            deskTitle: '牡丹房',
                            status: 0,
                            money: null
                        },
                        {
                            id: 2,
                            deskTitle: '菊花厅',
                            status: 1,
                            money: '899.0'
                        }
                    ]
                },
                {
                    id: 2,
                    title: '二楼B区',
                    child: [
                        {
                            id: 1,
                            deskTitle: '牡丹房',
                            status: 0,
                            money: null
                        },
                        {
                            id: 2,
                            deskTitle: '菊花厅',
                            status: 1,
                            money: '899.0'
                        }
                    ]
                },

            ]
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style scoped lang='scss'>
.merchan-box {
    // height: 100vh;
    padding: 20px 20px 146px 20px;
    position: relative;
    background-color: #FFF;

    .desktop-list {
        padding: 0;
    }

    .merchan-list {
        overflow: hidden;

        .list-item {
            .title-top {
                line-height: 60px;
                padding-left: 20px;
                border-left: 4px solid #E5A01C;
                font-size: 24px;
                margin-bottom: 20px;
                font-weight: 600;
            }

            .item-box {
                cursor: pointer;
                display: inline-block;
                width: 200px;
                background-color: #F5F5F5;
                border-radius: 6px;
                border: 1px solid rgba(220, 220, 220, 1);
                transition: 0.3s;
                margin-right: 40px;
                margin-bottom: 40px;

                .top-item {
                    line-height: 116px;
                    text-align: center;
                    font-size: 22px;
                    border-bottom: 1px dashed #BBB;
                    font-weight: 600;
                }

                .status-span {
                    line-height: 80px;
                    text-align: center;
                    font-size: 22px;
                    color: #9f9f9f;
                    font-weight: 600;
                }
            }

            .item-box-ing {
                border: 1px solid #E5A01C;

            }

            .top-item-ing {
                background-color: #E5A01C;
                border-bottom: 1px dashed #E5A01C;
                color: #FFF;
            }

            .status-span-ing {
                color: #EA0606 !important;
            }

            .item-box:hover {
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            }
        }
    }

    .footer-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        .footer-total {
            background-color: rgba(51, 51, 51, 0.58);
            font-size: 24px;
            overflow: hidden;
            line-height: 60px;
            font-weight: 600;

            .total-ing-box,
            .total-deskyop {
                // float: left;
                width: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: space-evenly;
            }

            .total-ing-box {
                span {
                    color: #2F37EE;
                }
            }

            .total-deskyop {
                .progressing {
                    color: #E5A01C;
                }

                .free-time {
                    color: #fff;
                }
            }

        }

        .nav-box {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: #fff;

            .nav-item {
                height: 80px;
                width: 33.33%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                img {
                    width: 50px;
                    height: 56px;
                }
            }
        }
    }
}

.home {
    position: absolute;
    top: 10px;
    right: 10px;
}
@media screen and (max-width: 800px) {
.merchan-box {
    .merchan-list {
      overflow: hidden;

      .list-item {
        .title-top {
          line-height: 24px;
          padding-left: 15px;
          border-left: 2px solid #e5a01c;
          font-size: 16px;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .item-box {
          cursor: pointer;
          display: inline-block;
          width: 28%;
          background-color: #f5f5f5;
          border-radius: 6px;
          border: 1px solid rgba(220, 220, 220, 1);
          transition: 0.3s;
          margin-right: 22px;
          margin-bottom: 10px;

          .top-item {
            line-height: 58px;
            text-align: center;
            font-size: 16px;
            border-bottom: 1px dashed #bbb;
            font-weight: 600;
          }

          .status-span {
            line-height: 39px;
            text-align: center;
            font-size: 18px;
            color: #9f9f9f;
            font-weight: 500;
          }
        }
        .item-box:nth-child(3) {
            margin-right: 0;
        }

        .item-box-ing {
          border: 1px solid #e5a01c;
        }

        .top-item-ing {
          background-color: #e5a01c;
          border-bottom: 1px dashed #e5a01c;
          color: #fff;
        }

        .status-span-ing {
          color: #ea0606 !important;
        }

        .item-box:hover {
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        }
      }
    }
    .footer-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;

      .footer-total {
        background-color: rgba(51, 51, 51, 0.58);
        font-size: 16px;
        overflow: hidden;
        line-height: 40px;
        font-weight: 600;

        .total-ing-box,
        .total-deskyop {
          // float: left;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        }

        .total-ing-box {
          span {
            color: #2f37ee;
          }
        }

        .total-deskyop {
          .progressing {
            color: #e5a01c;
          }

          .free-time {
            color: #fff;
          }
        }
      }

      .nav-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;

        .nav-item {
          height: 50px;
          width: 33.33%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
            font-size: 12px;
          img {
            width: 25px;
            height: 28px;
          }
        }
      }
    }
  }
}
</style>