<template>
  <div class="about">
    <div class="img">
      <img src="http://img.meiduduo.com/images/mine/mineLogo.png" alt width="100%">
    </div>
    <span class="about-content z-textIndent-7-percent" style="text-indent:30px;">
      <span>胚豆APP</span>
      <span>，国内著名医美行业移动互联网平台。在此平台上，您可以看到专业的整形百科知识，可以直接与医生私信问答，可以在线预约美容项目、整形等相关服务。还可以看到来自全国各地的爱美人士的变美分享日记......</span>
    </span>
    <span class="about-info">
      <span>欢迎爱美的亲们来到这里，</span>
      <br>
      <span>绽放你的美！</span>
    </span>
    <span class="about-line">技术支持: 胚豆智能科技（武汉）有限公司</span>
    <!-- <web-view src="https://t.bestsign.info/9u8U/cB23/NBrF/"></web-view> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.about {
  height: 100%;
  /* box-sizing: border-box; */
  text-align: center;
}
.about > .img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: auto;
  padding-top: 55px;
  margin-bottom: 77px;
  /* background: url('http://img.meiduduo.com/images/mine/mineLogo.png') no-repeat; */
  /* background-size: cover; */
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.about-content {
  font-size: 26px;
  color: #999999;
  width: 572px;
  text-align: left;
  display: inline-block;
  // text-align: justify;
  text-align: left;
  margin-bottom: 153px;
  line-height: 72px;
}
.about-content > span:first-child {
  color: #ff4691;
}
.about-info {
  color: #ff4691;
  min-width: 435px;
  text-align: center;
  display: inline-block;
  line-height: 72px;
  margin-bottom: 179px;
}
.about-info > span:first-child {
  font-size: 36px;
}
.about-info > span:last-child {
  font-size: 48px;
}
.about-line {
  font-size: 24px;
  color: #999999;
  width: 100%;
  display: inline-block;
  // position: absolute;
  // bottom: 48px;
  // left: 0;
}
</style>
