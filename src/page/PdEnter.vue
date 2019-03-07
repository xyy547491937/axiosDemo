<template>
  <div>
    <div class="enter">
      <div class="img-box">
        <!-- <img v-for="v in 8" :key="v" :src="`http://img.meiduduo.com/images/h5/enter_${v}.png`" alt> -->
        <span
          v-for="v in 8"
          :key="v"
          :class="`span${v}`"
          :style="{ backgroundImage: `url(http://img.meiduduo.com/images/h5/enter_${v}.png)` }"
        ></span>
      </div>

      <div class="enter_btn" @click="goEnter">立即申请</div>
    </div>
  </div>
</template>
<script>
const navigatorInfo = navigator.userAgent;
const isAndroid =
  navigatorInfo.indexOf("Android") > -1 || navigatorInfo.indexOf("Adr") > -1; //android终端
const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
  methods: {
    goEnter() {
      if (isAndroid) {
        window.android.apply(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.apply.postMessage(null);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.enter {
  min-height: 100%;
  position: relative;
  padding-bottom: 100px;
  & > .img-box {
    // margin-bottom: 100px;
    & > img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    & > span {
      max-width: 100%;
      display: block;
      background-size: 100%;
      background-repeat: no-repeat;
      margin-bottom: -2px;
    }
    & > .span1 {
      height: 474px;
    }
    & > .span2 {
      height: 426px;
    }
    & > .span3 {
      height: 462px;
    }
    & > .span4 {
      height: 508px;
    }
    & > .span5 {
      height: 434px;
    }
    & > .span6 {
      height: 392px;
    }
    & > .span7 {
      height: 332px;
    }
    & > .span8 {
      height: 377px;
    }
  }
  & > .img-box::after {
    content: "";
    display: table;
  }

  .enter_btn {
    // margin-top: 150px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffc331;
    text-align: center;
    line-height: 100px;
    width: 100%;
    height: 100px;
    font-size: 40px;
    color: #ff4674;
    font-weight: bold;
  }
}
</style>
