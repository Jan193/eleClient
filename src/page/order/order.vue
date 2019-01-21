/*
 * 订单页面
 */
 <style lang='less'>
 .order {
   font-size: .32rem;
   background-color: #F5F5F5;
 }
 .tip {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   text-align: center;
 }
 .order_item {
  //  display: flex
  padding: .1rem;
  ul {
    flex-direction: column;
    li {
      width: 100%;
      display: flex;
      .right {
        flex: 1;
      }
    }
    .pay_status {
      float: right;
    }
  }
 }
.order_img_box {
  width: 30px;
  height: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
 <template>
  <div class="order">
    <Head Title="订单"/>
    <div class="tip" v-if="!isLogged">
      <p style="color: #999; font-size: .35rem;margin: .1rem auto;">登录后查看订单</p>
      <button style="background:#56D176;color:#fff;padding: .2rem .4rem;">立即登录</button>
    </div>
    <ul v-if="orderList">
      <li v-for="(v, k) in orderList" :key="k" class="order_item">
        <ul class="flex">
          <li>
            <div class="order_img_box">
              <img :src="v.logo" alt="">
            </div>
            <div class="right">
              <p>
                <span>{{v.mname}}</span>
                <span class="pay_status">{{v.payStatus}}</span>
              </p>
              <p>{{v.createTime}}</p>
            </div>
          </li>
          <li>
            <p v-for="(vv, kk) in v.list" :key="kk">{{vv.goodsName}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import Head from '../components/Header'
export default {
  data () {
    return {
      isLogged: false, // 是否已经登录
      orderList: []
    }
  },
  components: {
    Head
  },
  computed: {
  },
  created() {
    this.isLogged = this.getUserName() ? true : false
    console.log(this.isLogged);
  },
  mounted() {
    if (!this.isLogged) return;
    this.getOrders()
  },
  methods: {
    getOrders() {
      this.axios.get('/order/list', {
        params: {
          userId: this.getUserId()
        }
      }).then(res => {
        this.orderList = res.data
      })
    }
  }
}
</script>
