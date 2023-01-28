<template>
  <div class="home">
    <div class="menu-list">
      <div v-for="item in activeinHouseList" :key="item.id" class="menu-item">
        <div class="menu-item-log" @click="menuHer(item)" :style="item.imageUrl">
          <img :src="item.icon" alt />
          <h2>{{ item.name }}</h2>
        </div>
      </div>
    </div>
    <div class="logOut">
      <el-button icon="el-icon-switch-button" circle @click="logout"></el-button>
    </div>
  </div>
</template>

<script>
import { checkPermi } from '@/utils/permission';
export default {
  name: 'index',
  data() {
    return {
      nowTime: '',
      menuList: [
        {
          id: 1,
          src: '@/assets/images/blue.png',
          imageUrl: {
            backgroundImage: 'url(' + require('@/assets/images/blue.png') + ')',
            backgroundRepeat: 'no-repeat'
          },
          name: '后台管理系统',
          icon: require('@/assets/images/houtaiguanli-houtaiguanli.png'),
          path: '/BackOfficeIndex',
          // path: 'http://ntbigscreen.hw.hongweisoft.com/#/',
          hasPermi: ['region:index:BackOffice']
        },
        {
          id: 2,
          src: '@/assets/images/yellow.png',
          imageUrl: {
            backgroundImage:
              'url(' + require('@/assets/images/yellow.png') + ')',
            backgroundRepeat: 'no-repeat'
          },
          name: '餐馆点餐系统',
          icon: require('@/assets/images/diancan-2.png'),
          path: '/merchantIMgr/index',
          hasPermi: ['region:index:merchant']
        },
        {
          id: 3,
          src: '@/assets/images/yellow.png',
          imageUrl: {
            backgroundImage:
              'url(' + require('@/assets/images/yellow.png') + ')',
            backgroundRepeat: 'no-repeat'
          },
          name: '粉面点餐系统',
          icon: require('@/assets/images/diancan-2.png'),
          path: '/FlourOrderIMgr/index',
          hasPermi: ['region:index:Flour']
        },
        {
          id: 4,
          src: '@/assets/images/yellow.png',
          imageUrl: {
            backgroundImage:
              'url(' + require('@/assets/images/yellow.png') + ')',
            backgroundRepeat: 'no-repeat'
          },
          name: '自助点餐系统',
          icon: require('@/assets/images/diancan-2.png'),
          path: '/BuffetOrderIMgr/index',
          hasPermi: ['region:index:Buffet']
        }
      ]
    };
  },
  computed: {
    activeinHouseList: function () {
      return this.menuList.filter((item) => {
        return item.hasPermi ? checkPermi(item.hasPermi) : true
      })
    }
  },

  created() {
  },
  mounted() { },
  methods: {
    checkPermi,
    menuHer(item) {
      location.href = item.path;
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/';
        })
      }).catch(() => { });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  background-image: url('../assets/images/indexbac.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}

.home::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(8px);

}

.top-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 66px;

  // background-image: url('../assets/images/index-top.png');
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  h2 {
    margin: 0;
    line-height: 51px;
    color: #08eeff;
    position: absolute;
    width: 100%;
    top: 0;
    text-align: center;
  }

  span {
    color: #43a7ec;
    font-size: 1.2em;
    position: absolute;
    line-height: 36px;
    left: 7%;
  }

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5%;
  }

  .weather {
    position: absolute;
    line-height: 40px;
    width: 120px;
    right: 13%;
  }
}

.logOut {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 4;
}

.menu-list {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: center;
  z-index: 3;
  position: absolute;

  .menu-item {
    cursor: pointer;
    width: 20.938%;
    height: 310px;
    margin-right: 40px;

    img {
      width: 76px;
      height: 75px;
    }

    h2 {
      color: #fff;
    }

    .menu-item-log {
      cursor: pointer;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .menu-item:last-child {
    margin-right: 0;
  }

  // .menu-item:nth-child(2) {
  //   margin-right: 0;
  // }
}

@media screen and (max-width: 800px) {

  .menu-list {
    .menu-item {
      cursor: pointer;
      width: 42%;
      height: 168px;
      margin-right: 40px;

      img {
        width: 53px;
        height: 53px;
      }

      h2 {
        color: #fff;
        font-size: 16px;
      }

      .menu-item-log {
        cursor: pointer;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .menu-item:nth-child(2) {
      margin-right: 0;
    }
  }
}
</style>

