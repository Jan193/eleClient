<style>
.m-header {
  background-image: linear-gradient(90deg, var(--themeColorLeft), var(--themeColorRight));
  color: #fff;
  height: 1rem;
  line-height: 1rem;
  box-sizing: border-box;
}
/* .hd-back {
  padding-left: .15rem;
  font-weight: 550;
  font-size: .4rem;
} */
.hd-title {
  text-align: center;
  font-weight: bold;
}
</style>
<template>
  <header class="m-header flex">
    <!-- <span class="hd-back">＜</span> -->
    <slot name="back"></slot>
    <p class="flex-1 hd-title">{{Title}}</p>
    <slot name="right"></slot>
  </header>
</template>
<script>
export default {
  props: ['Title'],
  data () {
    return {

    }
  }
}
</script>
