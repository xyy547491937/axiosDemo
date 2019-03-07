<template>
  <div class="registered">
    <!-- <div @click="back" class="back-style">
      <span class="iconfont icon-fanhui"></span>
    </div> -->
    <div class="registered-box">
      <figure>
        <img src="http://img.meiduduo.com/images/mine/mineLogo.png" alt="">
      </figure>
      <div class="input-box-item">
        <input type="text" v-model="phoneNumber" @blur="reboundPage" placeholder="请输入您的手机号" />
        <span v-if="!busying" @click="getmsg">获取验证码</span>
        <span v-else>({{ time }}s)重新获取</span>
      </div>
      <div class="input-box-item">
        <input type="text" v-model="verificationCode" @blur="reboundPage" placeholder="请输入您收到的验证码" />
      </div>
      <div class="input-box-item">
        <input v-model="password" type="password" @blur="reboundPage" placeholder="请输入密码" />
      </div>
      <div class="input-box-item">
        <input v-model="passwordTwo" type="password" @blur="reboundPage" placeholder="请确认密码" />
      </div>
      <div :class="{ 'active-btn': canPush }" @click="push" class="login-btn">注册</div>
      <p class="info">*注册即表示您同意<span @click="toProtocolPage">《胚豆用户协议》</span></p>
    </div>
  </div>
</template>
<script>
import { texting, register } from '../api/pageApi.js'
export default {
  data () {
    return {
      phoneNumber: null,
      verificationCode: null,
      busying: false,
      time: 60,
      password: null,
      passwordTwo: null,
    }
  },
  computed: {
    canPush () {
      if (this.phoneNumber && this.verificationCode && this.password && this.passwordTwo) {
        if (this.password == this.passwordTwo) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  methods: {
    reboundPage () {
      document.activeElement.scrollIntoViewIfNeeded(true)
    },
    push () { // 注册
      if (this.canPush) {
        register({
          verify: this.verificationCode,
          pwd: this.MD5(this.password),
          mobile: this.phoneNumber
        }).then(res => {
          console.log(res)
          if (res.code == 1) {
            this.$vux.toast.text('注册成功', 'middle')
            this.$router.go(-1)
          } else {
            if (res.code == 54) {
              const self = this
              this.$vux.alert.show({
                title: res.msg,
                onHide () {
                  self.$router.go(-1)
                }
              })
            }
          }
        })
      } else {
        if (!this.phoneNumber) {
          this.$vux.toast.text('请输入手机号', 'middle')
        } else if (!this.verificationCode) {
          this.$vux.toast.text('请输入验证码', 'middle')
        } else if (!this.password) {
          this.$vux.toast.text('请输入密码', 'middle')
        } else if (!this.passwordTwo) {
          this.$vux.toast.text('请输入确认密码', 'middle')
        } else if (this.password != this.passwordTwo) {
          this.$vux.toast.text('密码不一致', 'middle')
        }
      }
    },
    toProtocolPage () {
      this.$router.push({
        path: '/userPrivate'
      })
    },
    getmsg () { // 获取验证码
      const self = this
      this.time = 60
      if (this.checkPhone()) {
        texting({
          mobile: this.phoneNumber,
          templateCode: 'SMS_137390044',
          isLogin: 'N'
        }).then(res => {
          if (res.code == 1) {
            this.$vux.toast.text(`验证码已发送至${this.phoneNumber}`, 'middle')
          } else if (res.code == 54) {
            this.$vux.alert.show({
              title: res.msg,
              onHide () {
                self.$router.go(-1)
              }
            })
          }
          this.busying = true
          this.countTime()
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
    },
    countTime () {
      if (this.time > 0) {
        setTimeout(() => {
          this.time--
          this.countTime()
        }, 1000)
      } else {
        this.busying = false
        this.time = 60
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
input {
  outline: none;
}
.registered {
  min-height: 100%;
  background: #f5f5f5;
  box-sizing: border-box;
  padding-top: 196px;
  position: relative;
  background-image: url('http://img.meiduduo.com/images/h5/login_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .registered-box {
    width: 660px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 77px 30px;
    background: rgba(255,255,255,.8);
    box-shadow:0px 7px 14px 1px rgba(255,70,145,0.06);
    border-radius:20px;
    position: relative;
    > figure {
      width: 92px;
      height: 92px;
      box-sizing: border-box;
      display: inline-block;
      border-radius: 100%;
      position: absolute;
      top: -46px;
      left: 50%;
      transform: translateX(-50%);
      > img {
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: 100%;
      }
    }
    .input-box-item {
      height:90px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(153,153,153,1);
      border-radius:10px;
      line-height: 90px;
      display: flex;
      display: -webkit-flex;
      margin-bottom: 30px;
      box-sizing: border-box;
      padding: 0 30px;
      > input {
        flex: 1;
        -webkit-flex: 1;
        border: 0;
        border-radius: 10px;
        line-height: 90px;
        &::-webkit-input-placeholder {
          font-size: 26px;
          color: #BBBBBB;
        }
      }
      > span {
        font-size: 26px;
        color: #FF4691;
        margin-left: 30px;
      }
    }
    .login-btn {
      height: 90px;
      line-height: 90px;
      text-align: center;
      border-radius: 45px;
      margin-top: 49px;
      background: #CCCCCC;
      font-size: 30px;
      color: #fff;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .active-btn {
      background: #FF4691;
    }
    .info {
      font-size: 18px;
      color: #333333;
      text-align: center;
      > span {
        color: #FF4691;
      }
    }
  }
}
.back-style {
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>

