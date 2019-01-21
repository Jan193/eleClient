<style>
  .discover {
    font-size: .32rem;
    background-color: #F5F5F5;
    min-height: 100vh;
  }
  .discover img {
    width: 100%;
  }
  .jinbi {
    padding: .3rem .2rem .1rem .2rem;
    border-right: 1px solid #eee;
  }
  .youhui {
    color: #999;
    font-size: .28rem;
  }
</style>
<template>
  <div class="discover">
    <Head Title="发现"/>
    <article style="background:#fff;">
      <div><img style="width: 100%;" src="https://fuss10.elemecdn.com/2/9f/cedf0f9959a7e699f81dba18d0aa6gif.gif" alt=""></div>
      <div class="flex" style="border-top: 1px solid #eee;">
        <div class="flex-1 jinbi">
          <p style="color: #FFA826;">金币商城</p>
          <p class="youhui">0元好物在这里</p>
          <p style="overflow:hidden;"><img style="width: 1.6rem;height:1.6rem;float:right;" src="https://fuss10.elemecdn.com/8/38/9c9aea0e856149083d84af3444b78jpeg.jpeg?imageMogr/format/webp/" alt=""></p>
        </div>
        <div class="flex-1" style="height: 100%;">
          <div class="flex" style="border-bottom: 1px solid #eee; padding: .2rem;">
            <div class="flex-1">
              <p style="color: #1BA9E1;">推荐有奖</p>
              <p class="youhui">5元现金拿不停</p>
            </div>
            <div style="height:100%;width: 1rem;"><img  src="https://fuss10.elemecdn.com/6/76/8d42eef97ff4c1c2b671085358541jpeg.jpeg?imageMogr/format/webp/" alt=""></div>
          </div>
          <div class="flex" style="padding: .2rem;">
            <div class="flex-1">
              <p style="color: #EF746E;">周边优惠</p>
              <p class="youhui">领取口碑好劵</p>
            </div>
            <div style="height:100%;width: 1rem;"><img  src="https://fuss10.elemecdn.com/6/76/8d42eef97ff4c1c2b671085358541jpeg.jpeg?imageMogr/format/webp/" alt=""></div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Head from '../components/Header'

export default {
  data () {
    return {}
  },
  components: {
    Head
  }
}
</script>
