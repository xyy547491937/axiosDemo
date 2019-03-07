<template>
  <div class="group-details">
    <div class="details-swiper">
      <span v-if="0" @click.stop="back" class="details-back iconfont icon-fanhui">
        <!-- <img src="/static/back.png" alt=""> -->
      </span>
      <span v-if="0" @click.stop="share" class="details-share iconfont icon-iconfontfenxiang3">
        <!-- <img src="/static/share_icon.png" alt=""> -->
      </span>
      <swiper
        :list="comm.imgList"
        :show-desc-mask="false"
        dots-position="center"
        height="365px"
        :auto="true"
        :loop="true"
      ></swiper>
      <div class="product-info box-margin-bottom">
        <p class="product-info-name">
          <span>[{{ comm.commName }}]</span>
          <span>{{ comm.remark }}</span>
        </p>
        <p class="product-info-price">
          <span>￥{{ comm.groupPrice }}</span>
          <span>单买：￥{{ comm.rulePrice }}</span>
        </p>
        <p class="product-info-other">
          <span></span>
          <span>{{ clusterNo }}人拼单</span>
        </p>
      </div>
    </div>
    <div class="details-servies box-margin-bottom">
      <label>服务</label>
      <span>闪电/过期退{{ comm.isStage == 1 ? ' · 分期' : '' }}{{ comm.isInsurance == 1 ? ' · 保险': '' }}</span>
    </div>
    <div v-if="groupState == '拼团中'" class="details-groups box-margin-bottom">
      <div @click.stop="showMore" class="doctor-info">
        <p>{{ joinInfo }}</p>
        <!-- <img src="/static/bg.png" alt> -->
        <span class="iconfont icon-Right"></span>
      </div>
      <div class="groups-list">
        <div
          @click.stop="toJoin(index, item)"
          v-if="index < 2"
          v-for="(item, index) of joinList"
          :key="index"
          class="groups-list-item box-border-top"
        >
          <figure>
            <img :style="{ backgroundImage: `url(${item.icon})` }" width="100%">
          </figure>
          <span class="groups-list-item-user">{{ item.nickName }}</span>
          <p>
            <span>还差
              <span style="color: #FF4691;">{{ item.gapNo }}人</span>拼成
            </span>
            <span>剩余{{ item.time }}</span>
          </p>
          <span v-if="item.custId == userId" class="groups-list-item-btn">去邀请</span>
          <span v-else class="groups-list-item-btn">去拼单</span>
        </div>
      </div>
    </div>
    <div class="details-organ box-margin-bottom">
      <div @click.stop="toOrganPage" class="common-box-style">
        <figure>
          <img :style="{ backgroundImage: `url(${organ.logo})` }" width="100%">
        </figure>
        <div>
          <p>{{ organ.organName }}</p>
          <p>资质：{{ organ.aptitude }}</p>
          <p>地址：{{ organ.address }}</p>
        </div>
      </div>
      <div @click.stop="toDoctorPage" class="doctor-info">
        <p>
          <span>{{ doctor.personalName }}</span>
          <span>{{ doctor.technicalName }}</span>
          <span>擅长：{{ doctor.fields }}</span>
        </p>
        <!-- <img src="/static/bg.png" alt> -->
        <span class="iconfont icon-Right"></span>
      </div>
    </div>
    <!-- <div class="details-comments box-margin-bottom">
      <div class="details-comments-main box-border-bottom">
        <div class="details-commtens-header box-border-bottom">
          <div class="doctor-info">
            <p>项目评价（450）</p>
            <img src="/static/bg.png" alt>
          </div>
          <div class="commtens-info">
            <span>效果4.9</span>
            <span>环境4.8</span>
            <span>专业4.9</span>
            <span>服务5.0</span>
          </div>
        </div>
        <div class="details-commten-item common-box-style">
          <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
          <div>
            <p class="user-info">
              <span>匿名用户22231</span>
              <span>
                <img src="/static/praise_icon.png" alt>
                <span>15</span>
              </span>
            </p>
            <p class="commten-content">用清水稀释后的白醋水可以用于洗脸。白醋本身有抑菌、美白、软化角质的作用，每天坚持用白醋洗脸可以让面部肌肤白白嫩嫩</p>
            <p class="commten-other">20分钟前 浏览3204</p>
            <div class="commten-imgs">
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
            </div>
            <div class="commten-review">
              <p>机构回复：</p>
              <p>谢谢亲亲的好评！</p>
            </div>
          </div>
        </div>
      </div>
      <p class="details-commtens-btn">
        <span>查看全部评价</span>
        <img src="/static/bg.png" alt>
      </p>
    </div>-->
    <div class="tab-main box-margin-bottom">
      <tab
        active-color="#FF4691"
        default-color="#333"
        bar-active-color="#FF4691"
        custom-bar-width="40px"
        v-model="index"
      >
        <tab-item @on-item-click="handler">详情</tab-item>
        <!-- <tab-item @on-item-click="handler">评价</tab-item> -->
      </tab>
      <div v-if="index === 0" class="details-content">
        <label>服务介绍</label>
        <div v-html="comm.commInfo" class="server-introduce"></div>
        <label>医生介绍</label>
        <figure v-if="item" v-for="(item, index) of doctor.photo" :key="index">
          <img :style="{ backgroundImage: `url(${item})` }" alt>
        </figure>
        <div class="doctor-introduce" v-html="doctor.introduce"></div>
        <label>医院介绍</label>
        <h2 class="organ-name">{{ organ.organName }}</h2>
        <div class="organ-introduce" v-html="organ.introduce"></div>
        <label>版权声明</label>
        <div class>如在胚豆发布的“胚豆网上内容”涉及知识产权争议等问题，请相关权利人或利害关系人与胚豆网联系。</div>
        <label>免责声明</label>
        <div v-if="organ.organType == 1" class>任何信息都不能替代职业医师面对面的诊断和治疗，本网站所载的内容信息和数据仅供参考。</div>
        <div v-else class>该服务为线下服务，本站所载内容仅供参考。</div>
      </div>
      <div v-if="index === 1" class="details-commtens-box">
        <div class="details-commten-item common-box-style">
          <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
          <div>
            <p class="user-info">
              <span>匿名用户22231</span>
              <span>
                <img src="/static/praise_icon.png" alt>
                <span>15</span>
              </span>
            </p>
            <p class="commten-content">用清水稀释后的白醋水可以用于洗脸。白醋本身有抑菌、美白、软化角质的作用，每天坚持用白醋洗脸可以让面部肌肤白白嫩嫩</p>
            <p class="commten-other">20分钟前 浏览3204</p>
            <div class="commten-imgs">
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
            </div>
            <div class="commten-review">
              <p>机构回复：</p>
              <p>谢谢亲亲的好评！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside-btns">
      <div class="aside-btn-item-one call-btn" @click.stop="callPhone">
        <!-- <img src="http://img.meiduduo.com/images/shop/call.png" alt> -->
        <span>电话</span>
      </div>
      <div @click.stop="goService" class="aside-btn-item-one service-btn">
        <!-- <img src="/static/message_b.png" alt> -->
        <span>客服</span>
      </div>
      <div @click.stop="startGroupF" class="bg-color-two" style="flex: 2;-webkit-flex: 2;">
        <span class="aside-btn-item">发起拼单</span>
      </div>
      <!-- <div class="bg-color-two">
        <span class="aside-btn-item">一键参团</span>
      </div>-->
    </div>
    <div v-if="showItemModal" class="modal">
      <x-dialog
        v-model="showItemModal"
        hide-on-blur
        :dialog-style="{'max-width': '100%', width: '100%', 'padding-top': '20px', 'background-color': 'transparent'}"
      >
        <div @touchmove.prevent class="item-modal-box">
          <span class="modal_cancel" @click.stop="showItemModal = false">
            <!-- <img class="modal_cancel" src="http://img.meiduduo.com/images/shop/cancel.png" alt=""> -->
          </span>
          <p class="item-modal-title">参与{{ joinList[nowIndex].nickName }}的拼单</p>
          <p class="item-modal-info">仅剩
            <span>{{ joinList[nowIndex].gapNo }}</span>
            个名额，{{ joinList[nowIndex].time }}后结束
          </p>
          <div class="user-icons">
            <div class="user-own">
              <figure>
                <img class="active" :style="{ backgroundImage: `url(${joinList[nowIndex].icon})` }" alt>
              </figure>
            </div>
            <figure>
              <img src="http://img.meiduduo.com/images/shop/other.png" alt>
            </figure>
          </div>
          <p class="item-modal-btn" @click.stop="go">参与拼单</p>
        </div>
      </x-dialog>
    </div>
    <div v-if="showListModal" class="modal">
      <x-dialog
        v-model="showListModal"
        hide-on-blur
        :dialog-style="{'max-width': '100%', width: '100%', 'padding-top': '20px', 'background-color': 'transparent'}"
      >
        <div @touchmove.prevent class="list-modal-box">
          <span class="modal_cancel" @click.stop="showListModal = false">
            <!-- <img class="modal_cancel" src="http://img.meiduduo.com/images/shop/cancel.png" alt=""> -->
          </span>
          <p class="list-modal-header">正在拼单</p>
          <div class="list-modol-area">
            <div
              @click.stop="toJoin(index, item)"
              class="list-modal-item"
              v-if="index < 10"
              v-for="(item, index) of joinList"
              :key="index"
            >
              <figure>
                <img  :style="{ backgroundImage: `url(${item.icon})` }" alt>
              </figure>
              <div class="list-item-infos">
                <p>
                  <span class="list-item-name">{{ item.nickName }}</span>
                  <span>还差{{ item.gapNo }}人</span>
                </p>
                <p>剩余{{ item.time }}</p>
              </div>
              <!-- <span class="list-modal-btn">去拼单</span> -->
              <span v-if="item.custId == userId" class="list-modal-btn">去邀请</span>
              <span v-else class="list-modal-btn">去拼单</span>
            </div>
          </div>
          <p class="list-modal-info">仅显示10个正在拼单的人</p>
        </div>
      </x-dialog>
    </div>
    <Alert v-model="toDefaultBrowser">点击右上角选择在浏览器打开~~</Alert>
    <Alert v-model="groupNoStart">拼团活动还未开始哦</Alert>
    <Alert v-model="toLoginF" @on-hide="login">您当前未登录，去登录~</Alert>
  </div>
