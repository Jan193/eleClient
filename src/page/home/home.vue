<style lang='less'>
@import "./home.less";
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
            <a href="javascript:;" class="swiper-item" v-for="(item, index) in swiperList" :key="index" v-if="index < 15">
              <p class="img-box"><img :src="item.imgUrl" alt=""></p>
              <span class="item-name">{{item.name}}</span>
            </a>
          </mt-swipe-item>
          <mt-swipe-item>
            <a href="javascript:;" class="swiper-item" v-for="(item, index) in swiperList" :key="index" v-if="index >= 15">
              <p class="img-box"><img :src="item.imgUrl" alt=""></p>
              <span class="item-name">{{item.name}}</span>
            </a>
          </mt-swipe-item>
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
            <li class="activity-item">
              <p class="taocan">品质套餐</p>
              <p class="dapei">搭配齐全</p>
              <p class="qianggou">立即抢购</p>
              <p class="taocan-img"><img src="https://fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/" alt=""></p>
            </li>
            <li class="activity-item">
              <p class="taocan">限量抢购</p>
              <p class="dapei">超值美味</p>
              <p class="qianggou">
                <span style="color: red;">906</span>人正在抢></p>
              <p class="taocan-img"><img src="https://fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/" alt=""></p>
            </li>
          </ul>
        </div>
      </div>
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
            <!-- <li class="merchant-item" v-for="item in onLine" :key="item.id" @click="goDetail(item)">
              <div class="merchant-item-logo"><img :src="item.img" alt=""></div>
              <div class="merchant-item-info">
                <p class="shop-name">{{item.title}}</p>
                <p class="market">月售4000单</p>
                <p class="cost">￥{{item.start_price}}起送 | 运费￥{{item.distribution_price}}</p>
                <p class="shop-special">满25减10，满49减24</p>
                <p class="discount">折 </p>
              </div>
            </li> -->
            <li class="merchant-item" v-for="item in shopList" :key="item.id" @click="goDetail(item)">
              <div class="merchant-item-logo"><img :src="item.logo" alt=""></div>
              <div class="merchant-item-info">
                <p class="shop-name">{{item.shopName}}</p>
                <p class="market"><span style="color:#FFD902;">{{item.star}}</span> 月售{{item.salesVolume}}单</p>
                <p class="cost">￥20起送 | 运费￥2</p>
                <P class="shop-type">{{item.type}}</P>
                <p class="shop-special">满25减10，满49减24</p>
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
// import axios from 'axios'

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
      onLine: []
    }
  },
  components: {
    Cart
  },
  mounted () {
    this.$nextTick(function () {
      this.getSwiperList()
      this.getLocation()
      this.getShopList()
      this.scrollFn()
      var res = Mock.mock({
        'sales|1-100': 100
      })
      console.log(res)
    })
  },
  methods: {
    getSwiperList () {
      http.get('/api/swiperList').then(res => {
        let data = res.data
        if (data.msg === 'success') {
          this.swiperList = data.data
        }
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
      http.get('/api/shopList').then(res => {
        this.shopList = res.data.data
        console.log(res.data.data)
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
      this.$router.push({ path: '/detail', query: { id: item.id } })
    }
  }
}

</script>
