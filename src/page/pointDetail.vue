<template>
  <div class="vo deposit-container">
    <!-- banner -->
    <div class="banner">
      <!-- <shopBanner :imgsrc="imgsrc"/> -->
      <swiper :list="imgsrc" :auto="true" :loop="true" height="365px" dots-position="center"></swiper>
      <div class="PD-back flex-r" @click="pageBack" v-if="0">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="PD-share flex-r" @click="shareHandle" v-if="0">
        <span class="iconfont icon-iconfontfenxiang3"></span>
      </div>
    </div>
    <div class="deposit-inner">
      <!-- 标题 -->
      <div class="deposit-title flex-r">
        <span class="pro-title">[{{pointDetail.commName }}]</span>
        <!-- <div  class="xyy-ellipsis-2"></div> -->
      </div>
      <!-- 价格 -->
      <div class="flex-r deposit-price">
        <div class="PD-num flex-r">
          <p>
            <span class="price-b">{{pointDetail.sproutPrice }}</span>
            <span class="price-item">豆芽</span>
            <a class="c c-price">￥{{pointDetail.price }}</a>
          </p>
          <!-- <a class="c c-price">￥{{pointDetail.price }}</a> -->
        </div>
        <p>
          <span>购买</span>
          <span>{{pointDetail.exchangeNum }}</span>份
        </p>
      </div>
      <!-- 我的豆芽 -->
      <!-- <div class="flex-r my-bean">
        <p> <span> 我的豆芽：</span> <span> 1500</span></p>
        <p> <span>购买</span> <span>{{pointDetail.stock }} </span> 份</p>
      </div>-->
    </div>
    <!-- 地址 -->
    <div class="addr">
      <!-- addr -->
      <h4 class="depost-addr">{{pointDetail.organName }}</h4>
      <!-- 定位 -->
      <div class="deposit-source flex-r vux-1px-b" @click="organDetail">
        <p>
          <span>地址:</span>
          <span>{{pointDetail.address}}</span>
        </p>
        <p class="felx-r location-addr">
          <!-- <i-icon type="coordinates"/> -->
          <span class="iconfont icon-dingwei1" style="color:#999"></span>
          <span class="c">{{pointDetail.distance }}</span>
        </p>
      </div>
      <!-- 有效期 -->
      <div class="c" v-if="pointDetail.isLimitTime=='1'">
        <span>有效期:</span>
        <span class="c">{{pointDetail.beginTime }}至{{pointDetail.endTime}}</span>
      </div>
    </div>
    <!-- 服务介绍 -->
    <div class="server-intro">
      <!-- 服务介绍 -->
      <div class="co xyyqg">
        <h4 class="server-title">服务介绍</h4>
        <!-- <rich-text :nodes=""></rich-text> -->
        <div class="c" v-html="pointDetail.commDesc"></div>
      </div>
      <!-- 温馨提示 -->
      <div class="co">
        <h4 class="server-title">温馨提示</h4>
        <p class="co-p">1.同一ID仅限兑换领取一次，新老用户均可领取</p>
        <p class="co-p">2.领取后请在有效期到门店进行兑换使用</p>
        <p class="co-p">3.请妥善保管自己的核销码，凭核销码到门店</p>
      </div>
      <!-- 版权声明 -->
      <div class="co">
        <h4 class="server-title">版权声明</h4>
        <p class="c co-p">
          如在胚豆发布的“胚豆网上内容”涉及知识产权争议等问题，请
          相关权利人或利害关系人与胚豆网联系。
        </p>
      </div>
      <!-- 免责声明 -->
      <div class="co">
        <h4 class="server-title">免责声明</h4>
        <!-- <p class="c co-p">
          任何信息都不能替代职业医师面对面的诊断和治疗，本网站所载的
          内容信息和数据仅供参考。
        </p>-->
        <p class="c co-p" v-if="pointDetail.organType == 1">该服务项目需您与医生当面沟通咨询方能最终确定治疗方案，本站所载内容仅供参考。</p>
        <p class="c co-p" v-else>该服务为线下服务，本站所载内容仅供参考。</p>
      </div>
    </div>
    <div class="quickChange" :class="{ 'quick-change-disabled': isNoShow }" @click="go">
      <div class="PD-sub-btn btnChange">{{btnText}}</div>
    </div>
    <div v-transfer-dom>
      <alert v-model="visible2" title="温馨提示">不在活动时间内，无法兑换</alert>
    </div>
    <div v-transfer-dom>
      <alert v-model="visible3" title="温馨提示">{{infoMessage}}</alert>
    </div>
    <div class="c" v-transfer-dom>
      <confirm v-model="visible1" title="温馨提示" @on-confirm="handleClose1">
        <p style="text-align:center;" class="modal-info">
          此次兑换将消耗
          <span style="color:#ff4691">{{pointDetail.sproutPrice}}豆芽</span>
        </p>
        <p class="c modal-info" style="text-align:center;">请确认兑换吗？</p>
      </confirm>
    </div>

    <!-- <i-modal title="温馨提示" :visible="visible1" @iclick="modalClick" :actions="actions">
      <view class="modal-info">此次兑换将消耗
        <text class="c" style="color:#ff4691">{{pointDetail.sproutPrice}}</text>豆芽
      </view>
      <view class="modal-info">请确认兑换吗？</view>
    </i-modal>

    <i-modal title="温馨提示" :visible="visible2" :show-cancel="false" @ok="handleOk">
      <view class="modal-info">不在活动时间内，无法兑换</view>
    </i-modal>


    <i-modal title="温馨提示" :visible="visible3" :show-cancel="false" @ok="handleOk1">
      <view class="modal-info">{{ infoMessage }}</view>
    </i-modal>

    <i-modal title="温馨提示" :visible="visible4" :show-cancel="false" @ok="visible4 = false">
      <view class="modal-info">商品库存不足，无法兑换</view>
    </i-modal>-->
    <!-- 调到登录界面 -->
    <div v-transfer-dom>
      <confirm v-model="toLoginShow" title="您当前未登录" @on-confirm="onConfirm">
        <p style="text-align:center;">是否去登录</p>
      </confirm>
    </div>
    <!-- 弹出框 -->
    <toast v-model="successPoint" type="success" text="兑换成功"/>
    <Alert v-model="toDefaultBrowser">点击右上角选择在浏览器打开~~</Alert>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { Swiper, Confirm, Alert, TransferDom, Toast } from "vux";
