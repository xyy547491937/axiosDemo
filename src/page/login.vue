<template>
  <div class="login">
    <span class="login-info">登录后发现更多精彩！</span>
    <div class="input-box phone-input">
      <span class="input-label">手机号</span>
      <input v-model="phoneNumber" type="text" placeholder="请输入手机号" />
    </div>
    <p>{{nowUserInfo}}</p>
    <div class="input-box">
      <div class="input-box-item">
        <span class="input-label">验证码</span>
        <input v-model="verificationCode" type="text" placeholder="请输入验证码" />
      </div>
      <span @click="getmsg" class="verification-code-btn" style="margin-left: 10px;">获取验证码</span>
    </div>
    <div @click="toLogin" class="login-btn">授权并登录</div>
  </div>
</template>
<script>
import { texting, login } from '../api/pageApi.js'
import { mapState, mapMutations } from 'vuex';
export default {
  data () {
    return {
      phoneNumber: null,
      verificationCode: null,
    }
  },
  computed: {
    ...mapState(['nowUserInfo'])
  },
  methods: {
    ...mapMutations(['saveNowUserInfo']),
    getmsg () { // 获取验证码
      if (this.checkPhone()) {
        texting({
          mobile: this.phoneNumber,
          templateCode: 'SMS_137390046'
        }).then(res => {
          console.log(res)
        })
      } else {
        return
      }
    },
    toLogin () {
      if (this.checkPhone() && this.verificationCode) {
        login({
          loginName: this.phoneNumber,
          verify: this.verificationCode,
          platform: 'shop',
          terminalType: "pc"
        }).then(res => {
          console.log(res)
          if (res.code == 1 && res.msg == '成功') {
            this.$vux.toast.text('登录成功', 'middle')
            // this.saveNowUserInfo(res.data.user.userId)
            this.$store.commit('saveNowUserInfo', res.data.user.userId)
            this.$router.go(-1)
          }
        })
      } else {
        return
      }
    },
    checkPhone () {
      let reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
      if (!this.phoneNumber) {
        this.$vux.alert.show({
          title: '请输入手机号'
        })
        return false
      } else if (!reg.test(this.phoneNumber)) {
        this.$vux.alert.show({
          title: '请输入正确手机号'
        })
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style scoped>
.login {
  min-height: 100%;
  background-image: url('http://img.meiduduo.com/images/author.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-origin: content-box;
  background-size: 603px 491px;
  padding: 77px 60px 0;
  font-size: 32px;
  color: #333333;
  box-sizing: border-box;
}
.login-info {
  margin-top: 603px;
  margin-bottom: 92px;
  display: block;
  text-align: center;
}
.input-box {
  font-size: 28px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
.phone-input {
  border-bottom: 1px solid #DDDDDD;
  margin-bottom: 30px;
}
.input-box-item {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  border-bottom: 1px solid #DDDDDD;
}
input {
  flex: 1;
  -webkit-flex: 1;
  height: 60px;
  line-height: 60px;
  margin-left: 27px;
  border: 0;
  outline: none;
}
.verification-code-btn {
  display: block;
  width: 180px;
  border-radius: 10px;
  border: 2px solid #FF4691;
  color: #FF4691;
  text-align: center;
  height: 70px;
  line-height: 70px;
  box-sizing: border-box;
}
.input-label {
  display: block;
  width: 90px;
  height: 70px;
  box-sizing: border-box;
  line-height: 70px;
}
.login-btn {
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  line-height: 88px;
  border-radius: 10px;
  background: #00BF00;
  color: #fff;
  font-size: 32px;
  text-align: center;
  margin-top: 54px;
}
</style>
