<template>
  <div class="doctor-detail">
    <div class="doctor-icon box-margin-bottom">
      <span v-if="0" @click="back" class="details-back iconfont icon-fanhui">
        <!-- <img src="/static/back.png" alt=""> -->
      </span>
      <span v-if="0" @click="share" class="details-share iconfont icon-iconfontfenxiang3">
        <!-- <img src="/static/share_icon.png" alt=""> -->
      </span>
      <figure>
        <img src="" :style="{ backgroundImage: `url(${servicePersonalData.photo})` }" alt>
      </figure>
      <div class="doctor-icon-info">
        <p>
          <span>{{ servicePersonalData.personalName }}</span>
          <span
            @click.stop="focus(servicePersonalData.isFollow)"
            v-if="!servicePersonalData.isFollow"
          >+ 关注</span>
          <span @click.stop="focus(servicePersonalData.isFollow)" v-else>已关注</span>
        </p>
        <p>{{ servicePersonalData.technicalName }} 从业{{ servicePersonalData.workingSeniority }}</p>
      </div>
    </div>
    <div class="doctor-info box-margin-bottom">
      <div
        v-if="servicePersonalData.fieldsName && servicePersonalData.fieldsName.length > 0"
        class="good-at common-box-style box-margin-bottom"
      >
        <span>擅长：</span>
        <div>
          <span
            v-for="(item, index) of servicePersonalData.fieldsName"
            :key="index"
            class="doctor-tags-style"
          >{{ item }}</span>
        </div>
      </div>
      <div class="introduction">
        <span>简介：</span>
        <div>
          <span v-if="!introduceShowAll" v-html="servicePersonalData.introducePart"></span>
          <span v-else v-html="servicePersonalData.introduce"></span>
          <span @click="introduceShow">{{ !introduceShowAll ? '更多' : '收起' }}></span>
        </div>
      </div>
    </div>
    <div v-if="servicePersonalData.organType == 1" @click="checkSource" class="doctor-messages box-margin-bottom">
      <span>医生说说</span>
      <span class="iconfont icon-Right"></span>
    </div>
    <div v-if="comments.length > 0 && servicePersonalData.staffId" class="doctor-commtents box-margin-bottom">
      <div class="commtents-header">
        <div>
          <rater v-model="star" active-color="#FEB259" :font-size="15" disabled></rater>
          <span>{{ star }}分</span>
        </div>
        <span @click.stop="checkSource">{{ commentNumber }}条评价></span>
      </div>
      <div class="commtents-box">
        <div class="commtents-item">
          <div class="common-box-style box-border-bottom">
            <img :src="comments[0].icon" alt>
            <div>
              <p>
                <span>{{ comments[0].custName }}</span>
                <span>{{ comments[0].createDate }}</span>
              </p>
              <p>{{ comments[0].content }}</p>
            </div>
          </div>
          <div v-if="false" class="common-box-style commtent-margin-top">
            <span></span>
            <div>
              <span>2018年10月25日发布追评</span>
              <span>胸小的姐妹真的要找一个靠谱的医生来做，我真的推荐张 智勋医生。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="toOrganPage" class="organ-info box-margin-bottom">
      <!-- <img src="http://img.meiduduo.com/images/hos_icon.png" alt=""> -->
      <span class="organ-name-info">{{ servicePersonalData.organName }}</span>
      <!-- <img src="/static/bg.png" alt=""> -->
      <span class="iconfont icon-Right"></span>
    </div>
    <div class="product-case box-margin-bottom">
      <p class="product-box-label">客户案例</p>
      <div class="product-box-main">
        <div
          v-if="index < 1"
          v-for="(item, index) of exampleList"
          :key="index"
          class="product-box-item"
          @click.stop="checkSource"
        >
          <div class="product-imgs">
            <div>
              <img src="" :style="{ backgroundImage: `url(${item.preFirstPhoto})` }" alt>
            </div>
            <div>
              <img src="" :style="{ backgroundImage: `url(${item.afterFirstPhoto})` }" alt>
            </div>
          </div>
          <p class="product-user-info">
            <img src="" :style="{ backgroundImage: `url(${item.authorIcon})` }" alt>
            <span>{{ item.authorName }}</span>
          </p>
          <p class="product-content z-lines-2-overflow-hidden">
            <span v-html="item.diaryContent"></span>
            <span>{{ showAllContent ? '全文' : '' }}</span>
          </p>
          <p class="product-tag-info">
            <img src="" :style="{ backgroundImage: `url('http://img.meiduduo.com/images/h5/question2.png')` }" alt>
            <span>{{ item.tagName }}</span>
          </p>
          <p class="product-price-info">
            <img src="" :style="{ backgroundImage: `url('http://img.meiduduo.com/images/index/bye_icon.png')` }" alt>
            <span class="product-price-label">{{ item.commName }} {{ item.organName }}</span>
            <span>¥{{ item.rulePrice }}</span>
          </p>
          <p class="product-btns">
            <span>
              <img src="" :style="{ backgroundImage: `url('http://img.meiduduo.com/images/h5/view_icon.png')` }" alt>
              {{ item.readNum }}
            </span>
            <span>
              <img src="" :style="{ backgroundImage: `url('http://img.meiduduo.com/images/h5/talk_icon.png')` }" alt>
              {{ item.commentNum }}
            </span>
            <span>
              <!-- <img src="" :style="{ backgroundImage: `url('http://img.meiduduo.com/images/h5/praise_icon.png')` }" alt> -->
              赞 {{ item.fabulousNum }}
            </span>
          </p>
        </div>
      </div>
      <p @click="checkSource" class="watch-all box-border-top">查看全部 {{ exampleTotal }}个案例 ></p>
    </div>
    <div class="product-selling box-margin-bottom">
      <p class="product-box-label">我的热卖</p>
      <div v-if="hotList.length > 0" class="product-box-main">
        <div
          v-if="index < 3"
          v-for="(item, index) of hotList"
          :key="index"
          class="product-item common-box-style"
        >
          <img src="" :style="{ backgroundImage: `url(${item.commImg[0]})` }" alt>
          <div>
            <p
              class="product-item-name z-lines-2-overflow-hidden"
            >[{{ item.commName }}] {{ item.remark }}</p>
            <p class="product-item-organ">{{ item.organName }}</p>
            <p class="product-item-price">
              <span>¥{{ item.rulePrice }}</span>
              <span>¥{{ item.price }}</span>
            </p>
            <p class="product-item-info">
              <span v-if="item.distance" class="bg-color-there">{{ item.distance }}km</span>
              <span v-if="item.isStage == 1" class="bg-color-one">分</span>
              <span v-if="item.isInsurance == 1" class="bg-color-four">保</span>
              <span class="product-item-number">{{ item.buyNum }}人购买</span>
            </p>
          </div>
        </div>
      </div>
      <p @click="checkSource" class="watch-all box-border-top">查看全部 {{ hotTotal }}个特惠 ></p>
    </div>
    <div v-if="false" class="aside-btns">
      <span @click="checkSource">
        <span class="yuyue-btn">
          <!-- <img src="/static/yuyue_icon.png" alt=""> -->
        </span>
        <span>在线预约</span>
      </span>
      <span @click="checkSource">
        <span class="zixun-btn">
          <!-- <img src="/static/zixun_icon.png" alt=""> -->
        </span>
        <span>咨询</span>
      </span>
    </div>
  </div>
