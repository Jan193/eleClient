/*
 * 订单页面
 */
 <style>
 .order {
   font-size: .32rem;
 }
 .tip {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   text-align: center;
 }

</style>
 <template>
  <div class="order">
    <Head Title="订单"/>
    <div class="tip">
      <p style="color: #999; font-size: .35rem;margin: .1rem auto;">登录后查看订单</p>
      <button style="background:#56D176;color:#fff;padding: .2rem .4rem;">立即登录</button>
    </div>
  </div>
</template>
<script>
import Head from '../components/Header'
export default {
  dadta () {
    return {}
  },
  components: {
    Head
  }
}
</script>
