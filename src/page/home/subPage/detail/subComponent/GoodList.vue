<style lang=''>
  .good-list-box {
    overflow-y: auto;
  }
  .good-list-fixed {
    position: sticky;
    left: 2rem;
    right: 0;
    top: .85rem;
    bottom: 1rem;
    /* margin-left: 2rem;
    margin-top: .85rem;
    margin-bottom: 1rem; */
  }
</style>
<template>
  <div class="good-list-box" style="flex: 1;" :class="isFixed ? 'good-list-fixed' : ''">
    <ul class="good-list">
      <li class="good-item" v-for="(item, index) in goodsList" :key="index">
        <div class="good-item-img"><img :src="item.img" alt=""></div>
        <div class="good-item-info">
          <p class="good-name">{{item.iname}}</p>
          <!-- <p class="food-material">【5个一份】食材：小麦粉,猪肉</p> -->
          <p class="good-market">月售{{item.sales}}份</p>
          <p class="good-price">￥{{item.price}}</p>
          <div class="good-buy">
            <span class="good-reduce cicle" v-show="item.count > 0" @click="reduce(item)">-</span>
            <span class="good-number" v-show="item.count > 0">{{item.count}}</span>
            <span class="good-add cicle" @click="add(item)">+</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    isFixed: {
      type: Boolean
    },
    /* goodsList: {
      type: Array,
      default: []
    } */
  },
  data () {
    return {
      // goodList: [],
      goodBuy: {
        number: 0
      },
      justOne: false
    }
  },
  computed: {
    /**
     * @description: 一个商品所点的数量
     * @param {type} 
     * @return: 
     */
    itemTotalCount() {

    },
    goodsList() {
      console.log(this.$store.state.goodsList);
      return this.$store.state.goodsList
    },
  },
  mounted () {
    let buyGoods = this.$store.state.buyGoods
    console.log(buyGoods);
    if (buyGoods) {
      for (let key in buyGoods) {
        this.goodsList.forEach( item => {
          if (item.iid === Number(key)) {
            item.count = buyGoods[key].count
            console.log('有一个??');
          }
        })
      }
    }
  },
  methods: {
    add (item) {
      item.count = Number(item.count) + 1
      this.$store.dispatch('add', item.typeId)
      this.$store.dispatch('addBuyList', item)
    },
    reduce (item) {
      item.count = Number(item.count) - 1
      this.$store.dispatch('reduce', item.typeId)
      this.$store.dispatch('reduceBuyList', item)
    }
  },
  destroyed () {
    // this.$store.state.state.goodType = []
  }
}

</script>
