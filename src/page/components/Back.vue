<style>
.icon-back__style {
    padding: .1rem;
    float: left;
  }
</style>
<template>
  <i class="iconfont icon-back icon-back__style" @click="back"></i>
</template>
<script>

export default {
  methods: {
    back () {
      window.history.back(-1)
    }
  }
}
</script>
