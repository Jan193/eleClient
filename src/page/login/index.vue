<style lang='less'>
  @baseColor: #999;
  @themeColor: #1B9DFF;
  .ele_login {
    .hd {
      background-color: @themeColor;
      height: 3rem;
    }
  }
  .login {
    padding: 10px;
    width: 85%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: -1rem;
    margin-bottom: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 10px 0 lighten(@themeColor, 35%);
    input {
      border: 1px solid #DDDDDD;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 4px;
      &::placeholder {
        color: @baseColor;
      }
    }
    input[type='submit'] {
      background-color: #4CD96F;
      color: #fff;
      border: none;
    }
  }
  .login_tip {
    font-size: .2rem;
    margin-bottom: .2rem;
    color: @baseColor;
  }
</style>
<template>
  <div class="ele_login">
    <div class="hd"></div>
    <form class="login" @submit.prevent="submit">
      <input type="text" name="user_name" placeholder="用户名" v-model="userName">
      <input type="password" name="password" placeholder="密码" v-model="userPwd">
      <p class="login_tip">新用户登录即表示自动注册</p>
      <input type="submit" value="登录">
    </form>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      userName: '',
      userPwd: ''
    };
  },
  components: {},
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    submit() {
      if (!this.userName || !this.userPwd) {
        Toast({
          message: '用户名或密码不能为空'
        })
        return;
      }
      this.axios.post('/user/login', {
          userName: this.userName,
          userPwd: this.userPwd
      }).then(res => {
        const data = res.data
        if (data.code === 0) {
          const user = data.data
          const userInfo = { userName: user.userName, userId: user.uid }
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$router.back(-1)
        }  
      })
    },
  }
};
</script>

