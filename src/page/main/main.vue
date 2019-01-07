<style lang=''>
.home-tabar {
  background-color: #fff;
  border-top: 1px solid #eee;
}
.mint-tab-item a {
  display: inline-block;
  height: 100%;
  width: 100%;
}
.router-link-active {
  color: #0093FF;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #fff;
}
.icon-home::before, .icon-discover::before, .icon-order::before, .icon-person::before {
  font-size: .45rem;
}
.tabbar-text {
  margin-top: .1rem;
}
</style>
<template>
  <div class='main'>
    <router-view></router-view>
    <mt-tabbar v-model="selected" value="tab1" fixed="fixed" class="home-tabar">
      <mt-tab-item id="tab1">
        <router-link to="/home">
          <p class="iconfont icon-home"></p>
          <p class="tabbar-text">首页</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <router-link to="/discover">
          <p class="iconfont icon-discover"></p>
          <p class="tabbar-text">发现</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <router-link to="/order">
          <span class="iconfont icon-order"></span>
          <p class="tabbar-text">订单</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <router-link to="/person">
          <span class="iconfont icon-person"></span>
          <p class="tabbar-text">我的</p>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabItem } from 'mint-ui'

Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)

export default {
  data () {
    return {
      selected: 'tab1',
      fixed: true
    }
  },
  components: {
  },
  mounted () {
    this.$nextTick(function () {
      this.keyboard()
    })
  },
  methods: {
    // 判断键盘弹起收起, 防止底部导航栏被软键盘顶起
    keyboard () {
      let winHeight = window.innerHeight
      let tabbar = document.getElementsByClassName('home-tabar')[0]
      window.onresize = function () {
        let height = this.innerHeight
        if (winHeight - height > 50) {
          // tabbar.style.position = 'absolute'
          tabbar.style.display = 'none'
        } else {
          // tabbar.style.position = 'fixed'
          tabbar.style.display = ''
        }
      }
    }
  }
}

</script>
