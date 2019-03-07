<template>
  <!-- <div v-if="false">
    <ul>
      <li v-for="item in severData" :key="item.id" @click="projectJump(item)">
        // ! delete
        <img src :style="{ backgroundImage: `url(${item.commImg.split(',')[0]})` }" alt>
        <span class="comm-img" :style="{backgroundImage: `url(${item.commImg.split(',')[0]})`}"></span>
        <span class="xyy-ellipsis-2">{{item.commName}} {{item.remark}}</span>
        <span>{{item.organName}}</span>
        <div class="price">
          <span>￥{{item.rulePrice}}</span>
          <span>¥{{item.price}}</span>
        </div>
        <span>{{item.buyNum}}人购买</span>
        <div class="sever-icon">
          <span id class="icon fen" v-if="item.isStage">分</span>
          <span id class="icon bao">保</span>
          <span id class="icon fen" v-if="item.isRecommend">推</span>
        </div>
      </li>
    </ul>
    <div v-if="severData.length == 0" class="nodata">
      <figure>
        <img src="http://img.meiduduo.com/images/nodata.png" alt>
      </figure>
    </div>
  </div> -->
  <!-- <div>
    <div>
      <div
        v-for="item in severData"
        class="item-list-organ-server"
        :key="item.id"
        @click="projectJump(item)">
        <span class="comm-img" :style="{backgroundImage: `url(${item.commImg.split(',')[0]})`}"></span>
          <span class="xyy-ellipsis-2">{{item.commName}} {{item.remark}}</span>
          <span>{{item.organName}}</span>
          <div class="price">
            <span>￥{{item.rulePrice}}</span>
            <span>¥{{item.price}}</span>
          </div>
          <span>{{item.buyNum}}人购买</span>
          <div class="sever-icon">
            <span id class="icon fen" v-if="item.isStage">分</span>
            <span id class="icon bao">保</span>
            <span id class="icon fen" v-if="item.isRecommend">推</span>
          </div>
      </div>
    </div>
    <div v-if="severData.length == 0" class="nodata">
      <figure>
        <img src="http://img.meiduduo.com/images/nodata.png" alt>
      </figure>
    </div>
  </div> -->
  <div class="organ-server-card-box" v-if="severData.length > 0">
    <div
      class="item-card"
      v-for="item in severData"
      :key="item.id"
      @click="projectJump(item)"
      >
      <span class="item-card-img" :style="{backgroundImage: `url(${item.commImg.split(',')[0]})`}"></span>
      <div>
        <span class="card-title xyy-ellipsis-2">{{item.commName}} {{item.remark}}</span>
        <span class="card-address">{{item.organName}}</span>
        <div class="card-price">
          <span>￥{{item.rulePrice}}</span>
          <span>¥{{item.price}}</span>
        </div>
        <div class="card-footer">
          <span class="icon fen" v-if="item.isStage">分</span>
          <span class="icon bao">保</span>
          <span class="icon fen" v-if="item.isRecommend">推</span>
          <span class="buy-number">{{item.buyNum}}人购买</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="nodata">
    <figure>
      <img src="http://img.meiduduo.com/images/nodata.png" alt>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    severData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 商品列表点击跳转
    projectJump(val) {
      let params = {
        commId: val.id,
        commName: val.commName,
        remark: val.remark,
        commImg: val.commImg
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.hotProjectDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.hotProjectDetail.postMessage(params);
      }
    }
  }
};
</script>

<style scoped lang="less">
.nodata {
  background: #fff;
  height: 450px;
  > figure {
    display: block;
    margin: 0 auto;
    width: 192px;
    padding-top: 50px;
    > img {
      width: 100%;
    }
  }
}

.xyy-ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.organ-server-card-box {
  background-color: #fff;
  padding: 24px;
  > div {
    margin-bottom: 40px;
  }
  > div:last-child {
    margin-bottom: 0;
  }
}
.item-card {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  .item-card-img {
    width: 200px;
    height: 200px;
    display: block;
    border-radius: 10px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 22px;
  }
  > div {
    flex: 1;
    -webkit-flex: 1;
    > .card-title {
      font-size: 30px;
      color: #333;
    }
    > .card-address {
      font-size: 26px;
      color: #999;
    }
    > .card-price {
      > span:first-child {
        font-size: 32px;
        color: #FC4396;
        margin-right: 15px;
      }
      > span:last-child {
        font-size: 24px;
        color: #999999;
      }
    }
    > .card-footer {
      display: flex;
      display: -webkit-flex;
      align-items: flex-end;
      -webkit-align-items: flex-end;
      .icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 5px;
        color: #fff;
        font-size: 22px;
        line-height: 32px;
        box-sizing: border-box;
        margin-left: 8px;
        text-align: center;
      }
      .fen {
        background: rgba(250, 151, 230, 1);
      }
      .bao {
        background: rgba(123, 219, 207, 1);
      }
      .buy-number {
        font-size: 24px;
        color: #999;
        flex: 1;
        -webkit-flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
