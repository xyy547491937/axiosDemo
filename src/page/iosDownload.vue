<template>
  <div class="download-page">
    <h1>胚豆</h1>
    <figure>
      <img src="http://img.meiduduo.com/images/mine/mineLogo.png" alt="">
    </figure>
    <p @click="checkSource">跳转至App Store/应用平台下载</p>
    <div>{{ nowUrl }}</div>
    <Alert v-model="infoModal">点击右上角选择在浏览器打开~~</Alert>
    <confirm
      v-model="downloadConfirm"
      title="去下载？"
      @on-cancel="downloadConfirm = false"
      @on-confirm="toDownload"
    >
    </confirm>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { Alert, Confirm } from 'vux'
export default {
  data () {
    return {
      infoModal: false,
      downloadConfirm: false,
      toUrl: ''
    }
  },
  components: {
    Alert,
    Confirm
  },
  computed: {
    ...mapState(['shareInfo']),
    nowUrl () {
      return window.location.href
    }
  },
  methods: {
    checkSource () {
      const self = this
      let a = this.checkWeiXin()
      const navigatorInfo = navigator.userAgent
      const isAndroid = navigatorInfo.indexOf('Android') > -1 || navigatorInfo.indexOf('Adr') > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (!a) { // 原生浏览器内处理逻辑
        if (isAndroid) {
          window.location.href = this.shareInfo.androidScheme
          setTimeout(() => {
            this.downloadConfirm = true
            this.toUrl = self.shareInfo.androidDownload
            // window.location.href = self.shareInfo.androidDownload
          }, 1000)
        }
        if (isiOS) {
          window.location.href = this.shareInfo.iosScheme
          setTimeout(() => {
            this.downloadConfirm = true
            this.toUrl = self.shareInfo.iosDownload
            // window.location.href = self.shareInfo.iosDownload
          }, 1000)
        }
      } else { // 微信浏览器内处理逻辑
        if (isAndroid) {
          window.location.href = self.shareInfo.androidDownload
        }
        if (isiOS) {
          this.infoModal = true
        }
      }
    },
    checkWeiXin () { // 是否在微信浏览器打开
      const navigatorInfo = navigator.userAgent.toLowerCase()
      if (navigatorInfo.match(/WeiBo/i) == "weibo") {
        return true
      } else if (navigatorInfo.match(/QQ/i) == "qq") {
        return true
      } else if (navigatorInfo.match(/MicroMessenger/i) == "micromessenger") {
        return true
      } else {
        return false
      }
      // if (navigatorInfo.match(/MicroMessenger/i) == "micromessenger") {
      //   return true
      // } else {
      //   return false
      // }
    },
    toDownload () { // 去下载
      window.location.href = this.toUrl
    }
  }
}
</script>
<style lang="less" scoped>
.download-page {
  min-height: 100%;
  box-sizing: border-box;
  padding: 100px 60px;
  background: #f5f5f5;
  > h1 {
    font-size: 40px;
    color: #333;
    text-align: center;
  }
  > figure {
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    margin: 100px auto 200px;
    > img {
      width: 100%;
      height: 100%;
      box-sizing: inline-block;
    }
  }
  > p {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 32px;
    color: #fff;
    background-color: #FF4691;
    box-shadow: 0 5px 10px 0 #FF4691;
    text-align: center;
    border-radius: 100px;
  }
}
</style>
