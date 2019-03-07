<template>
  <div class="introduce-info">
    <div class="introduce-title">
      <span @click="goBack" class="title-back-icon iconfont icon-fanhui"></span>
      <span>机构简介</span>
    </div>
    <div class="introduce-list">
      <p class="title">{{organName}}</p>
      <p class="introduce-word">资质：{{aptitude}}</p>
      <p class="introduce-word">电话：{{tel}}</p>
      <p class="introduce-word">地址：{{address}}</p>
    </div>
    <div class="introduce-page">
      <span class="title">机构简介</span>
      <span class="introduce-word organ-content" v-html="introduce"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      organName: this.$route.query.organName,
      aptitude: this.$route.query.aptitude,
      tel: this.$route.query.tel,
      address: this.$route.query.address,
      introduce: this.$route.query.introduce
    };
  },
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    isCome() {
      if (isAndroid) {
        window.android.doctorTalksPop(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.doctorTalksPop.postMessage(null);
      }
    }
  },
  mounted() {
    this.isCome();
  }
};
</script>
<style lang="css">
.organ-content img {
  display: block;
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
<style scoped lang="less">
.introduce-page img {
  display: block;
  max-width: 100%;
  height: auto;
  overflow: hidden;
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
.introduce-info {
  position: relative;
  background: #f5f5f5;
  min-height: 200px;
  // width: 100%;
  // background: #fff;
  .title {
    height: 70px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
  }
  .introduce-list {
    background: #fff;
    padding: 170px 40px 20px 40px;
  }
  .introduce-page {
    background: #fff;
    padding: 40px 40px 20px 40px;
    margin-top: 20px;
  }
  .introduce-word {
    margin-top: 10px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 38px;
  }
  > span {
    display: block;
    margin-left: 40px;
  }
}
</style>
