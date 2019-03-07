<template>
  <div class="mechanism">
    <div class="header">
      <div
        class="completePicture-bg"
        :style="{ backgroundImage: `url(${organment.completePicture})`}"
      ></div>
      <div class="organ-info-bg"></div>

      <div class="organ-info">
        <div class="organ-name" v-cloak>
          <span class="organNamet">{{organment.organName}}</span>
          <span class="natureName" v-if="organment.natureName">{{organment.natureName}}</span>
          <!-- <span class="xyy-ellipsis-1 organ-name-title" v-cloak>{{organment.organName}}</span>
          <span class="natureName" v-if="organment.natureName">{{organment.natureName}}</span>-->
        </div>

        <div class="focus-group flex-r">
          <span @click.stop="focus(0)" class="focus" v-if="!mechanismData.isFollow">+ 关注</span>
          <span @click.stop="focus(1)" class="focus" v-else>已关注</span>
        </div>
        <!-- 机构频分有可能是小数点 -->
        <div class="star-score flex-r">
          <!-- <rater active-color="#FFAA05" :disabled="true" v-model=""></rater> -->
          <div class="star-box flex-r">
            <p class="star-dit" v-for="(v,i) in shi" :key="i"></p>
            <!-- <p v-for="v in 10" :key="v">1</p> -->
            <p class="star-dit star-ban" v-if="!isInt(Number(organment.starScore))"></p>
            <p class="star-dit star-kong" v-if="kong>0" v-for="t of kong" :key="t"></p>
          </div>

          <span class="star-num">{{organment.starScore}}分</span>
        </div>
        <div class="organ-list">
          <div
            @click.stop="goImg(1, '执业许可')"
            :style="{color:organment.practiceLicense == '' ? '#999' :'#333'}"
          >执业许可</div>
          <div
            @click.stop="goImg(2, '品牌认证')"
            :style="{color:organment.brand == '' ? '#999' :'#333'}"
          >品牌认证</div>
          <div
            @click.stop="goImg(3, '荣誉展示')"
            :style="{color:organment.honor == '' ? '#999' :'#333'}"
          >荣誉展示</div>
          <!-- 简介 -->
          <div
            @click.stop="goInteoduce()"
            :style="{color:(organment.organName && organment.aptitude && organment.tel && organment.address && organment.introduce) == '' ? '#999' :'#333'}"
          >简介</div>
        </div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="mechanism-position flex-r" @click="positionJump(organment)">
      <p v-if="organment" class="xyy-ellipsis-1">{{organment.address}}</p>
      <span class="iconfont icon-Right" style="font-size:10px;"></span>
    </div>
    <!-- 拼团 -->
    <div class="pindai tuan" v-if="isPin.length>0" @click="jumpPin">
      <span>拼团专区</span>
      <span class="iconfont icon-Right" style="font-size:10px;"></span>
    </div>
    <!-- 代言商品 -->
    <div class="pindai dai" v-if="isDeposit.length>0" @click="jumpDeposit">
      <span>我要代言商品专区</span>
      <span class="iconfont icon-Right" style="font-size:10px;"></span>
    </div>
    <!-- <div class="mechanism-icon box-margin-bottom"> -->
    <!-- <span v-if="0" @click="back" class="details-back iconfont icon-fanhui"> -->
    <!-- <img src="/static/back.png" alt=""> -->
    <!-- </span> -->
    <!-- <span v-if="0" @click="share" class="details-share iconfont icon-iconfontfenxiang3"> -->
    <!-- <img src="/static/share_icon.png" alt=""> -->
    <!-- </span>
      <figure>
        <img src :style="{ backgroundImage: `url(${organment.completePicture})` }" alt>
      </figure>
      <div class="mechanism-icon-info">
        <p>
          <span>{{organment.organName}}</span>
          <span @click.stop="focus(0)" v-if="focusIcon">+ 关注</span>
          <span @click.stop="focus(1)" v-else>已关注</span>
        </p>
        <p>{{organment.natureName}}</p>
      </div>
    </div>-->
    <div class="mechanism-info">
      <div v-bind:class="{'mechanism-img1':true , 'mechanism-img1-act':currentIndex==0 }"></div>
      <div v-bind:class="{'mechanism-img3':true , 'mechanism-img3-act':currentIndex==2}"></div>
      <div v-bind:class="{'mechanism-img2':true , 'mechanism-img2-act':currentIndex==1}"></div>
      <div v-bind:class="{'mechanism-img4':true , 'mechanism-img4-act':currentIndex==3}"></div>
      <div v-bind:class="{'mechanism-img5':true , 'mechanism-img5-act':currentIndex==4}"></div>
    </div>
    <tab
      id="change-bg"
      active-color="#FF4691"
      default-color="#333"
      bar-active-color="#FF4691"
      style="padding:0px;"
      custom-bar-width="75%"
    >
      <tab-item @on-item-click="setActive(0)" selected>
        <span>服务</span>
      </tab-item>
      <tab-item @on-item-click="setActive(2)">
        <span>{{serverPeopleMethods.detailName}}</span>
      </tab-item>
      <tab-item @on-item-click="setActive(1)">
        <span>日记</span>
      </tab-item>
      <tab-item @on-item-click="setActive(3)">
        <span>案例</span>
      </tab-item>
      <tab-item @on-item-click="setActive(4)">
        <span>视讯</span>
      </tab-item>
    </tab>
    <!-- 服务人员 -->
    <div class="server-info" v-show="currentIndex==0">
      <organServer :severData="server"></organServer>
      <!-- <div v-if="currentIndex==0&&server.length == 0" class="nodata">
        <img src="http://img.meiduduo.com/images/nodata.png">
      </div>-->
    </div>
    <!-- 日记 -->
    <div class="diary-info" v-show="currentIndex==1">
      <organDiray :diaryValue="diary" :shared="shared"></organDiray>
      <div v-if="currentIndex==1&&diary.length == 0" class="nodata">
        <figure>
          <img src="http://img.meiduduo.com/images/nodata.png">
        </figure>
      </div>
    </div>
    <!-- 医生 -->
    <div class="doctor-info" v-show="currentIndex==2">
      <div
        class
        v-for="(v,i) in mechanismDocData"
        :key="i"
        style="margin-bottom:10px;"
        @click="severJump(v)"
        v-if="mechanismDocData.length > 0"
      >
        <doctorList :doctorers="v"/>
      </div>
      <div v-if="currentIndex==2&&mechanismDocData.length == 0" class="nodata">
        <figure>
          <img src="http://img.meiduduo.com/images/nodata.png">
        </figure>
      </div>
    </div>
    <!-- 案例 -->
    <div class="case-ifo" v-show="currentIndex==3">
      <!-- <span class="hospital-title">案例</span> -->
      <span class="hospital-word" v-html="organment.organCase"></span>
      <div v-if="currentIndex==3&&!organment.organCase" class="nodata">
        <figure>
          <img src="http://img.meiduduo.com/images/nodata.png">
        </figure>
      </div>
    </div>
    <!-- 视屏 -->
    <div class="video-info" v-show="currentIndex==4">
      <div
        v-for="(item, index) of videoListArr"
        :key="index"
        class="x-video"
        v-if="videoListArr.length > 0"
      >
        <organVideo
          :videoList="item"
          @giveZan="giveZan"
          @goVideoOrArticle="goVideoOrArticle"
          v-if="item.type==1 || item.type==2"
        />
        <activeNews :arti="item" @goVideoOrArticle="goVideoOrArticle" v-else/>
      </div>
      <div v-if="currentIndex==4&&videoListArr.length<1" class="nodata">
        <figure>
          <img src="http://img.meiduduo.com/images/nodata.png">
        </figure>
      </div>
    </div>

    <div class="aside-btns">
      <span @click="toPhone">
        <span class="yuyue-btn">
          <!-- <img src="/static/yuyue_icon.png" alt=""> -->
        </span>
        <span>电话预约</span>
      </span>
      <span @click="toTalk">
        <span class="zixun-btn">
          <!-- <img src="/static/zixun_icon.png" alt=""> -->
        </span>
        <span>在线咨询</span>
      </span>
    </div>
  </div>