import { http } from "../api/pageApi.js";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
  data() {
    return {
      show: true,
      imgsrc: [],
      pointDetail: {},
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      infoMessage: "",
      toLoginShow: false,
      shared: false,
      toDefaultBrowser: false,
      successPoint: false,
      actions: [
        {
          name: "取消",
          color: "#007AFF"
        },
        {
          name: "确定",
          color: "#007AFF"
        }
      ],
      isNoShow: false,
      btnText: "立即兑换",
      userId: -1
    };
  },
  created() {
    this.saveStore();
    this.saveTokenStore();
    this.shared = Number(this.$route.query.share);
    if (Number(this.$route.query.isNoShow) == 1) {
      //不在活動時間內
      this.isNoShow = true;
    } else {
      this.isNoShow = false;
    }
    // alert(this.$route.query);
  },
  components: {
    Swiper,
    Alert,
    Confirm,
    TransferDom,
    Toast
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState(["userInfo", "shareInfo"])
  },

  mounted() {
    this.$nextTick(() => {
      this.visible1 = false;
      console.log(this.$route.query);

      this.getPointDetail();
    });
  },
  methods: {
    ...mapMutations(["saveUserId", "saveToken"]),
    saveStore() {
      if (this.$route.query.userId == -1) {
        this.saveUserId("");
      } else {
        this.saveUserId(this.$route.query.userId);
      }
    },
    saveTokenStore() {
      if (this.$route.query.token == -1) {
        this.saveToken("");
      } else {
        this.saveToken(this.$route.query.token);
      }
    },
    go() {
      // isNoShow ? alertInfo() : alertBox()
      // console.log(typeof this.$root.$mp.query.isNoShow);
      // console.log(this.isNoShow);
      if (!this.checkSource()) {
        return false;
      }
      if (this.$route.query.point <= this.pointDetail.sproutPrice) {
        // this.btnText = "积分不足,去攒积分";getIntegral
        // this.changeJump("/pagesMine/integrateSearch");
        // 跳转到赞豆芽页面

        if (isAndroid) {
          window.android.getIntegral(null);
        }
        if (isiOS) {
          window.webkit.messageHandlers.getIntegral.postMessage(null);
        }
      } else {
        if (this.pointDetail.exchangeNum == this.pointDetail.stock) {
          this.alertWarning();
          // this.btnText = "库存不足";
        } else {
          //表示不在活動時間內
          if (this.isNoShow) {
            this.alertInfo();
          } else {
            this.alertBox();
          }
        }
      }
    },
    organDetail() {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
      }
      if (!this.checkSource()) {
        return;
      }

      if (this.$route.query.userId == -1 || this.userId == -1) {
        this.toLoginShow = true;
        return;
      }
      if (isAndroid) {
        window.android.organDetail(
          JSON.stringify({ organId: this.pointDetail.organId })
        );
      }
      if (isiOS) {
        window.webkit.messageHandlers.organDetail.postMessage({
          organId: this.pointDetail.organId
        });
      }
    },
    onConfirm() {
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid) {
        window.android.toLogin(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.toLogin.postMessage(null);
      }
    },
    // 获取商品详情
    getPointDetail() {
      http("pointCommodity/queryById", {
        isLimitTime: this.$route.query.isLimitTime,
        activityId: this.$route.query.activityId,
        id: this.$route.query.id,
        // longitude: this.$store.state.longitude,
        // latitude: this.$store.state.latitude

        longitude: this.$route.query.lng || "",
        latitude: this.$route.query.lat || ""
      }).then(res => {
        if (res.code == 1) {
          let a = res.data;
          let imgsrc = a.commImg.split(",");

          a.distance = a.distance
            ? Number(a.distance).toFixed(2) + "km"
            : "距离太远";
          const demoList = imgsrc.map((one, index) => ({
            url: "javascript:",
            img: one
          }));
          this.imgsrc = demoList;
          this.pointDetail = res.data;
          // console.log(this.pointDetail.distance);

          if (this.$route.query.point <= this.pointDetail.sproutPrice) {
            this.btnText = "豆芽不足,去攒豆芽";
          } else {
            if (this.pointDetail.exchangeNum >= this.pointDetail.stock) {
              // this.alertWarning();
              this.btnText = "库存不足";
            } else {
              this.btnText = "立即兑换";
            }
          }
        }
      });
    },

    //保存积分订单
    savePointOrder() {
      const {
        organId,
        price,
        sproutPrice,
        commType,
        commImg,
        commName,
        isLimitTime,
        organPointActivity,
        unit,
        pointActivityId
      } = this.pointDetail;

      http("pointOrder/save", {
        organId,
        custId: this.userInfo.custId,
        pointCommodityId: this.pointDetail.id,
        price,
        commImg,
        exchangePoint: sproutPrice,
        commType,
        commName,
        isLimitTime,
        organPointActivity,
        pointActivityId,
        unit,
        token: this.userInfo.token
        // mobile: this.userInfo.mobile
      }).then(res => {
        console.log(res);
        if (res.code == -2) {
          this.infoMessage = res.msg;
          this.visible3 = true;
        }
        if (res.code == 1) {
          this.successPoint = true;
          setTimeout(() => {
            if (isAndroid) {
              window.android.checkDetail(JSON.stringify({ orderId: res.data }));
            }
            if (isiOS) {
              window.webkit.messageHandlers.checkDetail.postMessage({
                orderId: res.data
              });
            }
          }, 2000);
        }
      });
    },
    // 返回
    pageBack() {
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid) {
        window.android.back(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.back.postMessage(null);
      }
    },
    shareHandle() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        name: this.pointDetail.commName,
        description: this.pointDetail.commDesc,
        imageUrl: this.imgsrc[0].img
      };
      console.log(params);
      if (isAndroid) {
        window.android.share(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.share.postMessage(params);
      }
    },

    alertBox() {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
      }
      if (this.$route.query.userId != -1 || this.userId != -1) {
        this.visible1 = true;
      } else {
        this.toLoginShow = true;
      }
    },
    handleClose1() {
      this.visible1 = !this.visible1;
      this.savePointOrder();
    },

    alertInfo() {
      this.visible2 = true;
    },
    handleOk() {
      this.visible2 = false;
    },
    handleOk1() {
      this.visible3 = false;
    },

    alertWarning() {
      this.visible4 = true;
    },
    checkSource() {
      const self = this;
      if (!this.shared) {
        return true;
      } else {
        let a = this.checkWeiXin();
        const navigatorInfo = navigator.userAgent;
        const isAndroid =
          navigatorInfo.indexOf("Android") > -1 ||
          navigatorInfo.indexOf("Adr") > -1; //android终端
        const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (!a) {
          if (isAndroid) {
            window.location.href = this.shareInfo.androidScheme;
            setTimeout(() => {
              window.location.href = self.shareInfo.androidDownload;
            }, 500);
          }
          if (isiOS) {
            window.location.href = this.shareInfo.iosScheme;
            setTimeout(() => {
              window.location.href = self.shareInfo.iosDownload;
            }, 500);
          }
        } else {
          window.location.href =
            "http://img.meiduduo.com/h5/download.html?path=main";
        }
        return false;
      }
    },
    checkWeiXin() {
      // 是否在微信浏览器打开
      const navigatorInfo = navigator.userAgent.toLowerCase();
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
      //   // this.toDefaultBrowser = true;
      //   return true;
      // } else {
      //   return false;
      // }
    }
  }
};
</script>
<style lang="css">
.xyyqg img {
  max-width: 100%;
  display: block;
  height: auto;
  margin: 0 auto;
}
.weui-dialog__btn_primary {
  color: #ff4691 !important;
}
</style>
<style lang="less" scoped>
@import url("../style/style.less");
.banner-img {
  max-width: 100%;
  height: auto;
  display: block;
}
.baseconfig {
  padding: 10px @basePadding;
  background-color: @base-white;
  margin-bottom: 10px;
}