</template>
<script>
import { Rater, Alert } from "vux";
import {
  queryDoctorDetail,
  queryServicePersonal,
  queryStar,
  queryExampleList,
  queryHotList,
  toAttention
} from "../api/pageApi.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data42: 3,
      servicePersonalData: {}, // 服务人员数据
      comments: [], // 评论
      star: 0, // 评星
      commentNumber: 0, // 评论数量
      exampleList: [], // 案例列表
      exampleTotal: 0,
      hotList: [], // 热卖列表
      hotTotal: 0,
      introduceShowAll: false,
      toDefaultBrowser: false,
      shared: false,
      showAllContent: false,
    };
  },
  components: {
    Rater,
    Alert
  },
  computed: {
    ...mapState(["shareInfo"])
  },
  created() {
    this.shared = Number(this.$route.query.share);

    // 传参说明：id 医生id；userId 当前登录用户的id；
    // 路径：http://192.168.1.51:8080/#/doctorDetail?id=11&userId=2457

    this.query();
    this.queryExampleLists();
    this.queryHotList();
  },
  methods: {
    toDoctorSaid () {

    },
    query() {
      let params = {
        id: this.$route.query.id,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }
      if (this.$route.query.userId && this.$route.query.userId != '-1') {
        params.custId = this.$route.query.userId
      }
      queryDoctorDetail(params).then(res => {
        if (res.code === 1) {
          if (res.data.photo) {
            res.data.photo = res.data.photo.split(",")[0];
          } else {
            res.data.photo = "";
          }
          if (res.data.fieldsName) {
            res.data.fieldsName = res.data.fieldsName.split(",");
          } else {
            res.data.fieldsName = [];
          }
          if (res.data.introduce) {
            res.data.introducePart = this.dealHtmlTag(res.data.introduce).slice(
              0,
              50
            );
          }
          this.servicePersonalData = res.data;
          if (res.data.staffId) {
            this.queryComments({
              id: res.data.staffId,
              pageNum: 1,
              pageSize: 5,
              token: this.$route.query.token == '-1' ? null : this.$route.query.token
            });
            this.queryStars(res.data.staffId);
          }
        }
      });
    },
    queryComments(params) {
      queryServicePersonal(params).then(res => {
        if (res.code === 1) {
          this.comments = res.data.data.map(el => {
            let a = el;
            if (a.createDate) {
              a.createDate = `${a.createDate.slice(0, 4)}年${a.createDate.slice(
                5,
                7
              )}月${a.createDate.slice(8, 10)}日`;
            }
            return a;
          });
          this.commentNumber = res.data.total;
        }
      });
    },
    queryStars(id) {
      queryStar({
        id: id,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }).then(res => {
        if (res.code === 1) {
          this.star = Number(res.data.star);
        }
      });
    },
    queryExampleLists() {
      let params = {
        pageNum: 1,
        pageSize: 3,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      };
      if (this.$route.query.id) {
        params.servicePersonalId = this.$route.query.id;
      }
      queryExampleList(params).then(res => {
        if (res.code === 1) {
          if (res.data.data && res.data.data.length > 0 && res.data.data[0].diaryContent.length > 40) {
            res.data.data[0].diaryContent = res.data.data[0].diaryContent.slice(0, 40)
            this.showAllContent = true
          } else {
            this.showAllContent = false
          }
          this.exampleList = res.data.data;
          this.exampleTotal = res.data.total;
        }
      });
    },
    queryHotList() {
      let params = {
        pageNum: 1,
        pageSize: 10,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      };
      if (this.$route.query.id) {
        params.servicePersonalId = this.$route.query.id;
      }
      queryHotList(params).then(res => {
        if (res.code === 1) {
          this.hotList = res.data.data.map(el => {
            if (el.commImg) {
              el.commImg = el.commImg.split(",");
            } else {
              el.commImg = [];
            }
            return el;
          });
          this.hotTotal = res.data.total;
        }
      });
    },
    introduceShow() {
      if (!this.checkSource()) {
        return;
      }
      // this.introduceShowAll = !this.introduceShowAll;
    },
    dealHtmlTag(str) {
      return str.replace(/<[^>]+>/g, "");
    },
    focus(val) {
      if (!this.checkSource()) {
        return;
      }
      toAttention({
        recordId: this.servicePersonalData.id,
        custId: this.$route.query.userId,
        recordType: 1,
        state: val ? -1 : 1,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }).then(res => {
        if (res.code === 1) {
          this.query();
        }
      });
    },
    back() {
      if (!this.checkSource()) {
        return;
      }
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.back(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.back.postMessage(null);
      }
    },
    share() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        name: this.servicePersonalData.personalName,
        description: this.servicePersonalData.introduce,
        imageUrl: this.servicePersonalData.photo
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.share(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.share.postMessage(params);
      }
    },
    toOrganPage() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        organId: this.servicePersonalData.organId
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.organDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.organDetail.postMessage(params);
      }
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
          // self.$router.push({
          //   path: '/iosDownload',
          //   query: {
          //     clear_cache: Date.now()
          //   }
          // })
          window.location.href = `http://img.meiduduo.com/h5/download.html?path=doctordetail&id=${self.$route.query.id}`
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
<style lang="less" scoped>
.box-margin-bottom {
  margin-bottom: 18px;
}
.box-border-bottom {
  border-bottom: 1px solid #f1f1f1;
}
.box-border-top {
  border-top: 1px solid #f1f1f1;
}

