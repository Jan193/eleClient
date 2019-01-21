<style lang="less" scoped>
.shopping-cart {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #505051;
  height: 1rem;
  .cart {
    position: absolute;
    left: 0.2rem;
    bottom: 0.2rem;
    z-index: 220;
    width: 1rem;
    height: 1rem;
    text-align: center;
    border-radius: 50%;
    background-color: #444444;
  }
}
.cart-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: #363636;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 0.22rem;
  background-size: 60% 60%;
  background-repeat: no-repeat;
  background-position: center;
}
.cart-img__active {
  /* background-image: url(../../../../../assets/nobuy.svg); */
}
.cart-img__actived {
  /* background-image: url(../../../../../assets/buy.svg); */
  background-color: #3190e8;
}
.good-cost {
  flex: 1;
  line-height: 100%;
  line-height: 1rem;
  padding-left: 1.6rem;
  color: #fff;
  background-color: #505052;
}
.btn-buy {
  background-color: #535356;
  height: 100%;
  padding: 0 0.4rem;
  color: #fff;
}
.btn-buy-active {
  background-color: #38ca73;
}
.bought-list {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 1rem;
  z-index: 200;
  width: 100%;
  background-color: #fff;
}
.bought-item {
  border-bottom: 1px solid #eee;
  padding: 0.2rem;
}
.btn-box {
  height: 100%;
}
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 1rem;
  left: 0;
  z-index: 120;
  /* background: rgba(#000, #000, #000, .5); */
  background-color: #000;
  opacity: 0.5;
}
.mask-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background: rgba(#000, #000, #000, 0.5);
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  /* transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  transition: all 0.2s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.total-count {
  position: absolute;
  top: -0.15rem;
  right: 0;
  z-index: 230;
  height: 0.2rem;
  line-height: 0.2rem;
  text-align: center;
  font-size: 0.26rem;
  color: #fff;
  background-color: #ff6d16;
  border-radius: 50%;
  padding: 0.1rem;
}
.discount_tip {
  position: absolute;
  left: 0;
  right: 0;
  top: -0.4rem;
  font-size: 0.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  background-color: #fffad8;
}
</style>
<template>
  <div class="shopping-cart">
    <transition name="slide-fade">
      <div class="mask-box" v-if="isBoughtList" @click="isBoughtList = false">
        <div class="mask"></div>
        <div class="bought-list" style="width:100%;">
          <p style="background:#ECEFF1;color: #666; padding: .2rem;">已选商品</p>
          <ul>
            <li v-for="(item, index) in buyGood" :key="index" class="flex bought-item">
              <div class="flex-1">
                <span>{{item.name}}</span>
                <span>￥{{item.price * item.count}}</span>
              </div>
              <div style="padding: 0 .1rem;">
                <span class="good-reduce cicle" v-show="item.count > 0" @click="reduce(item)">-</span>
                <span class="good-number" v-show="item.count > 0">{{item.count}}</span>
                <span class="good-add cicle" @click="add(item)">+</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <p class="discount_tip">
      <span v-show="!isDiscount">满{{merchantDetail.meetAmount}}减{{merchantDetail.discounts}}</span>
      <span v-show="isDiscount">已减{{merchantDetail.discounts}}元</span>
    </p>
    <div class="flex" style="height: 100%">
      <div class="cart">
        <span class="total-count" v-show="totalCount>0">{{totalCount}}</span>
        <div
          @click="isBoughtList = !isBoughtList"
          class="cart-container"
          :class="totalPrice > 0 ? 'cart-img__actived' : 'cart-img__active'"
        ></div>
      </div>
      <div class="good-cost">
        <p>￥{{totalPrice}}</p>
      </div>
      <div class="btn-box">
        <button
          class="btn-buy"
          @click="payCost()"
          :class="totalPrice > 0 ? 'btn-buy-active' : ''"
        >去结算</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBoughtList: false,
      isDiscount: false // 是否已经达到满减条件
    };
  },
  components: {},
  computed: {
    buyGood() {
      return this.$store.state.buyGoods;
    },
    totalPrice() {
      let boughtList = this.$store.state.buyGoods;
      let total = 0;
      for (let key in boughtList) {
        let cur = boughtList[key];
        total += cur.count * cur.price;
      }
      total = total.toFixed(2);
      const { meetAmount, discounts } = this.merchantDetail;

      if (total >= meetAmount) {
        total -= discounts;
        this.isDiscount = true;
      } else {
        this.isDiscount = false;
      }
      total = Number(total).toFixed(2);
      return total;
    },
    totalCount() {
      let list = this.$store.state.buyGoods;
      let totalCount = 0;
      for (let key in list) {
        totalCount += Number(list[key].count);
      }
      return totalCount;
    },
    merchantDetail() {
      return this.$store.state.merchantDetail;
    }
  },
  mounted() {},
  methods: {
    payCost() {
      // this.$store.dispatch('changeTest', '我是要改变的内容哟')
      if (this.totalPrice <= 0) {
        return false;
      }
      this.$router.push({ path: "/preOrder" });
    }
  }
};
</script>
