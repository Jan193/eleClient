<style lang=''>

</style>
<template>
    <div class=''>
        下单成功
        <button @click="backIndex">返回首页</button>
    </div>
</template>

<script>

export default {
    methods:{
        backIndex() {
            this.$router.push('/')
        }
    }
}

</script>

