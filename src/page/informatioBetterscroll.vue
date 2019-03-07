<template>
  <div>
    <vue-better-scroll
      style="height:300px"
      class="wrapper"
      ref="scroll"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      :startY="parseInt(startY)"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
    >
      <ul ref="list" class="list-content">
        <li class="list-item" v-for="item in items" :key="item">{{item}}</li>
      </ul>
    </vue-better-scroll>
  </div>
</template>
<script>
import VueBetterScroll from "vue2-better-scroll";

let count = 1;
export default {
  name: "app",
  components: { VueBetterScroll },
  data() {
    return {
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: []
    };
  },
  mounted() {
    this.onPullingDown();
  },
  methods: {
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    // 模拟数据请求
    getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          const arr = [];
          for (let i = 0; i < 20; i++) {
            arr.push(count++);
          }
          resolve(arr);
        }, 1000);
      });
    },
    onPullingDown() {
      // 模拟下拉刷新
      console.log("下拉刷新");
      count = 0;
      this.getData().then(res => {
        this.items = res;
        this.$refs.scroll.forceUpdate(true);
      });
    },
    onPullingUp() {
      // 模拟上拉 加载更多数据
      console.log("上拉加载");
      this.getData().then(res => {
        this.items = this.items.concat(res);
        if (count < 50) {
          this.$refs.scroll.forceUpdate(true);
        } else {
          this.$refs.scroll.forceUpdate(false);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.flex-r {
  display: flex;
  flex-direction: row;
}
input,
textarea {
  -webkit-appearance: none;
  outline: none;
  outline-color: transparent;
}
input:not([type="checkbox"]) {
  box-shadow: none;
  -webkit-appearance: none;
}
.information {
  font-family: PingFangSC-Regular;
}
.main {
  padding: 0 24px 0;
  margin-top: 31px;
  margin-bottom: 100px;
  padding-bottom: 200px;
}
.title {
  font-size: 38px;
  color: #333;
  font-weight: bold;
  font-family: PingFangSC-Regular;
  margin-bottom: 44px;
  margin-top: 33px;
}
.infor_top_detail {
  margin-top: 40px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-bottom: 48px;
  justify-content: space-between;
  align-items: center;
}
.detail_left {
  display: flex;
  align-items: center;
}
.detail_left .head {
  width: 112px;
  height: 112px;
  // display: inline-block;
  float: left;
  margin-right: 20px;
  img {
    width: 100%;
    border-radius: 50%;
    height: 100%;
  }
}
.detail_name {
  min-width: 100px;
  height: 62px;
}
.detail_name em {
  font-style: normal;
  display: block;
}
.detail_name > .detail_source {
  font-size: 36px;
  color: #333333;
  font-weight: 700;
}
.detail_name > .detail_fromNow {
  font-size: 24px;
  color: #cccccc;
}
.follow {
  width: 110px;
  height: 36px;
  background: rgba(255, 70, 145, 1);
  border-radius: 20px;
  border: 1px solid rgba(255, 70, 145, 1);
  font-size: 28px;
  padding: 8px;
  color: #fff;
  text-align: center;
  line-height: 36px;
}
.follow.focus {
  background: #fff;
  color: rgba(255, 70, 145, 1);
}
.content {
  font-family: PingFangSC-Light;
  font-size: 28px;
  color: #333333;
  width: 100%;
  position: relative;
  img {
    width: 100%;
  }
}
.content p {
  font-size: 24px;
  line-height: 50px;
  margin-bottom: 50px;
}
.operation {
  display: flex;
  display: -webkit-flex;
  /* justify-content: space-between; */
  justify-content: center;
  padding: 20px 10px;
}
.operation1 {
  width: 152px;
  height: 55px;
  padding: 0 10px 60px;
  margin: 0 auto;
}
.operation span,
.operation1 span {
  display: inline-block;
  width: 152px;
  height: 55px;
  border: 1px solid #ccc;
  border-radius: 28px;
  font-size: 24px;
  color: #999;
  line-height: 55px;
  text-align: center;
}
.operation .fabulous {
  /* margin-right: 120px; */
}
.icon-zanok {
  color: #ff4691;
}
.operation .binding-bg {
  width: 30px;
  height: 30px;
  display: inline-block;
}
.operation span img,
.operation1 span img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 11px;
}
.review_main {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.review_head,
.review_head .head {
  width: 67px;
  height: 68px;
  border-radius: 50%;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
.review_content {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding-left: 25px;
}
.review_title {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.review_matter2 {
  margin-top: 10px;
}
.review_title > span {
  -webkit-box-flex: 0.5;
  -webkit-flex: 0.5;
  flex: 0.5;
}
.review_name {
  font-size: 24px;
  color: #0f5893;
  height: 29px;
  line-height: 29px;
}
.review_title > .review_num {
  text-align: right;
  height: 29px;
  line-height: 29px;
  em {
    font-style: normal;
  }
}
.review_num > img {
  display: inline-block;
}
.review_num > em {
  color: #cccccc;
  line-height: 29px;
  display: inline-block;
  padding-left: 5px;
  font-size: 26px;
}
.review_matter {
  font-size: 24px;
  color: #333333;
  line-height: 45px;
  word-break: break-all;
}
.review_other span {
  display: inline-block;
  height: 52px;
  line-height: 52px;
  color: #b4b4b4;
  font-size: 24px;
}
.review_other span.detailC {
  padding: 0 22px;
}
/* 返回顶部样式 */
.toTop {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  position: fixed;
  bottom: 116px;
  right: 16px;
  z-index: 20;
  border-radius: 100% 100%;
  border: 1px solid #cccccc;
  -moz-box-shadow: 0 0 10px 0 #ccc;
  -webkit-box-shadow: 0 0 10px 0 #ccc;
  box-shadow: 0 0 10px 0 #ccc;
  padding-top: 50px;
  background: #fff url("http://img.meiduduo.com/images/topArr.png") no-repeat
    center 0.16rem;
  background-size: 26px 28px;
  text-align: center;
  font-size: 22px;
  color: #333333;
}
/* 回复样式 */
.child-content {
  overflow: hidden;
  background: #f6f6f6;
  padding: 10px 24px;
  font-size: 24px;
  border-radius: 10px;
}

.child-content div {
  clear: both;
}

.child-content .child-name {
  float: left;
  color: #3f6ba6;
}

.child-text {
  float: left;
  color: #666;
}
.content {
  & > .live-box {
    // max-height: 165px;
    width: 100%;
    margin-bottom: 50px;
    & > .live {
      width: 100%;
      height: 100%;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }

      & > .pause {
        width: 60px;
        height: 60px;
        display: block;
        background-image: url("http://img.meiduduo.com/images/info/play.png");
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        margin-top: -30px;
        margin-left: -30px;
        background-position: center;
      }
    }
    & > .article-img {
      width: 100%;
      & > .gride-2 {
        // width: 50%;
        flex: 1;
        border-radius: 10px;
        // max-height: 165px;
        overflow: hidden;
        & > img {
          //   box-shadow: 10px 10px 5px #888888;

          display: block;
          max-width: 100%;
          height: auto;
          width: 100%;
        }
      }
    }
  }
}
</style>
