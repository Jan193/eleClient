<style lang=''>
  .good-type {
    height: 100vh;
    margin-bottom: 1rem;
    overflow-y: auto;
    background-color: #F8F8F8;
  }
  .good-type-fixed {
    position: sticky;
    top: .85rem;
    left: 0;
    bottom: 1rem;
  }
  .good-type-item {
    position: relative;
  }
  .good-item-active {
    background-color: #fff;
  }
  .type-count {
    position: absolute;
    right: .1rem;
    top: .1rem;
    color: red;
  }
</style>
<template>
  <div class="good-type" :class="isFixed ? 'good-type-fixed' : ''">
    <ul style="width: 2rem;">
      <li class="good-type-item" :class="activeIndex === index ? 'good-item-active' : ''" style="text-align:center;padding: .2rem 0;" v-for="(item, index) in goodsTypeList" :key="item.iid">
        <!-- <span class="type-count" v-show="item.count > 0">{{item.count}}</span> -->
        <span>{{item.iname}}</span>
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
    goodsTypeList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      goodType: [],
      activeIndex: 0
    }
  },
  components: {
  },
  computed: {
    // goodType () {
    //   console.log(this.$store.state.goodType)
    //   return this.$store.state.goodType
    // }
  },
  created () {
  },
  mounted () {
    this.$nextTick(function () {
    })
  },
  methods: {
  }
}

</script>
