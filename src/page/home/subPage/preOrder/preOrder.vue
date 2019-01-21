/*
import { triggerAsyncId } from 'async_hooks';
    下单
*/
<style>
  .pre-order {
    font-size: .32rem;
  }
  .pre-top {
    background-image: linear-gradient(90deg, var(--themeColorLeft), var(--themeColorRight));
    padding: .2rem;
  }
  .user-info {
    color: #fff;
  }
  .toRight {
    transform: rotate(180deg);
    display: inline-block;
    font-size: .24rem;
  }
  .order-list {
    padding: 0 .2rem;
  }
  .order-list li {
    border-bottom: 1px solid #eee;
    line-height: 1rem;
  }
  .good-img {
    width: .6rem;
    height: .6rem;
    background-color: #eee;
    margin-right: .1rem;
  }
  .good-img img {
    width: 100%;
    height: 100%;
    vertical-align: baseline;
  }
  .good_name, .good_count {
    font-size: .24rem;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    line-height: 1rem;
    background-color: #3C3C3C;
    color: #fff;
  }
  .pay-cost {
    font-size: .36rem;
    font-weight: 700;
    padding-left: .3rem;
  }
  .btn-pay {
    background-color: #00E067;
    color: #fff;
    height: 100%;
    padding: 0 .3rem;
    font-size: .32rem;
  }
</style>
<template>
  <div class="pre-order">
    <Head :Title="title">
      <Back slot="back" />
    </Head>
    <div class="pre-top">
      <div class="user-info">
        <p style="font-size: .28rem;">订单配送至</p>
        <p style="font-size: .38rem;font-weight:700;line-height: .6rem;">东环一路东吴工业园5栋 <i class="iconfont icon-back toRight"></i></p>
        <p style="font-size: .28rem;margin-bottom: .1rem;">{{userName}}</p>
      </div>
      <div style="background:#fff;">
        <div class="flex" style="border-bottom: 1px solid #eee;padding: .2rem;">
          <p>送达时间</p>
          <p class="flex-1" style="text-align:right; color:var(--themeColor)">尽快送达({{serviceTime}})</p>
          <i class="iconfont icon-back toRight"></i>
        </div>
        <div class="flex" style="border-bottom: 1px solid #eee;padding: .2rem;">
          <p>支付方式</p>
          <p class="flex-1" style="text-align:right; color:var(--themeColor)">在线支付</p>
        </div>
      </div>
    </div>
    <div class="order-info">
      <ul class="order-list">
        <li class="flex" style="font-weight:700;">{{merchantDetail.mname}}</li>
        <li class="flex" v-for="(item, key) of boughtList" :key="key">
          <span class="good-img"><img :src="item.img" alt=""></span>
          <span class="flex-1 good_name">{{item.iname}}</span>
          <span class="good_count" style="width:1rem;">x {{item.count}}</span>
          <span>￥{{item.count * item.price}}</span>
        </li>
        <li class="flex fontSize14 colorRed" v-if="isDiscount">
          <span>满减</span>
          <span class="flex-1 textRight">-￥{{merchantDetail.discounts}}</span>
        </li>
      </ul>
    </div>
    <footer class="footer flex">
      <p class="flex-1 pay-cost">￥{{totalPrice}}</p>
      <button class="btn-pay" @click="startPay">去支付</button>
    </footer>
  </div>
</template>
<script>

export default {
  data () {
    return {
      title: this.$route.name,
      userName: '',
      serviceTime: '',
      isDiscount: false, //是否满减了
    }
  },
  computed: {
    boughtList () {
      console.log(this.$store.state.buyGoods);
      return this.$store.state.buyGoods
    },
    totalPrice () {
      let boughtList = this.$store.state.buyGoods
      let total = 0
      for (let key in boughtList) {
        let cur = boughtList[key]
        total += cur.count * cur.price
      }
      const { meetAmount, discounts } = this.merchantDetail
      if (total >= meetAmount) {
        total -= discounts
        this.isDiscount = true
      } else {
        this.isDiscount = false
      }
      return total.toFixed(2)
    },
    merchantDetail() {
      return this.$store.state.merchantDetail
    }
  },
  created() {
    this.userName = this.getUserName()
    this.getServiceTime()
    this.serviceTime = this.getServiceTime()
  },
  methods: {
    back () {
      window.history.back(-1)
    },
    getServiceTime() {
      let now = new Date()
      let h = now.getHours()
      let m = now.getMinutes()
      let needTime = this.merchantDetail.needTime
      m += parseFloat(needTime)
      if (m >= 60) {
        h += 1
        m -= 60
      }
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      return h + ':' + m
    },
    getGoodsList() {
      const goodsList = []
      for (let key in this.boughtList) {
        goodsList.push(this.boughtList[key])
      }
      return goodsList
    },
    startPay() {
      this.axios.post('/order/pay', {
        userId: this.getUserId(),
        merchantId: this.merchantDetail.MID,
        payStatus: 1,
        goodsList: this.getGoodsList()
      }).then(res => {
        if (res.data.code === 0) {
          this.$router.push('/orderSuccess')
        }
      })
    }
  }
}
</script>