.bg-color-one {
  background-color: #fe86d8;
}
.bg-color-two {
  background-color: #ff4691;
}
.bg-color-there {
  background-color: #d29dff;
}
.bg-color-four {
  background-color: #74dec4;
}

.common-box-style {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  align-items: flex-start;
  -webkit-align-items: flex-start;
  > div {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
  }
}

.doctor-detail {
  min-height: 100%;
  background-color: #f5f5f5;
  box-sizing: border-box;
  // padding-bottom: 98px;
  .doctor-icon {
    width: 100%;
    height: 440px;
    box-sizing: border-box;
    position: relative;
    > span {
      width: 60px;
      height: 60px;
      box-sizing: border-box;
      display: block;
      border-radius: 100%;
      background-color: rgba(85, 85, 85, 0.7);
      position: absolute;
      z-index: 9;
      text-align: center;
      line-height: 60px;
      > img {
        display: inline-block;
        width: 30px;
        height: 30px;
      }
    }
    .details-back {
      top: 57px;
      left: 30px;
      color: #fff;
      // background-image: url('/static/back.png');
      // background-size: 30px 30px;
      // background-repeat: no-repeat;
      // background-position: center;
    }
    .details-share {
      top: 57px;
      right: 30px;
      color: #fff;
      // background-image: url('/static/share_icon.png');
      // background-size: 30px 30px;
      // background-repeat: no-repeat;
      // background-position: center;
    }
    > figure {
      width: 100%;
      height: 100%;
      display: inline-block;
      > img {
        width: 100%;
        height: 100%;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .doctor-icon-info {
      width: 100%;
      background-color: rgba(85, 85, 85, 0.32);
      box-sizing: border-box;
      padding: 23px 30px 21px 33px;
      color: #fff;
      position: absolute;
      bottom: 0;
      > p:first-child {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        > span {
          &:first-child {
            font-size: 30px;
            font-weight: bold;
          }
          &:last-child {
            font-size: 26px;
            width: 120px;
            height: 40px;
            display: inline-block;
            line-height: 40px;
            border-radius: 20px;
            background-color: #ff4691;
            text-align: center;
          }
        }
      }
      > p:last-child {
        font-size: 22px;
      }
    }
  }
  .doctor-info {
    width: 100%;
    padding: 30px 33px 0 30px;
    box-sizing: border-box;
    background-color: #fff;
    .good-at {
      > span {
        font-size: 28px;
        color: #333;
        display: inline-block;
        width: 120px;
      }
      > div {
        flex-direction: inherit;
        -webkit-flex-direction: inherit;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        .doctor-tags-style {
          font-size: 24px;
          color: #ff4691;
          background-color: #fdd2ec;
          height: 40px;
          line-height: 40px;
          border-radius: 40px;
          padding: 0 30px;
          margin-bottom: 20px;
          margin-right: 30px;
        }
      }
    }
    .introduction {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      display: -webkit-flex;
      align-items: flex-start;
      -webkit-align-items: flex-start;
      padding-bottom: 41px;
      // margin-bottom: 31px;
      > span {
        font-size: 28px;
        color: #333;
        display: inline-block;
        width: 120px;
        line-height: 28px;
        // padding-top: 4px;
      }
      > div {
        flex: 1;
        -webkit-flex: 1;
        font-size: 24px;
        color: #666;
        line-height: 28px;
        > span:last-child {
          color: #ff4691;
        }
        /deep/ img {
          width: 100%;
        }
      }
    }
    .doctor-commtents {
      background: #fff;
      padding: 26px 33px 0 30px;
      .commtents-header {
        display: flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        margin-bottom: 44px;
        > div {
          > span {
            font-size: 30px;
            color: #feb259;
          }
        }
        > span {
          font-size: 22px;
          color: #ff4691;
        }
      }
      .commtents-box {
        .commtents-item {
          .commtent-margin-top {
            margin-top: 20px;
          }
          .common-box-style {
            font-size: 24px;
            color: #333;
            padding-bottom: 20px;
            > img {
              display: inline-block;
              width: 66px;
              height: 66px;
              border-radius: 100%;
              margin-right: 20px;
            }
            > span {
              display: inline-block;
              width: 86px;
            }
            > div {
              > p {
                &:first-child {
                  margin-bottom: 20px;
                  > span {
                    font-size: 22px;
                    color: #999999;
                    &:first-child {
                      font-size: 26px;
                      color: #3f6ba6;
                    }
                  }
                }
              }
              > span {
                &:first-child {
                  font-size: 22px;
                  color: #999999;
                  margin-bottom: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
  .organ-info {
    width: 100%;
    height: 105px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: cetner;
    padding: 0 34px 0 31px;
    background-image: url("http://img.meiduduo.com/images/hos_icon.png");
    background-size: 40px 48px;
    background-repeat: no-repeat;
    background-position: left;
    background-origin: content-box;
    .organ-name-info {
      flex: 1;
      -webkit-flex: 1;
      margin-left: 57px;
      margin-right: 17px;
    }
    img {
      &:first-child {
        display: inline-block;
        width: 40px;
        height: 48px;
        margin-right: 17px;
      }
      &:last-child {
        display: inline-block;
        width: 15px;
        height: 23px;
      }
    }
    > span {
      font-size: 30px;
      color: #333333;
    }
  }
  .product-case {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 30px 32px 28px 28px;
    .product-box-label {
      width: 100%;
      box-sizing: border-box;
      font-size: 28px;
      color: #333;
      border-left: 4px solid #fc4396;
      padding-left: 16px;
      margin-bottom: 29px;
    }
    .product-box-main {
      padding-bottom: 23px;
      .product-imgs {
        display: flex;
        display: -webkit-flex;
        > div {
          position: relative;
          width: 344px;
          height: 330px;
          &:first-child {
            margin-right: 2px;
            &::after {
              content: "";
              width: 100px;
              height: 30px;
              display: inline-block;
              position: absolute;
              right: 0;
              bottom: 0;
              background-image: url("http://img.meiduduo.com/images/index/Before.png");
              background-position: center;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
          &:last-child {
            &::after {
              content: "";
              width: 100px;
              height: 30px;
              display: inline-block;
              position: absolute;
              left: 0;
              bottom: 0;
              background-image: url("http://img.meiduduo.com/images/index/After.png");
              background-position: center;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
          > img {
            width: 344px;
            height: 330px;
            display: inline-block;
            position: relative;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            &:first-child {
              border-radius: 4px 0px 0px 4px;
            }
            &:last-child {
              border-radius: 0px 4px 4px 0px;
            }
          }
        }
      }
      .product-user-info {
        font-size: 26px;
        color: #333;
        font-weight: bold;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        margin: 30px 0 32px 0;
        > img {
          display: inline-block;
          width: 57px;
          height: 57px;
          border-radius: 100%;
          margin-right: 29px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      .product-content {
        font-size: 26px;
        color: #666;
        > span:last-child {
          color: #fc4396;
        }
      }
      .product-tag-info {
        font-size: 26px;
        color: #fc4396;
        padding: 39px 0 25px 0;
        > img {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      .product-price-info {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        font-size: 22px;
        color: #555;
        width: 100%;
        height: 50px;
        background-color: #f5f5f5;
        border-radius: 5px;
        padding: 0 19px 0 17px;
        box-sizing: border-box;
        > img {
          display: inline-block;
          width: 26px;
          height: 26px;
          margin-right: 16px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .product-price-label {
          flex: 1;
          -webkit-flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > span {
          &:last-child {
            color: #ff4691;
          }
        }
      }
      .product-btns {
        text-align: right;
        font-size: 24px;
        color: #ccc;
        margin-top: 26px;
        > span {
          display: inline-flex;
          display: -webkit-inline-flex;
          align-items: center;
          -webkit-align-items: center;
          margin-left: 50px;
          > img {
            display: inline-block;
            width: 26px;
            height: 24px;
            margin-right: 9px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .watch-all {
      font-size: 24px;
      color: #fc4396;
      padding-top: 25px;
      text-align: center;
    }
  }
  .product-selling {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 30px 32px 28px 28px;
    .product-box-label {
      width: 100%;
      box-sizing: border-box;
      font-size: 28px;
      color: #333;
      border-left: 4px solid #fc4396;
      padding-left: 16px;
      margin-bottom: 29px;
    }
    .product-box-main {
      > div {
        margin-bottom: 60px;
      }
      .product-item {
        display: flex;
        display: -webkit-flex;
        align-items: stretch;
        -webkit-align-items: stretch;
        > img {
          display: inline-block;
          width: 180px;
          height: 180px;
          border-radius: 5px;
          margin-right: 25px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        > div {
          flex: 1;
          -webkit-flex: 1;
          line-height: 36px;
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          -webkit-flex-direction: column;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          .product-item-name {
            font-size: 26px;
            color: #333;
            font-weight: bold;
          }
          .product-item-organ {
            font-size: 24px;
            color: #999;
          }
          .product-item-price {
            > span {
              &:first-child {
                font-size: 30px;
                font-weight: bold;
                color: #fc4396;
                margin-right: 14px;
              }
              &:last-child {
                font-size: 24px;
                color: #999;
              }
            }
          }
          .product-item-info {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            .product-item-number {
              flex: 1;
              -webkit-flex: 1;
              text-align: right;
            }
            > span {
              font-size: 22px;
              color: #fff;
              height: 32px;
              line-height: 32px;
              border-radius: 5px;
              padding: 0 6px 0 5px;
              margin-right: 8px;
              &:last-child {
                font-size: 24px;
                color: #999;
              }
            }
          }
        }
      }
    }
    .watch-all {
      font-size: 24px;
      color: #fc4396;
      padding-top: 25px;
      text-align: center;
    }
  }
  .aside-btns {
    width: 100%;
    height: 98px;
    display: flex;
    display: -webkit-flex;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    > span {
      font-size: 30px;
      color: #fff;
      flex: 1;
      -webkit-flex: 1;
      display: inline-flex;
      display: -webkit-inline-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
      &:first-child {
        background-color: #fa97e6;
      }
      &:last-child {
        background-color: #fc4396;
      }
      > img {
        display: inline-block;
        width: 42px;
        height: 42px;
        margin-right: 23px;
      }
      .yuyue-btn {
        display: block;
        width: 42px;
        height: 42px;
        background-image: url("http://img.meiduduo.com/images/h5/yuyue_icon.png");
        background-size: 42px 42px;
        background-repeat: no-repeat;
        background-position: center center;
        margin-right: 23px;
      }
      .zixun-btn {
        display: block;
        width: 42px;
        height: 42px;
        background-image: url("http://img.meiduduo.com/images/h5/zixun_icon.png");
        background-size: 42px 42px;
        background-repeat: no-repeat;
        background-position: center center;
        margin-right: 23px;
      }
    }
  }
}
.z-lines-2-overflow-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.doctor-messages {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #333;
}
.doctor-commtents {
  background: #fff;
  padding: 26px 33px 0 30px;
  .commtents-header {
    display: flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    margin-bottom: 44px;
    > div {
      > span {
        font-size: 30px;
        color: #feb259;
      }
    }
    > span {
      font-size: 22px;
      color: #ff4691;
    }
  }
  .commtents-box {
    .commtents-item {
      .commtent-margin-top {
        margin-top: 20px;
      }
      .common-box-style {
        font-size: 24px;
        color: #333;
        padding-bottom: 20px;
        > img {
          display: inline-block;
          width: 66px;
          height: 66px;
          border-radius: 100%;
          margin-right: 20px;
        }
        > span {
          display: inline-block;
          width: 86px;
        }
        > div {
          > p {
            &:first-child {
              margin-bottom: 20px;
              > span {
                font-size: 22px;
                color: #999999;
                &:first-child {
                  font-size: 26px;
                  color: #3f6ba6;
                }
              }
            }
          }
          > span {
            &:first-child {
              font-size: 22px;
              color: #999999;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