</template>
<script>
import { Rater, Alert, Tab, TabItem } from "vux";
import {
  queryMenchanismList,
  queryMenchanismDocList,
  queryServicePersonal,
  queryStar,
  queryExampleList,
  queryHotList,
  toAttention,
  login
} from "../api/pageApi.js";
import { mapState, mapMutations } from "vuex";
import organDiray from "../components/activeDiary";
import organVideo from "../components/organVideo";
import couponList from "../components/couponList";
import doctorList from "../components/doctorList";
import activeNews from "../components/activeNews";
// import organVideo from "@/components/organVideo";
import organServer from "@/components/organServer";
import { http } from "../api/pageApi.js";
const navigatorInfo = navigator.userAgent;
const isAndroid =
  navigatorInfo.indexOf("Android") > -1 || navigatorInfo.indexOf("Adr") > -1; //android终端
const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

const isInt = num => {
  var partten = /(^[1-9][0-9]*$)|(^[0-9]$)/;
  return partten.test(num);
  // return parseFloat(this)==this;
};
const splitStar = num => {
  if (isInt(num)) {
    return num;
  } else {
    return Math.floor(num);
  }
};
export default {
  data() {
    return {
      list: {},
      focusIcon: this.$route.query.state == 1 ? true : false,
      servicePersonalData: {},
      mechanismDocData: {},
      diaryInfoShow: false,
      diary: [],
      server: [],
      data42: 3,
      mechanismData: {}, // 服务人员数据
      comments: [], // 评论
      star: 0, // 评星
      commentNumber: 0, // 评论数量
      exampleList: [], // 案例列表
      exampleTotal: 0,
      hotList: [], // 热卖列表
      hotTotal: 0,
      shared: 0,
      introduceShowAll: false,
      toDefaultBrowser: false,
      kong: 1,
      shi: 1,
      isActive: {
        isSeverAct: true,
        isDiaryAct: false,
        isDoctorAct: false,
        isCaseAct: false,
        isvideoAct: false
      },
      organment: {},
      currentIndex: 0,
      videoListArr: [], //视频的数组
      userId: -1,
      isPin: [],
      isDeposit: [],
      serverPeopleMethods: {},
      allStar: 5
    };
  },
  components: {
    Rater,
    Alert,
    TabItem,
    Tab,
    organDiray,
    organVideo,
    couponList,
    organServer,
    doctorList,
    activeNews
  },

  computed: {
    ...mapState(["shareInfo", "userInfo"])
  },
  created() {
    this.shared = Number(this.$route.query.share);
    this.organId = this.$route.query.organId;
    this.saveStore();
    this.saveTokenStore();
    // 传参说明：id 医生id；custId 当前登录用户的id；
    // 路径：http://192.168.1.51:8080/#/mechanismDetail?id=11&custId=2457
  },
  mounted() {
    this.$nextTick(() => {
      this.getSeverData();
      this.getDoctorData();
      // this.getCouponList();
      this.pinShop();
      this.depositShop();

      document.body.addEventListener("touchstart", function() {});
      if (isAndroid) {
        window.android.doctorTalksPop(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.doctorTalksPop.postMessage(null);
      }
    });
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to);
  //     alert(to);
  //     console.log(from);
  //     if (to.path == "/organ" && from.path == "/organIntroduce") {
  //       if (isAndroid) {
  //         window.android.doctorTalksPop(null);
  //       }
  //       if (isiOS) {
  //         window.webkit.messageHandlers.doctorTalksPop.postMessage(null);
  //       }
  //     }
  //   }
  // },
  methods: {
    ...mapMutations(["saveUserId", "saveToken"]),
    saveStore() {
      // if (this.$route.query.userId == -1) {
      //   this.saveUserId("");
      // } else {
      //   this.saveUserId(this.$route.query.userId);
      // }
      if (this.$route.query.userId != "-1") {
        this.userId = this.$route.query.userId;
        this.saveUserId(this.$route.query.userId);
      } else if (this.userId != -1) {
        this.saveUserId(this.userId);
      } else {
        this.userId = -1;
        this.saveUserId("");
      }
    },
    saveTokenStore() {
      if (this.$route.query.token == -1) {
        this.saveToken("");
      } else {
        this.saveToken(this.$route.query.token);
      }
    },

    isInt(num) {
      var partten = /(^[1-9][0-9]*$)|(^[0-9]$)/;
      return partten.test(num);
      // return parseFloat(this)==this;
    },
    splitStar(num) {
      if (this.isInt(num)) {
        return num;
      } else {
        return Math.floor(num);
      }
    },
    kongStar() {
      let a = 0;
      if (this.isInt(Number(this.organment.starScore))) {
        a = this.allStar - Number(this.organment.starScore);
      } else {
        a =
          this.allStar - (this.splitStar(Number(this.organment.starScore)) + 1);
      }

      this.kong = a;
    },
    shiStar() {
      this.shi = this.splitStar(Number(this.organment.starScore));
    },
    giveZan(item) {
      // console.log(item);
      if (isAndroid) {
        this.userId = window.android.getUserId();
      }
      if (!this.checkSource()) {
        return;
      }
      let recordType = 0;
      if (item.type == 1) recordType = 9;
      if (item.type == 2) recordType = 10;
      if (item.type == 3) recordType = 4;
      if (this.userInfo.custId || this.userId != -1) {
        http("customerRecord/save", {
          recordId: item.id,
          custId: this.$store.state.userInfo.custId,
          recordType,
          crType: 1,
          state: item.isThumbsUp ? "-1" : "1"
        }).then(res => {
          // console.log(res);
          if (res.code == 1) {
            if (!item.isThumbsUp) {
              item.fabulousNum++;
            } else {
              item.fabulousNum--;
            }
            item.isThumbsUp = !item.isThumbsUp;
          }
        });

        this.videoListArr.forEach((v, i) => {
          if (v.is == item.id) {
            this.videoListArr[i] = item;
          }
        });
      } else {
        this.onConfirm();
      }
    },
    // 整体数据
    // 进入页面请求所有的数据
    getSeverData() {
      var params = {
        id: this.$route.query.organId,
        userId: this.$route.query.userId
      };
      queryMenchanismList(params).then(res => {
        if (res.code == 1) {
          const {
            videoAndArticleVOList,
            organ,
            diaryBookList,
            commodityList
          } = res.data;
          this.mechanismData = res.data;
          this.organment = organ;
          this.diary = diaryBookList;
          this.server = commodityList;
          videoAndArticleVOList.forEach(v => {
            v.content = v.content.replace(
              /\<img/gi,
              '<img style="display:none;"'
            );
            v.cover = v.cover.split(",");

            this.kongStar();
            this.shiStar();
            // if(v.id==9185){
            //   v.cover.push('http://fs.meiduduo.com/shop4/SHOP/other/1548472804020.jpg')
            // }
          });
          this.videoListArr = videoAndArticleVOList;
          // 服务人员的类型
          this.doctorIcons(this.organment.id, this.organment.channelCode).then(
            res => {
              if (res.code == 1) {
                this.serverPeopleMethods = res.data[0];
              }
            }
          );
          this.shareDetail(this.organment);
        }
      });
    },
    //医生图标调换
    doctorIcons(organId, channelCode) {
      return http("common/dictList", {
        organId: organId,
        masterCode: "channel_type",
        detailCode: channelCode
      });
    },
    // 登录
    onConfirm() {
      // this.toLoginShow = true;
      // console.log("点击确认");
      // if (!this.checkSource()) {
      //   return;
      // }
      if (isAndroid) {
        window.android.toLogin(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.toLogin.postMessage(null);
      }
    },
    //获取优惠券

    getCouponList() {
      http("coupon/paySuccessShowCoupon", {
        // organIds: this.organId,
        organIds: 2,
        custId: this.$store.state.userInfo.custId,
        pageNum: 1, //this.pageNum,
        pageSize: 15 //this.pageSize
      }).then(res => {
        // console.log(res);
        if (res.code == 1) {
          let a = res.data.data;
          a.forEach(v => {
            this.$set(v, "isOverdue", 0);
          });
          this.couponList = a;
          console.log(this.couponList);
        }
      });
    },
    //拼团入口是否显示
    pinShop() {
      http("fightGroup/list4PageGroupVersion4", {
        organId: this.organId,
        onState: 1
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.isPin = res.data.data;
        }
      });
    },
    // 是否显示代言商品入口
    depositShop() {
      http("commodity/commodityList", {
        organId: this.organId,
        isRepresent: 1
      }).then(res => {
        if (res.code == 1) {
          this.isDeposit = res.data.data;
        }
      });
    },
    // 跳转拼团
    jumpPin() {
      let params = {
        organId: this.organId
      };
      if (isAndroid) {
        window.android.groupBuyWithOrgan(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.groupBuyWithOrgan.postMessage(params);
      }
    },
    //跳转代言
    jumpDeposit() {
      let params = {
        organId: this.organId
      };
      if (isAndroid) {
        window.android.endorseWithOrgan(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.endorseWithOrgan.postMessage(params);
      }
    },

    //点击 视屏，文章
    goVideoOrArticle(item) {
      // console.log("进来了吗");
      //videoDetail
      if (!this.checkSource()) {
        return;
      }
      let params = {};
      if (item.type == 1) {
        // 视屏
        params = {
          videoId: item.id,
          cover: item.cover[0],
          url: item.videoUrl
        };
        if (isAndroid) {
          window.android.videoDetail(JSON.stringify(params));
        }
        if (isiOS) {
          window.webkit.messageHandlers.videoDetail.postMessage(params);
        }
      } else {
        params = {
          newsId: item.id,
          title: item.title,
          content: item.content,
          image: item.cover[0],
          type: item.type == 2 ? 10 : 4 //文章10 资讯4
        };
        // console.log("+++++++++++++++++++++++++++++++++++++++");
        // console.log(params);

        if (isAndroid) {
          window.android.newsDetail(JSON.stringify(params));
        }
        if (isiOS) {
          window.webkit.messageHandlers.newsDetail.postMessage(params);
        }
      }
    },

    // 跳转简介
    goInteoduce() {
      var org = this.organment;
      if (
        org.organName &
        org.aptitude &
        org.tel &
        org.address &
        (org.introduce == "")
      ) {
        return;
      }
      if (isAndroid) {
        window.android.doctorTalksPush(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.doctorTalksPush.postMessage(null);
      }
      this.$router.push({
        path: "/organIntroduce",
        query: {
          organName: this.organment.organName,
          aptitude: this.organment.aptitude,
          tel: this.organment.tel,
          address: this.organment.address,
          introduce: this.organment.introduce
        }
      });
    },
    // 跳转图片介绍
    goImg(typeText, typeTitle) {
      var org = this.organment;
      if (typeText == 1 && org.practiceLicense == "") {
        return false;
      }
      if (typeText == 2 && org.brand == "") {
        return false;
      }
      if (typeText == 3 && org.honor == "") {
        return false;
      }
      this.$router.push({
        path: "/license",
        query: {
          practiceLicense: this.organment.practiceLicense,
          brand: this.organment.brand,
          honor: this.organment.honor,
          type: typeText,
          title: typeTitle
        }
      });
    },
    // 关注
    focus(val) {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
        if (this.userId != -1) {
          this.saveUserId(this.userId);
        } else {
          this.saveUserId("");
        }
      }
      if (!this.checkSource()) {
        return;
      }
      // alert("用户id" + this.mechanismData.organ.id);
      if (this.userInfo.custId || this.userId != -1) {
        let params = {
          recordId: this.$route.query.organId,
          custId: this.userId || this.userInfo.custId,
          recordType: 2,
          state: val == 0 ? 1 : -1
          // token: this.$route.query.token == "-1" ? null : this.$route.query.token
        };
        console.log(params);

        toAttention(params).then(res => {
          if (res.code === 1) {
            this.mechanismData.isFollow = !this.mechanismData.isFollow;
            // console.log(this.mechanismData.isFollow);
          }
        });
      } else {
        this.onConfirm();
      }
    },
    back() {
      // if (!this.checkSource()) {
      //   return;
      // }

      if (isAndroid) {
        window.android.back(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.back.postMessage(null);
      }
    },
    share() {
      this.params = {
        name: this.servicePersonalData.personalName,
        description: this.servicePersonalData.introduce,
        imageUrl: this.servicePersonalData.photo
      };

      if (isAndroid) {
        window.android.share(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.share.postMessage(params);
      }
    },

    // 数据加载完调APP方法
    shareDetail(item) {
      let params = {
        name: item.organName,
        description: item.introduce,
        imageUrl: item.completePicture
      };

      if (isAndroid) {
        // window.android.hotProjectDetail(JSON.stringify(params));
        window.android.shareDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.shareDetail.postMessage(params);
      }
    },

    // 服务人员列表跳转
    severJump(val) {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        doctorId: val.id,
        personalName: val.personalName,
        introduce: val.introduce,
        icon: val.icon
      };

      if (isAndroid) {
        window.android.doctorDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.doctorDetail.postMessage(params);
      }
    },

    // 导航地址.默认经纬度0.00
    positionJump(item) {
      if (!this.checkSource()) {
        return;
      }
      //默认北京116.404844,39.916706
      let params = {
        lat: item.lat ? item.lat : "116.404844",
        lng: item.lng ? item.lng : "39.916706"
      };

      if (isAndroid) {
        window.android.organAddressMap(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.organAddressMap.postMessage(params);
      }
    },
    // 电话预约
    toPhone() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        phoneNumber: this.organment.tel
      };

      if (isAndroid) {
        window.android.call(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.call.postMessage(params);
      }
    },
    // 在线咨询
    toTalk() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        lat: this.$route.query.lat,
        lng: this.$route.query.lng,
        organId: this.$route.query.organId
      };

      if (isAndroid) {
        window.android.inlineService(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.inlineService.postMessage(params);
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
          window.location.href = `http://img.meiduduo.com/h5/download.html?path=organdetail&organId=${
            self.$route.query.organId
          }`;
        }
        return false;
      }
    },
    checkWeiXin() {
      // 是否在微信浏览器打开
      const navigatorInfo = navigator.userAgent.toLowerCase();
      if (navigatorInfo.match(/WeiBo/i) == "weibo") {
        return true;
      } else if (navigatorInfo.match(/QQ/i) == "qq") {
        return true;
      } else if (navigatorInfo.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
      // if (navigatorInfo.match(/MicroMessenger/i) == "micromessenger") {
      //   // this.toDefaultBrowser = true;
      //   return true;
      // } else {
      //   return false;
      // }
    },
    setObjectFalse(obj) {
      for (const key in obj) {
        obj[key] = false;
      }
      return obj;
    },
    setActive(e) {
      this.currentIndex = e;
      return;
      this.setObjectFalse(this.isActive);
      var act = this.isActive;
      switch (e) {
        case 1:
          act.isSeverAct = true;
          break;
        case 2:
          act.isDiaryAct = true;
          break;
        case 3:
          act.isDoctorAct = true;
          break;
        case 4:
          act.isCaseAct = true;
          break;
        case 5:
          act.isvideoAct = true;
          break;
      }
    },

    getDoctorData() {
      var params = {
        organId: this.$route.query.organId,
        lat: this.$route.query.lat,
        lng: this.$route.query.lng
      };
      queryMenchanismDocList(params).then(res => {
        if (res.code == 1) {
          this.mechanismDocData = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../style/organ.less");

.x-video {
  margin-bottom: 18px;
}
</style>
<style lang="css">
#change-bg {
  position: relative;
  top: -142px;
}

#change-bg .vux-tab-container {
  height: 140px;
  overflow: inherit;
  top: 2px;
}

#change-bg .vux-tab {
  height: 140px;
  background: transparent;
}

#change-bg .vux-tab div span {
  line-height: 140px;
  font-size: 30px;
  line-height: 200px;
}

#change-bg .scrollable .vux-tab-item {
  flex: 0 0 20%;
}

.hospital-word {
  margin: 0 30px !important;
  padding: 30px 0;
}
.hospital-word /deep/ img {
  width: 100%;
}
</style>
