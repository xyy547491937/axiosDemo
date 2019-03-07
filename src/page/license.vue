<template>
  <div class="license-style">
    <div class="introduce-title">
      <span @click="goBack" class="title-back-icon iconfont icon-fanhui"></span>
      <span>{{ tabbarTitle }}</span>
    </div>
    <div class="item-padding"></div>
    <div class="license-item" v-for="(item, index) of contentList" :key="index">
      <span class="license-bg" :style="{backgroundImage: `url(${item.url})`}"></span>
      <span class="license-label">{{ item.name }}</span>
    </div>
  </div>
</template>
<script>
const navigatorInfo = navigator.userAgent;
const isAndroid =
  navigatorInfo.indexOf("Android") > -1 || navigatorInfo.indexOf("Adr") > -1; //android终端
const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
  data() {
    return {
      contentList: [
        // {
        //   id: 1,
        //   name: "test",
        //   url: "http://img.meiduduo.com/images/hos_icon.png"
        // },
        // {
        //   id: 1,
        //   name: "test",
        //   url: "http://img.meiduduo.com/images/hos_icon.png"
        // },
        // {
        //   id: 1,
        //   name: "test",
        //   url: "http://img.meiduduo.com/images/hos_icon.png"
        // }
      ],
      tabbarTitle: ''
    };
  },
  created() {
    if (
      this.$route.query.type == 1 &&
      JSON.parse(this.$route.query.practiceLicense)
    ) {
      this.contentList = JSON.parse(this.$route.query.practiceLicense);
    } else if (this.$route.query.type == 2 && this.$route.query.brand) {
      this.contentList = JSON.parse(this.$route.query.brand);
    } else if (this.$route.query.type == 3 && this.$route.query.honor) {
      this.contentList = JSON.parse(this.$route.query.honor);
    }
    this.tabbarTitle = this.$route.query.title
  },
  mounted() {
    this.isCome();
  },
  methods: {
    isCome() {
      if (isAndroid) {
        window.android.doctorTalksPush(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.doctorTalksPush.postMessage(null);
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.license-style {
  width: 100%;
  min-height: 100%;
  background: #fff;
  // padding: 60px 30px 30px 30px;
  box-sizing: border-box;
  .license-item {
    margin-bottom: 54px;
    padding: 0 30px;
    .license-bg {
      display: block;
      width: 100%;
      height: 380px;
      margin-bottom: 34px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .license-label {
      width: 100%;
      display: block;
      font-size: 32px;
      color: #333333;
      font-weight: 600;
      text-align: center;
    }
  }
}
.item-padding {
  padding-top: 170px;
}
.introduce-title {
  width: 100%;
  border-bottom: 1px solid #ededed;
  height: 100px;
  text-align: center;
  color: #333;
  font-weight: 500;
  font-size: 34px;
  padding-top: 50px;
  line-height: 100px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 1;
  .title-back-icon {
    position: absolute;
    top: 100px;
    left: 25px;
    transform: translateY(-50%);
  }
}
</style>
