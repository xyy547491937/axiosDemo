<template>
  <div class="registered">
    <div class="back-style">
      <span></span>
      <!-- <span @click="back" class="iconfont icon-fanhui"></span> -->
      <span @click="toRegister">立即注册</span>
    </div>
    <div class="registered-box">
      <figure>
        <img src="http://img.meiduduo.com/images/mine/mineLogo.png" alt="">
      </figure>
      <div class="input-label">
        <span :class="{ 'active-span': activeLabel == 1 }" @click="activeLabel = 1">手机号快捷登录</span>
        <span :class="{ 'active-span': activeLabel == 2 }" @click="activeLabel = 2">账号密码登录</span>
      </div>
      <div v-if="activeLabel == 1" class="input-box-item">
        <input type="text" v-model="phoneNumber" @blur="reboundPage" placeholder="请输入您的手机号" />
        <span v-if="!busying" @click="getmsg">获取验证码</span>
        <span v-else>({{ time }}s)重新获取</span>
      </div>
      <div v-if="activeLabel == 1" class="input-box-item">
        <input type="text" @blur="reboundPage" v-model="verificationCode" placeholder="请输入您收到的验证码" />
      </div>
      <div v-if="activeLabel == 2" class="input-box-item">
        <input v-model="phoneNumberTwo" @blur="reboundPage" type="text" placeholder="请输入您的手机号" />
      </div>
      <div v-if="activeLabel == 2" class="input-box-item">
        <input v-model="password" @blur="reboundPage" type="password" placeholder="请输入密码" />
      </div>
      <div :class="{ 'active-btn': canPush }" @touchstart.stop.prevent="push" class="login-btn">登录</div>
      <p class="info">*注册即表示您同意<span @click="toProtocolPage">《胚豆用户协议》</span></p>
    </div>
  </div>
</template>
<script>
import { texting, login, queryAreaIdByCityName } from '../api/pageApi.js'
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      phoneNumber: null,
      verificationCode: null,
      busying: false,
      time: 60,
      password: null,
      phoneNumberTwo: null,
      activeLabel: 1,
      address: '',
    }
  },
  computed: {
    canPush () {
      if (this.activeLabel == 1) {
        if (this.phoneNumber && this.verificationCode) {
          return true
        } else {
          return false
        }
      } else if (this.activeLabel == 2) {
        if (this.phoneNumberTwo && this.password) {
          return true
        } else {
          return false
        }
      }
    }
  },
  created () {
    this.getLocation()
  },
  methods: {
    ...mapMutations(['saveNowUserCityId']),
    reboundPage () {
      document.activeElement.scrollIntoViewIfNeeded(true)
    },
    toRegister () {
      this.$router.push({
        path: '/registered',
        query: {
          clear_cache: Date.now()
        }
      })
    },
    push () { // 注册
      if (this.canPush) {
        let params = {
          platform: 'shop',
          terminalType: "pc"
        }
        if (this.activeLabel == 1) {
          params.loginName = this.phoneNumber
          params.verify = this.verificationCode
        } else if (this.activeLabel == 2) {
          params.loginName = this.phoneNumberTwo
          params.loginPwd = this.MD5(this.password)
        }
        login(params).then(res => {
          console.log(res)
          if (res.code == 1) {
            this.$vux.toast.text('登录成功', 'middle')
            this.$store.commit('saveNowUserInfo', res.data.user.id)
            this.$router.go(-1)
          } else {
            if (res.code == 30) {
              this.$vux.toast.text(res.msg, 'middle')
            }
          }
        })
      } else {
        if (this.activeLabel == 1) {
          if (!this.phoneNumber) {
            this.$vux.toast.text('请输入手机号', 'middle')
          } else if (!this.verificationCode) {
            this.$vux.toast.text('请输入验证码', 'middle')
          }
        } else if (this.activeLabel == 2) {
          if (!this.phoneNumberTwo) {
            this.$vux.toast.text('请输入手机号', 'middle')
          } else if (!this.password) {
            this.$vux.toast.text('请输入密码', 'middle')
          }
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
          templateCode: 'SMS_137390046',
          isLogin: 'Y'
        }).then(res => {
          if (res.code == 1) {
            this.$vux.toast.text(`验证码已发送至${this.phoneNumber}`, 'middle')
          } else if (res.code == 111) {
            this.$vux.alert.show({
              title: '账号不存在，去注册',
              onHide () {
                self.$router.push({
                  path: '/registered',
                  query: {
                    clear_cache: Date.now()
                  }
                })
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
    },
    getLocation () { // 获取当前位置所在城市
      const self = this
      //实例化城市查询类
      let citysearch = new AMap.CitySearch();
      citysearch.getLocalCity(function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
              if (result && result.city && result.bounds) {
                  // self.address = result.city
                  self.getAreaId(result.city)
              }
          }
      })
    },
    getAreaId (cityName) {
      queryAreaIdByCityName({
        areaName: cityName
      }).then(res => {
        if (res.code == 1) {
          this.saveNowUserCityId(res.data)
        }
      })
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
  padding-top: 300px;
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
      top: -150px;
      left: 50%;
      transform: translateX(-50%);
      > img {
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: 100%;
      }
    }
    .input-label {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      align-items: stretch;
      -webkit-align-items: stretch;
      margin-bottom: 30px;
      padding: 0 30px;
      > span {
        font-size: 30px;
        font-weight: 500;
        line-height: 80px;
        display: block;
        color: #333333;
        border-bottom: 2px solid transparent;
      }
      .active-span {
        border-bottom: 2px solid #FF4691;
        color: #FF4691;
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
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  font-size: 26px;
  color: #333333;
}
</style>