</template>
<script>
import { Swiper, Tab, TabItem, XDialog, Alert } from "vux";
import { queryGroupCommidity, queryJoinList } from "../api/pageApi.js";
import { mapState } from "vuex";

var ugroup = navigator.userAgent;
var isAndroidGroup = ugroup.indexOf("Android") > -1 || ugroup.indexOf("Adr") > -1; //android终端
var isiOSGroup = !!ugroup.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default {
  data() {
    return {
      list: [
        {
          url: "javascript:",
          img: "http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png",
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img: "http://fs.meiduduo.com/shop/SHOP/other/1543392636675.png",
          title: "送你一次旅行",
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        }
      ],
      index: 0,
      clusterNo: 0, // 成团人数
      groupState: "未开始",
      comm: {},
      doctor: {},
      organ: {},
      phoneNumber: null,
      doctorInfo: "",
      joinInfo: "",
      joinList: [], // 拼团列表
      timer: null,
      showItemModal: false,
      nowIndex: null,
      showListModal: false,
      toDefaultBrowser: false,
      shared: false,
      groupNoStart: false,
      userId: -1, // 用户id
      toLoginF: false,
      imgString: '', // 轮播图字符串
    };
  },
  components: {
    Swiper,
    Tab,
    TabItem,
    XDialog,
    Alert
  },
  computed: {
    ...mapState(["shareInfo", 'nowUserInfo'])
  },
  created() {
    // 传参说明：clusterNo 拼团列表成团人数；groupState 拼团列表拼团状态；id 拼团列表拼团活动Id ；groupCommId 拼团列表拼团商品Id；commId: 拼团列表商品id；userId: 当前用户id；cover: 活动封面图片; share：分享是为1，不是分享时0；
    // 路径：http://192.168.1.51:8080/#/groupDetails?clusterNo=2&groupState=%E6%8B%BC%E5%9B%A2%E4%B8%AD&id=170&groupCommId=186&commId=58

    this.clusterNo = this.$route.query.clusterNo;
    this.groupState = this.$route.query.groupState;
    this.userId = Number(this.$route.query.userId)
    this.shared = Number(this.$route.query.share);
    this.getDetail();
    this.getJoinList();
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    login () {
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.toLogin(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.toLogin.postMessage(null);
      }
    },
    handler(index) {
      this.index = index;
    },
    getDetail() {
      queryGroupCommidity({
        id: this.$route.query.id,
        commType: "P",
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }).then(res => {
        if (res.code === 1) {
          let a = res.data;
          this.comm = a.comm ? a.comm : {};
          this.doctor = a.servicePersonal ? a.servicePersonal : {};
          this.organ = a.organ ? a.organ : {};
          if (a.comm.commImg) {
            this.imgString = a.comm.commImg
            let b = a.comm.commImg;
            a.comm.commImg = b.split(",");
            a.comm.imgList = b.split(",").map(el => {
              let a = {};
              a.img = el;
              return a;
            });
          } else {
            this.imgString = ''
            a.comm.commImg = [];
            a.comm.imgList = [];
          }
          if (this.doctor.photo) {
            this.doctor.photo = this.doctor.photo.split(",");
          } else {
            this.doctor.photo = [];
          }
          if (this.organ.introduce) {
            this.organ.introduce = this.organ.introduce.replace(
              /<img(.*?)>/g,
              "<figure><img$1></figure>"
            );
          }
          if (this.comm.commInfo) {
            this.comm.commInfo = this.comm.commInfo.replace(
              /<img(.*?)>/g,
              "<figure><img$1></figure>"
            );
          }
          if (this.doctor.introduce) {
            this.doctor.introduce = this.doctor.introduce.replace(
              /<img(.*?)>/g,
              "<figure><img$1></figure>"
            );
          }
          this.phoneNumber = a.organ.tel;
          this.doctorInfo =
            a.servicePersonal.technicalName +
            " " +
            "擅长：" +
            a.servicePersonal.fields;
        }
      });
    },
    getJoinList() {
      queryJoinList({
        groupCommId: this.$route.query.groupCommId,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }).then(res => {
        if (res.code === 1) {
          this.joinList = [];
          let a = res.data;
          this.joinList = res.data;
          let self = this;
          if (res.data.length) {
            this.timer = setInterval(function() {
              for (var i = 0, j = a.length; i < j; i++) {
                a[i].time = self.dealEndTime(a[i].endTime);
                self.$set(self.joinList, i, a[i]);
              }
            }, 1000);
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }

          if (this.joinList.length) {
            this.joinInfo = `${this.joinList[0].groupNo}人在拼单，可直接参与`;
          } else {
            this.joinInfo = "0人在拼单，可直接参与";
          }
        }
      });
    },
    dealEndTime(value) {
      let times = value.slice(0, 19);
      let val = times.replace(/-/g, "/");
      let a = new Date().getTime();
      let b = new Date(val).getTime();
      let c = b - a;
      let j = Math.floor(c / (24 * 60 * 60 * 1000)); // 天
      let d = Math.floor((c - j * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)); // 时
      let e = Math.floor(
        (c - j * 24 * 60 * 60 * 1000 - d * 60 * 60 * 1000) / (60 * 1000)
      ); // 分
      let f = Math.floor(
        (c - j * 24 * 60 * 60 * 1000 - d * 60 * 60 * 1000 - e * 60 * 1000) /
          1000
      ); // 秒
      let g = d > 9 ? d : "0" + d;
      let h = e > 9 ? e : "0" + e;
      let i = f > 9 ? f : "0" + f;
      return `${j}天${g}:${h}:${i}`;
    },
    toJoin(val, item) {
      if (isAndroidGroup && !this.shared) {
        this.userId = window.android.getUserId()
      }
      if (!this.checkSource()) {
        return;
      }
      if (this.userId == -1) {
        this.login()
        return
      }
      this.nowIndex = val;
      if (item.custId == this.userId) {
        this.showListModal = false;
        this.showItemModal = false;
        let params = {
          groupOrderId: item.orderId
        }
        const navigatorInfo = navigator.userAgent;
        const isAndroid =
          navigatorInfo.indexOf("Android") > -1 ||
          navigatorInfo.indexOf("Adr") > -1; //android终端
        const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.invite(JSON.stringify(params));
        }
        if (isiOS) {
          window.webkit.messageHandlers.invite.postMessage(params);
        }
      } else {
        this.showListModal = false;
        this.showItemModal = true;
      }
    },
    go() {
      if (isAndroidGroup && !this.shared) {
        this.userId = window.android.getUserId()
      }
      if (!this.checkSource()) {
        return;
      }
      if (this.userId == -1) {
        this.login()
        return
      }
      let params = {
        activityId: this.$route.query.id,
        groupOrderId: this.joinList[this.nowIndex].id
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.joinGroup(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.joinGroup.postMessage(params);
      }
      this.showItemModal = false;
    },
    showMore() {
      // this.checkSource()
      this.showItemModal = false;
      this.showListModal = true;
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
        name: this.comm.commName,
        description: this.comm.remark,
        imageUrl: this.comm.commImg[0],
        share: 1
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
    goService() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        description: this.comm.remark,
        imageUrl: this.comm.commImg[0],
        name: this.comm.commName,
        price: this.comm.groupPrice,
        organId: this.organ.id
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.service(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.service.postMessage(params);
      }
    },
    toOrganPage() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        organId: this.organ.id
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
    toDoctorPage() {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        doctorId: this.doctor.id
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.doctorDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.doctorDetail.postMessage(params);
      }
    },
    callPhone() {
      if (!this.checkSource()) {
        return;
      }
      let tel = this.organ.tel.replace(/\ +/g, "");
      let params = {
        phoneNumber: tel
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.call(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.call.postMessage(params);
      }
    },
    startGroupF() {
      if (isAndroidGroup && !this.shared) {
        this.userId = window.android.getUserId()
      }
      if (!this.checkSource()) {
        return;
      }
      if (this.userId == -1) {
        this.login()
        return
      }
      if (this.$route.query.groupState != "拼团中") {
        // 拼团活动未开始时的提示
        this.groupNoStart = true;
        return;
      }
      let params = {
        activityId: this.$route.query.id
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.startGroup(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.startGroup.postMessage(params);
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
          window.location.href = `http://img.meiduduo.com/h5/download.html?path=groupdetails&clusterNo=${self.$route.query.clusterNo}&groupState=${self.$route.query.groupState}&id=${self.$route.query.id}&groupCommId=${self.$route.query.groupCommId}&commId=${self.$route.query.commId}&imgUrl=${self.$route.query.cover}&titleName=${self.comm.commName}&description=${self.comm.remark}`
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
.group-details {
  background-color: #f1f1f1;
  min-height: 100%;
  padding-bottom: 100px;
  width: 100%;
  box-sizing: border-box;
  .details-swiper {
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
      top: 24px;
      left: 30px;
      color: #fff;
      // background-image: url('/static/back.png');
      // background-size: 30px 30px;
      // background-repeat: no-repeat;
      // background-position: center;
    }
    .details-share {
      top: 24px;
      right: 30px;
      color: #fff;
      // background-image: url('/static/share_icon.png');
      // background-size: 30px 30px;
      // background-repeat: no-repeat;
      // background-position: center;
    }
    .product-info {
      width: 100%;
      box-sizing: border-box;
      padding: 32px 33px 19px 33px;
      background-color: #fff;
      p {
        // margin-bottom: 21px;
      }
      p:last-child {
        margin-bottom: 0;
      }
      p.product-info-name {
        font-size: 26px;
        color: #333333;
        span:first-child {
          font-weight: bold;
        }
      }
      p.product-info-price {
        span:first-child {
          font-size: 36px;
          color: #ff4691;
        }
        span:last-child {
          font-size: 24px;
          color: #999;
          margin-left: 16px;
        }
      }
      p.product-info-other {
        font-size: 24px;
        color: #999;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
      }
    }
  }
  .details-servies {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 31px 37px 31px;
    font-size: 24px;
    color: #666;
    background-color: #fff;
    > label {
      color: #333;
      font-weight: bold;
      margin-right: 29px;
    }
  }
  .details-groups {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 34px 0 33px;
    > .doctor-info {
      padding-bottom: 24px;
      // background-image: url('/static/bg.png');
      // background-size: 14px 21px;
      // background-repeat: no-repeat;
      // background-position: right;
    }
    > .groups-list {
      font-size: 26px;
      color: #333;
      > .groups-list-item {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        padding: 12px 0 16px 0;
        > figure {
          display: inline-block;
          width: 92px;
          height: 92px;
          border-radius: 100%;
          margin-right: 17px;
          > img {
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        .groups-list-item-user {
          flex: 1;
          -webkit-flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        > p {
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          -webkit-flex-direction: column;
          align-items: flex-end;
          -webkit-align-items: flex-end;
          margin-right: 21px;
          width: 210px;
          > span:last-child {
            font-size: 22px;
            color: #999;
          }
        }
        > .groups-list-item-btn {
          color: #fff;
          padding: 16px 29px 17px 32px;
          background-color: #ff4691;
          border-radius: 10px;
        }
      }
    }
  }
  .details-organ {
    font-size: 24px;
    color: #666;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 33px 30px 31px;
    .common-box-style {
      > figure {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin-right: 24px;
        > img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      > div {
        > p {
          line-height: 32px;
        }
        > p:first-child {
          margin-bottom: 17px;
        }
      }
    }
  }
  .details-comments {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 24px;
    color: #333;
    .details-comments-main {
      width: 100%;
      box-sizing: border-box;
      padding: 23px 33px 0 31px;
      .details-commtens-header {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 47px;
        .doctor-info {
          padding-top: 0;
          padding-bottom: 32px;
        }
        .commtens-info {
          > span {
            color: #666;
            padding: 0 23px 0 27px;
            height: 44px;
            border-radius: 22px;
            line-height: 44px;
            background-color: #f1f1f1;
            margin-right: 18px;
            display: inline-block;
            margin-bottom: 33px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    .details-commtens-btn {
      font-size: 24px;
      color: #ff4691;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      padding: 26px 0 31px 0;
      > img {
        display: inline-block;
        width: 14px;
        height: 19px;
      }
    }
  }
  .tab-main {
    .details-content {
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      padding: 41px 33px 25px 31px;
      font-size: 24px;
      color: #555;
      > label {
        font-size: 26px;
        color: #333;
        margin-bottom: 30px;
        margin-top: 43px;
        border-left: 7px solid #ff4691;
        padding-left: 25px;
        display: block;
        &:first-child {
          margin-top: 0;
        }
      }
      > figure {
        width: 100%;
        display: inline-block;
        > img {
          width: 100%;
          display: inline-block;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .details-commtens-box {
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      padding: 41px 33px 25px 31px;
      font-size: 24px;
      color: #333;
    }
  }
  .aside-btns {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    display: -webkit-flex;
    align-items: stretch;
    -webkit-align-items: stretch;
    > div {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -webkit-flex-direction: column;
      align-items: center;
      -webkit-align-items: cetner;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      box-sizing: border-box;
      &.aside-btn-item-one {
        padding: 15px 0 10px 0;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
        font-size: 22px;
        color: #666;
      }
      > img {
        display: block;
        width: 36px;
        height: 36px;
        & + span {
          font-size: 22px;
          color: #666;
        }
      }
      > span.aside-btn-item {
        font-size: 28px;
        color: #fff;
      }
    }
    .call-btn {
      background-image: url("http://img.meiduduo.com/images/shop/call.png");
      background-size: 36px 36px;
      background-repeat: no-repeat;
      background-position: center top;
      background-origin: content-box;
    }
    .service-btn {
      background-image: url("http://img.meiduduo.com/images/shop/message_b.png");
      background-size: 36px 36px;
      background-repeat: no-repeat;
      background-position: center top;
      background-origin: content-box;
    }
  }
}

.vux-tab {
  background-color: transparent !important;
}

.doctor-info {
  font-size: 24px;
  color: #666;
  width: 100%;
  box-sizing: border-box;
  padding-top: 29px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  // background-image: url('/static/bg.png');
  // background-size: 14px 21px;
  // background-repeat: no-repeat;
  // background-position: right center;
  // background-origin: content-box;
  > img {
    display: inline-block;
    width: 14px;
    height: 19px;
  }
}
.details-commten-item {
  margin-bottom: 38px;
  > img {
    display: inline-block;
    width: 66px;
    height: 66px;
    border-radius: 100%;
    margin-right: 20px;
  }
  > div {
    .user-info {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      align-items: center;
      -webkit-align-items: center;
      margin-bottom: 34px;
      > span:first-child {
        color: #3f6ba6;
        font-size: 26px;
        font-weight: bold;
      }
      > span:last-child {
        display: inline-flex;
        display: -webkit-inline-flex;
        align-items: center;
        -webkit-align-items: center;
        > img {
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-right: 8px;
        }
      }
    }
    .commten-content {
      color: #333;
      margin-bottom: 19px;
    }
    .commten-other {
      font-size: 22px;
      color: #999;
    }
    .commten-imgs {
      margin-top: 22px;
      > img {
        display: inline-block;
        width: 186px;
        height: 186px;
        border-radius: 10px;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .commten-review {
      margin-top: 24px;
      background-color: #f1f1f1;
      font-size: 24px;
      color: #666;
      width: 100%;
      box-sizing: border-box;
      padding: 22px;
      border-radius: 10px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: -20px;
        display: block;
        border: 12px solid #f1f1f1;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
      }
    }
  }
}

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
.organ-name {
  font-size: 30px;
  color: #333;
  font-weight: bold;
}
.item-modal-box {
  width: 580px;
  min-height: 450px;
  margin: 0 auto;
  border-radius: 15px;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  > p {
    text-align: center;
  }
  .modal_cancel {
    width: 58px;
    height: 58px;
    position: absolute;
    top: -29px;
    right: -29px;
    background-image: url("http://img.meiduduo.com/images/shop/cancel.png");
    background-size: 58px 58px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .item-modal-title {
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
  }
  .item-modal-info {
    font-size: 28px;
    color: #666;
    > span {
      color: #ff4691;
    }
  }
  .item-modal-btn {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background-color: #ff4691;
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    border-radius: 10px;
  }
}
.user-icons {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  margin-bottom: 42px;
  margin-top: 42px;
  .active {
    border: 2px solid #ff4691;
  }
  .user-own {
    position: relative;
    width: 100px;
    height: 100px;
    &::after {
      content: "拼主";
      color: #fff;
      background-color: #ff4691;
      width: 56px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 20px;
      border-radius: 32px;
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      box-shadow: 0 -2px 3px #fff;
    }
    > figure {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      box-sizing: border-box;
      display: inline-block;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        display: inline-block;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    box-sizing: border-box;
    background-image: url("http://img.meiduduo.com/images/shop/other.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  figure {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    box-sizing: border-box;
    display: inline-block;
  }
}
.list-modal-box {
  width: 580px;
  height: 780px;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #fff;
  position: relative;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  .modal_cancel {
    width: 58px;
    height: 58px;
    position: absolute;
    top: -29px;
    right: -29px;
    background-image: url("http://img.meiduduo.com/images/shop/cancel.png");
    background-size: 58px 58px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .list-modal-header {
    font-size: 36px;
    color: #333;
    height: 103px;
    box-sizing: border-box;
    line-height: 103px;
    text-align: center;
    border-bottom: 1px solid #d3d3d3;
  }
  .list-modal-info {
    font-size: 22px;
    color: #999999;
    text-align: center;
    height: 73px;
    box-sizing: border-box;
    line-height: 73px;
  }
  .list-modol-area {
    flex: 1;
    -webkit-flex: 1;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 0 19px;
    .list-modal-item {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      font-size: 22px;
      color: #999;
      padding: 19px 0;
      border-bottom: 1px solid #f0f0f0;
      > figure {
        display: inline-block;
        width: 92px;
        height: 92px;
        border-radius: 100%;
        margin-right: 17px;
        > img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      .list-item-infos {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        align-items: flex-start;
        -webkit-align-items: flex-start;
      }
      .list-modal-btn {
        display: block;
        width: 120px;
        height: 58px;
        border-radius: 10px;
        background-color: #ff4691;
        color: #fff;
        text-align: center;
        line-height: 58px;
      }
    }
  }
}
.list-item-name {
  font-size: 26px;
  color: #333;
  width: 200px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style scoped>
.organ-introduce,
.server-introduce,
.doctor-introduce {
  width: 100%;
  box-sizing: border-box;
}
.organ-introduce >>> figure,
.server-introduce >>> figure,
.doctor-introduce >>> figure {
  width: 100%;
  display: block;
}
.organ-introduce >>> img,
.server-introduce >>> img,
.doctor-introduce >>> img {
  width: 100%;
  display: block;
}
/* .organ-introduce >>> .ql-align-center {
  width: 100%;
}
.organ-introduce >>> .ql-align-center > img {
  width: 100%;
} */
</style>

