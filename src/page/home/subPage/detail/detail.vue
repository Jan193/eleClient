<style lang=''>
.detail {
  font-size: .32rem;
}
.detail-hd {
    height: 2rem;
    /* background-color: #c4bdcc; */
    background-repeat: no-repeat;
    background-size: 100%;
}
 .tabbar {
   background-color: #fff;
   /* position: sticky;
   top: 0;
   z-index: 100; */
 }
.tabbar-fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
}
.tabbar-list {
  display: flex;
  border-bottom: 1px solid #eee;
}
.tabbar-item {
  flex: 1;
  text-align: center;
}
.tabbar-item a {
  display: inline-block;
  padding: .2rem .15rem;
}
.tabbar-item__active {
  border-bottom: 2px solid #2395FF;
}
.good-item {
  padding: .1rem;
  border-bottom: 1px solid #eee;
}
.good-item-info {
  position: relative;
  flex: 1;
  padding-left: .1rem;
}
.good-item {
  display: flex;
}
.good-item-img {
  width: 1.5rem;
  height: 1.5rem;
}
.good-item-img img {
  width: 100%;
  height: 100%;
}
.good-name {
  font-size: .34rem;
}
.food-material, .good-market {
  font-size: .2rem;
  color: #bbb;
}
.good-price {
  font-size: .4rem;
  color: red;
}
.good-buy {
  position: absolute;
  right: .1rem;
  bottom: 0;
}
:root {
  --cicleSize: .4rem;
}
.cicle {
  display: inline-block;
  width: var(--cicleSize);
  height: var(--cicleSize);
  line-height: var(--cicleSize);
  text-align: center;
  background-color: #2395FF;
  border-radius: 50%;
  color: #fff;
  font-size: .4rem;
}
.good-number {
  margin: 0 .1rem;
}
.good-box {
  display: flex;
  position: sticky;
  top: 1rem;
}
.good-box-fixed {
  /* position: fixed;
  top: 0;
  height: 100vh;
  margin-top: .85rem;
  margin-bottom: 1rem; */
}
.detail-hd .icon-back {
  color: #fff;
  padding-left: .2rem;
  padding-top: .2rem;
}
.shopping-logo {
  position: absolute;
  top: -1.2rem;
  left: 50%;
  overflow: hidden;
  margin-left: -.75rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: .1rem;
  background-color: #bbb;
}
.shopping-logo img {
  width: 100%;
  height: 100%;
}

</style>
<template>
  <div class='detail'>
    <header class="detail-hd" :style="'background-image: url('+ merchantDetail.headImg + ')'">
      <!-- <i class="iconfont icon-back icon-back__style"></i> -->
      <Back/>
    </header>
    <article style="position: relative;">
      <p class="shopping-logo"><img :src="merchantDetail.logo" alt=""></p>
      <h3 style="text-align:center; padding-top: .3rem;">{{merchantDetail.mname}}</h3>
      <!-- <p style="font-size: .3rem; text-align:center;">{{Item.special}}</p> -->
      <p style="text-align: center;"> 评价 {{merchantDetail.score}} 月售{{merchantDetail.sales}}</p>
    </article>
    <section>
      <div class="tabbar" ref="tabbar" :class="tabbarFixed ? 'tabbar-fixed' : ''">
        <ul class="tabbar-list">
          <li class="tabbar-item"
            v-for="(item, index) in statusList"
            @click="toggleStatus(item)"
            :key="index">
            <a href="javascript:;" :class="currentStatus === item.status ? 'tabbar-item__active' : ''">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div v-show="currentStatus === 'order'">
        <div class="good-box" :class="goodBoxFixed ? 'good-box-fixed' : ''">
          <good-type :isFixed="goodBoxFixed" :goodsTypeList="goodsTypeList"></good-type>
          <good-list :isFixed="goodBoxFixed" :goodsList="goodsList"></good-list>
        </div>
        <shopping-cart/>
      </div>
      <div v-show="currentStatus === 'evaluate'">评价</div>
      <div v-show="currentStatus === 'business'">商家</div>
    </section>
  </div>
</template>

<script>
import GoodType from './subComponent/GoodType'
import GoodList from './subComponent/GoodList'
import ShoppingCart from './subComponent/shoppingCart'

export default {
  data () {
    return {
      tabbarFixed: false,
      goodBoxFixed: false,
      currentStatus: 'order',
      statusList: [
        { name: '点餐', status: 'order' },
        { name: '评价', status: 'evaluate' },
        { name: '商家', status: 'business' }
      ],
      merchantDetail: {},
      goodsTypeList: [],
      goodsList: []
    }
  },
  computed: {
    Item () {
      return this.$store.state.item
    }
  },
  components: {
    GoodType, GoodList, ShoppingCart
  },
  created () {
    this.getGoodsType()
    this.getMerchantDetail()
    this.getGoodsList(1)
  },
  mounted () {
    this.$nextTick(function () {
      this.onScroll()
    })
  },
  methods: {
    onScroll () {
      let tabbar = this.$refs.tabbar
      let tabbarTop = tabbar.offsetTop
      // let doc = document.documentElement
      window.onscroll = () => {
        let doc = document.body.scrollTop || document.documentElement.scrollTop
        if (doc >= tabbarTop) {
          this.tabbarFixed = true
          this.goodBoxFixed = true
        } else {
          this.tabbarFixed = false
          this.goodBoxFixed = false
        }
      }
    },
    toggleStatus (item) {
      this.currentStatus = item.status
    },
    /**
     * @description: 获取商家详情
     * @param {type} 
     * @return: 
     */
    getMerchantDetail() {
      const id = this.$route.query.id
      this.axios.get('/merchant/detail', {
        params: {
          id
        }
      }).then(res => {
        this.merchantDetail = res.data.data
      })
    },
    /**
     * @description: 获取商品类型
     * @param {type} 
     */  
    getGoodsType(){
      const merchantId = this.$route.query.id
      this.axios.get('/merchant/goods/type', {
        params: {
          merchantId
        }
      }).then( res => {
        this.goodsTypeList = res.data
      })
    },
    getGoodsList(typeId) {
      this.axios.get('/merchant/goods/list', {
        params: {
          goodsTypeId: typeId
        }
      }).then(res => {
        console.log(res.data);
        this.goodsList = res.data
      })
    }
  }
}

</script>