.deposit-container {
  padding-top: 0;
  font-size: @baseSize*2;
  color: @co6;
  padding-bottom: 80px;

  & > .deposit-inner {
    &:extend(.baseconfig);

    & .deposit-title {
      margin-bottom: 10px;
      color: @baseFirstTitleColor;

      & > .pro-title {
        font-weight: bold;
      }
    }

    & .deposit-price {
      // margin-bottom: 10px;
      color: @baseTextColor-c;

      font-size: 12px * 2s;
      justify-content: space-between;
      align-items: baseline;
      & > .PD-num {
        align-items: flex-end;
        font-size: 24px;
        color: #999999;
        & > p {
          color: @baseColor;

          & > .price-b {
            font-size: 48px;
          }
        }

        & > a {
          // font-size: 12px;
          text-decoration: line-through;
          color: @baseTextColor-c;
          margin-left: 15px;
        }
      }

      & > a {
        // font-size: 12px;
        text-decoration: line-through;
        color: @baseTextColor-c;
        margin-left: 15px;
      }
    }

    // 我的豆芽
    & .my-bean {
      margin-bottom: 10px;
      font-size: 12px;
      justify-content: space-between;
      color: @baseTextColor-c; //#999
    }
  }

  // 地址
  & > .addr {
    &:extend(.baseconfig);
    font-size: 12px * 2;

    & > .depost-addr {
      font-size: @baseSize*2;
      // color: @baseFirstTitleColor;
      color: #333;
      font-weight: bold;
    }

    & > .deposit-source {
      justify-content: space-between;
      // border-bottom: 1px solid #ddd;
      padding: 10px 0;
      margin-bottom: 10px;
      font-size: 24px;
      color: #666;
      align-items: baseline;
      & > .location-addr {
        overflow: hidden;
        align-items: center;
        width: 30%;
        text-align: right;
      }
    }
  }

  & > .server-intro {
    margin-bottom: 40px;
    &:extend(.baseconfig);

    & > .co {
      margin-bottom: 50px;
      color: @baseSconedTitleColor; //#555
      line-height: 22px * 2;

      & > .server-title {
        color: @baseFirstTitleColor; //#333
        font-weight: bold;
        padding-left: 10px * 2;
        border-left: 3px * 2 solid @baseColor;
        line-height: 1;
        margin-bottom: 30px;
        font-size: 26px;
      }
    }
  }
  // 立即兑换
  & .quickChange {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    & > .btnChange {
      width: 100%;
      border-radius: 0;
      height: 100px;
      line-height: 100px;
    }
  }
}

.server-title {
  color: @baseFirstTitleColor;
}
.c-price {
  color: #999999;
  text-decoration: line-through;
}
.price-item {
  display: inline-block;
  margin: 0 23px 0 11px;
}
.co-p {
  color: #555;
  font-size: 24px;
}
.modal-info {
  font-size: 28px;
  color: #333;
  font-weight: 400;
  line-height: 48px;
}
.quick-change-disabled {
  background: rgba(255, 70, 145, 0.6) !important;
}
.active {
  background-color: #ddd;
}
.banner {
  position: relative;
}
.PD-back,
.PD-share {
  top: 60px;
  position: absolute;
  width: 60px;
  height: 60px;
  color: @base-white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}
.PD-back {
  left: 30px;
}
.PD-share {
  right: 30px;
}
</style>
