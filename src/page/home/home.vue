

<style lang='less'>
@import "./home.less";
.mint-swipe-items-wrap img {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class='home'>
    <header class="header">
      <div id="location"></div>
      <div class="location" ref="location"></div>
      <div class="search-box">
        <input class="search" placeholder="商家、商品搜索" type="search">
      </div>
    </header>
    <section class="home-main">

      <article class="swiper">
        <mt-swipe :auto="0">
          <mt-swipe-item>
            <a v-show="index < 15" href="javascript:;" class="swiper-item" v-for="(item, index) in swiperList" :key="index">
              <p class="img-box"><img :src="item.img" alt=""></p>
              <span class="item-name">{{item.bname}}</span>
            </a>
          </mt-swipe-item>
          <!-- <mt-swipe-item>
            <a href="javascript:;" class="swiper-item" v-for="(item, index) in swiperList" :key="index" else="index >= 15">
              <p class="img-box"><img :src="item.img" alt=""></p>
              <span class="item-name">{{item.bname}}</span>
            </a>
          </mt-swipe-item> -->
        </mt-swipe>
      </article>
      <!-- 精彩推荐 -->
      <div class="recomment">
        <div class="member mb flex">
          <p class="flex-1">
            <img style="widht: .3rem; height: .3rem;" src="https://fuss10.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg?imageMogr/format/webp/thumbnail/34x/" alt="">
            <span>超级会员 <i style="font-style:normal;font-size: .2rem;">每月领取20元红包</i></span>
          </p>
          <p style="height: .45rem; line-height: .45rem; font-size: .25rem;">
            立即开通
            <span style="display:inline-block; transform: rotate(180deg); height: 100%;"><i class="iconfont icon-back toRight" style="font-size: .15rem;transform:scale(.8, .8)"></i></span>
          </p>
        </div>
        <div class="activity">
          <ul class="activity-list">
            <li class="activity-item" v-for="(v, k) in activity" :key="k">
              <p class="taocan">{{v.aname}}</p>
              <p class="dapei">{{v.intro}}</p>
              <p class="qianggou">立即抢购</p>
              <p class="taocan-img"><img :src="v.img" alt=""></p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 轮播图 -->
      <mt-swipe :auto="3000" style="height: 130px">
        <mt-swipe-item v-for="(v, k) in advertising" :key="k">
          <img :src="v.img" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <!-- 推荐商家 -->
      <div class="merchant-box">
        <div class="title">一 推荐商家 一</div>
        <div id="filter" class="filter" ref="filter" :class="isFixed ? 'isfixed' : ''">
          <!-- <div style="position:relative;top:0;"> -->
          <!-- <div style="position: absolute;top:0;"> -->
          <ul class="filter-list">
            <li class="filter-item filter-item__active">
              <span>综合排序</span>
            </li>
            <li class="filter-item">
              <span>距离最近</span>
            </li>
            <li class="filter-item">
              <span>品质联盟</span>
            </li>
            <li class="filter-item">
              <span>筛选</span>
              <i class="iconfont icon-guolv"></i>
            </li>
          </ul>
          <!-- </div> -->
          <!-- </div> -->
        </div>
        <div class="merchants">
          <ul class="merchant-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <li class="merchant-item" v-for="item in shopList" :key="item.id" @click="goDetail(item)">
              <div class="merchant-item-logo"><img :src="item.logo" alt=""></div>
              <div class="merchant-item-info">
                <p class="shop-name">{{item.mname}}</p>
                <p class="market"><span style="color:#FFD902;"><span>☆☆☆☆☆</span> {{item.score}}</span> 月售{{item.sales}}单</p>
                <p class="cost">￥{{item.startPrice}}起送 | 运费￥{{item.distributionPrice}} <span style="float: right">{{item.DISTANCE}} | {{item.needTime}}</span> </p>
                <P class="shop-type">{{item.type}}</P>
                <p class="shop-special">满{{item.meetAmount}}减{{item.discounts}}</p>
                <p class="discount">折 </p>
              </div>
            </li>
          </ul>
          <p style="text-align:center;font-size: .2rem; height: .7rem;line-height: .7rem;">加载更多</p>
        </div>
      </div>
    </section>
    <!-- 购物车 -->
    <Cart></Cart>
  </div>
</template>

<script>
import Vue from 'vue'
import http from '../../js/api.js'

import { Swipe, SwipeItem, InfiniteScroll } from 'mint-ui'
const Mock = require('mockjs')

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(InfiniteScroll)
import Cart from './cart'

export default {
  data () {
    return {
      swiperList: [],
      shopList: [],
      isFixed: false,
      loading: false,
      onLine: [],
      activity: [],
      advertising: []
    }
  },
  components: {
    Cart
  },
  mounted () {
    this.getActivity()
    this.getShopList()
    this.getAdvertising()
    this.$nextTick(function () {
      this.getSwiperList()
      this.scrollFn()
      var res = Mock.mock({
        'sales|1-100': 100
      })
      console.log(res)
    })
  },
  methods: {
    getSwiperList () {
      http.get('/banner/list').then(res => {
        let data = res.data
        this.swiperList = data
      })
    },
    getActivity() {
      http.get('/activity').then( res => {
        this.activity = res.data.data
      })
    },
    getAdvertising() {
      this.axios.get('/advertising').then(res => {
        console.log(res.data);
        this.advertising = res.data.data
      })
    },
    getLocation () {
      const _this = this
      var map = new BMap.Map('location')
      var point = new BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 12)

      // var geolocation = new BMap.Geolocation()
      // // 开启SDK辅助定位
      // geolocation.enableSDKLocation()
      // geolocation.getCurrentPosition(function (r) {
      //   if (this.getStatus() === BMAP_STATUS_SUCCESS) {
      //     let mk = new BMap.Marker(r.point)
      //     map.addOverlay(mk)
      //     map.panTo(r.point)
      //     // alert('您的位置：' + r.point.lng + ',' + r.point.lat)
      //   } else {
      //     alert('failed' + this.getStatus())
      //   }
      // })
      function myFun (result) {
        var cityName = result.name
        map.setCenter(cityName)
        // alert('当前定位城市:' + cityName)
        _this.$refs.location.innerText = cityName
      }
      var myCity = new BMap.LocalCity()
      myCity.get(myFun)
    },
    getShopList () {
      http.get('/merchant/list').then(res => {
        this.shopList = res.data
        console.log(res.data)
      })
    },
    scrollFn () {
      const _this = this
      setTimeout(() => {
        let target = document.getElementById('filter')
        let scrollTop = target.offsetTop
        window.onscroll = function () {
          let doc = document.body.scrollTop || document.documentElement.scrollTop
          if (doc > scrollTop) {
            _this.isFixed = true
          } else {
            _this.isFixed = false
          }
        }
      }, 0)
    },
    loadMore () {
      this.loading = true
      return false
      // setTimeout(() => {
      //   http.get('/api/shopList').then(res => {
      //     // Array.from(this.shopList, res.data.data)
      //     this.shopList.push(...res.data.data)
      //     this.loading = false
      //   })
      // }, 2500)
    },
    goDetail (item) {
      this.$store.state.item = item
      this.$router.push({ path: '/detail', query: { id: item.MID } })
    }
  }
}

</script>
