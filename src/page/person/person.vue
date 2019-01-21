<style lang="less">
.person {
    font-size: 0.32rem;
    background-color: #f5f5f5;
    min-height: 100vh;
}
.top-login {
  background-image: linear-gradient(90deg, var(--themeColorLeft), var(--themeColorRight));
  padding: .3rem .2rem;
  color: #fff;
}
.user-head {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.user-info {
  flex: 1;
  margin-left: .2rem;
}
.user-name {
  font-size: .4rem;
}
.user-tel {
  font-size: .28rem;
  margin-top: .1rem;
}
.nav {
  background-color: #fff;
}
.nav-item {
  text-align: center;
  padding: .2rem 0;
}
.nav-item:not(:last-child) {
  border-right: 1px solid #eee;
}
.menu-item {
  padding: .2rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
.menu-item__top{
  margin-top: .2rem;
  border-top: 1px solid #eee;
}
.nav .iconfont {
  font-size: .45rem;
}
.menu .iconfont {
  margin-right: .15rem;
}
.toRight {
  transform: rotate(180deg);
  float: right;
  color: #bbb;
}
</style>
<template>
  <div class="person">
    <Head Title="我的"/>
    <div class="top-login flex" @click="login">
      <div class="user-head"><img src="../../../static/img/moren.jpg" alt=""></div>
      <div class="user-info">
        <p class="user-name">{{userName ? userName : '登录/注册'}}</p>
        <p class="user-tel">{{userName ? '' : '登录后享受更多特权'}}</p>
      </div>
    </div>
    <div class="flex nav">
      <div class="flex-1 nav-item">
        <p><i class="iconfont icon-money" style="color: #f90;"></i></p>
        <p>钱包</p>
      </div>
      <div class="flex-1 nav-item">
        <p><i class="iconfont icon-redenvelope" style="color: #FF5F3E;"></i></p>
        <p>红包</p>
      </div>
      <div class="flex-1 nav-item">
        <p><i class="iconfont icon-money1" style="color: #6AC20B;"></i></p>
        <p>金币</p>
      </div>
    </div>
    <div class="menu">
      <ul class="menu-list">
        <li class="menu-item address menu-item__top">
          <i class="iconfont icon-yidiandiantubiao03" style="color: #4AA5F0;"></i>我的地址
          <i class="iconfont icon-back toRight"></i>
        </li>
        <li class="menu-item shopping-mall menu-item__top">
          <i style="color: #94D94A;" class="iconfont icon-shoppingbag"></i>
          金币商城
          <i class="iconfont icon-back toRight"></i>
        </li>
        <li class="menu-item share">
          <i style="color: #FC7B53;" class="iconfont icon-gift"></i>
          分享拿5元现金
          <i class="iconfont icon-back toRight"></i>
        </li>
        <li class="menu-item service menu-item__top">
          <i style="color: #4AA5F0;" class="iconfont icon-service"></i>
          我的客服
          <i class="iconfont icon-back toRight"></i>
        </li>
        <li class="menu-item load">
          <i style="color: #4AA5F0;" class="iconfont icon-app"></i>
          下载App
          <i class="iconfont icon-back toRight"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Head from '../components/Header.vue'
import { MessageBox } from 'mint-ui';

export default {
  data () {
    return {
      userName: ''
    }
  },
  components: {
    Head
  },
  created() {
    let userInfo = window.sessionStorage.getItem('userInfo')
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userName = userInfo.userName
    }
  },
  methods: {
    login() {
      if (this.userName) {
        MessageBox({
          title: '提示',
          message: '确定要退出登录?',
          showCancelButton: true
        }).then(action => {
          if (action === 'confirm') {
            this.$router.push('/')
          }
        })
      } else {
        this.$router.push('/login')
      }
    },
  }
}
</script>
