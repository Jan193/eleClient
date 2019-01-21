<template>
    <div class="cart">
        <img src="./cart.png" alt="购物车">
    </div>
</template>
<style scoped>
    .cart {
        position: fixed;
        right: .1rem;
        bottom: 1.5rem;
        border: 1px solid #bbb;
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        border-radius: 50%;
        background-color: #fff;
        /* overflow: hidden; */
        display: table;
    }
    .cart img {
        width: 70%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
