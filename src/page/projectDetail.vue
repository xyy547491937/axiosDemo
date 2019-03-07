<template>
  <div :class="{'vo':!platform}">
    <!-- banner -->
    <div class="banner">
      <swiper :list="imgsrc" :auto="true" :loop="true" height="365px" dots-position="center"></swiper>
      <div class="PD-back flex-r" @click="pageBack" v-if="0">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div class="PD-share flex-r" @click="shareHandle" v-if="0">
        <span class="iconfont icon-iconfontfenxiang3"></span>
      </div>
    </div>
    <!-- commType 0产品 1服务 -->
    <!-- 商品介绍 -->
    <div class="project-introduce-box flex-c">
      <!-- 标题 -->
      <div class="project-title flex-r">
        <div class="title-price">
          <!-- title -->
          <p class="title-p xyy-ellipsis-2">
            <span class="bold-font">[{{comm.commName}}]</span>
            <span>{{comm.remark}}</span>
          </p>
          <!-- price -->
          <div class="price flex-r">
            <div class="f-price flex-r">
              <span>￥</span>
              <span>{{comm.rulePrice }}</span>
              <!-- <p class="s-price"> -->
              <a href="javascript:void(0);">￥{{comm.price}}</a>
              <!-- </p> -->
            </div>
          </div>
        </div>

        <!-- 收藏 -->
        <p class="flex-c collection vux-1px-l" @click="favoriteProduct">
          <span
            class="iconfont icon-shoucang1"
            style="color:#999; font-size:18px"
            v-if="!comm.favourite"
          ></span>
          <span class="iconfont icon-zan1" style="color:#ff4691; font-size:20px" v-else></span>
          <span>{{comm.favourite?"已收藏":"收藏"}}</span>
        </p>
      </div>
      <!-- 距离 -->
      <div class="distance flex-r">
        <p>
          <span>距离</span>
          <span>{{comm.distance}}</span>
        </p>
        <p>{{comm.buyNum }}人购买</p>
      </div>
    </div>
    <!-- 数量 服务，分享 -->
    <div class="server-box no-bottom-padding clear-bottom-margin">
      <!-- 数量 -->
      <!-- v-if="comm.commType==1" -->
      <div class="project-num flex-r" v-if="comm.commType==1">
        <span class="server-title">数量</span>
        <div class="server-list">
          <inputNumber :addNum="true" @addnum="addnum"/>
        </div>
      </div>
      <!-- 付款 -->
      <div class="project-num pay-money flex-r">
        <span class="server-title">付款</span>
        <div class="server-list">
          <inputNumber :sel="true" :comm="comm" @payType="payType" :organType="organ.organType"/>
        </div>
      </div>
      <div class="vux-1px-b" style="margin-bottom:30px;"></div>
      <!-- 服务 -->
      <div
        class="project-num flex-r"
        v-if="comm.isInsurance ||comm.isStage ||comm.isRecommend ||comm.isPrefer||comm.isHot "
      >
        <span class="server-title">服务</span>
        <div class="server-list-c server-list flex-r">
          <p class="flex-r server-item" v-if="comm.isRecommend ">
            <span class="icon-ser"></span>
            <span style="margin-left:5px;">推荐</span>
          </p>
          <p class="flex-r server-item" v-if="comm.isInsurance">
            <span class="icon-ser"></span>
            <span style="margin-left:5px;">保险</span>
          </p>
          <p class="flex-r server-item" v-if="comm.isStage ">
            <span class="icon-ser"></span>
            <span style="margin-left:5px;">分期</span>
          </p>
          <p class="flex-r server-item" v-if="comm.isPrefer ">
            <span class="icon-ser"></span>
            <span style="margin-left:5px;">优选</span>
          </p>
          <p class="flex-r server-item" v-if=" comm.isHot ">
            <span class="icon-ser"></span>
            <span style="margin-left:5px;">热卖</span>
          </p>
        </div>
      </div>
      <!-- 优惠券 -->
      <!-- 新增功能优惠券 -->
      <!-- 假如返回数组为空  不显示，否则显示-->
      <div class="project-num pay-money flex-r" @click="alertCoupon" v-if="couponList.length>0">
        <span class="server-title">促销</span>
        <div class="server-list-c server-list flex-r">
          <!-- 引入sales组件 -->
          <sales :isShow="isShow" :couponList="couponSplit"/>
        </div>
      </div>
    </div>
    <!-- 分享 -->
    <!--  4.1新增 代言费分享功能-->
    <!-- v-if="!comm.endorsementFee==0" -->
    <div class="share-fee server flex-r" v-if="Number(comm.endorsementFee) >0">
      <div class="endorsement flex-r">
        <div class="endorsement-left flex-r">
          <p class="f-btn flex-r">分享</p>
          <p class="share-explain">分享可赚{{comm.endorsementFee}}元代言费</p>
          <figure class="share-icon">
            <img
              src="http://img.meiduduo.com/images/xyy/question.png"
              alt
              width="100%"
              @click.stop="alertExplaintion"
            >
          </figure>
        </div>
        <div class="endorsement-right flex-r" @click.stop="shareHandle">
          <p class="go-share">去分享</p>
          <span class="iconfont icon-Right" style="color:#b27400;font-size:14px;"></span>
        </div>
      </div>
    </div>
    <!-- 机构地址 -->
    <div class="organ-address">
      <div class="organ-inner flex-r" @click.stop="goOrganPage">
        <div class="organ-logo" :style="{backgroundImage:'url('+ organ.logo+') '}">
          <!-- <img :src="organ.logo" alt width="100%"> -->
        </div>
        <!-- <img src="http://fs.meiduduo.com/oa/OA/other/1540965870749.png" alt> -->
        <div class="organ-detail">
          <p>{{organ.organName}}</p>
          <p>
            <span>资质:</span>
            <span>{{organ.aptitude}}</span>
          </p>
          <p>
            <span>地址：</span>
            <span class="c">{{organ.address}}</span>
          </p>
        </div>
      </div>
      <!--  医生 -->
      <div class="doctor flex-r" @click.stop="goDoctorPage">
        <div class="doctor-cen xyy-ellipsis-1 flex-r">
          <p style="display:inline-block">
            <span>{{servicePersonal.personalName}}</span>
            <span>{{servicePersonal.technicalName}}</span>
          </p>
          <p style="margin-left:15px;display:inline-block" class="xyy-ellipsis-1">
            <span>擅长：</span>
            <span class="c">{{servicePersonal.fields}}</span>
          </p>
        </div>

        <span class="iconfont icon-Right" style="color:#999;font-size:14px;"></span>
      </div>
    </div>
    <!-- 评价 -->
    <!-- !TODO 目前没有数据，先取消 -->
    <!-- <div class="c">
      <comment/>
    </div>-->
    <!-- tab -->
    <div class="c">
      <tab :line-width="3" custom-bar-width="60px" active-color="#ff4691">
        <tab-item v-for="(v,i) in tabArr3" :key="i" @on-item-click="getIndex(v,i)">{{v.title}}</tab-item>
      </tab>
      <!-- 服务介绍 -->
      <div class="server-intro tab-item1" v-show="activeId==1">
        <!-- 服务介绍 -->
        <div class="co">
          <h4 class="server-title">服务介绍</h4>
          <p class="c co-p" v-html="comm.commInfo"></p>
          <!-- <rich-text :nodes="pointDetail.activityRule"></rich-text> -->
        </div>
        <!-- 医生介绍 -->
        <!-- <div class="co">
          <h4 class="server-title">医生介绍</h4>
          <p class="c co-p" v-html="servicePersonal.introduce"></p>
        </div>-->
        <!-- 医院介绍 -->
        <!-- <div class="co">
          <h4 class="server-title">医院介绍</h4>
          <p class="c co-p" v-html="organ.introduce"></p>
        </div>-->
        <!-- 版权声明 -->
        <div class="co">
          <h4 class="server-title">版权声明</h4>
          <p class="c co-p">如在胚豆发布的“胚豆网上内容”涉及知识产权争议等问题，请相关权利人或利害关系人与胚豆网联系。</p>
        </div>
        <!-- 免责声明 -->
        <div class="co">
          <h4 class="server-title">免责声明</h4>
          <p class="c co-p" v-if="organ.organType == 1">该服务项目需您与医生当面沟通咨询方能最终确定治疗方案，本站所载内容仅供参考。</p>
          <p class="c co-p" v-else>该服务为线下服务，本站所载内容仅供参考。</p>
        </div>
      </div>
      <!-- 科普 -->
      <div class="tab-item1" v-show="activeId==2">
        <div style="font-size: 14px; padding:15px;">胚豆百科带您了解该项目的操作方法、术后效果、恢复时间、术后护理等相关知识</div>
        <hr style="border:none;border-top:10px solid #F1F1F1;">
        <div class="comm_explain">
          <p>项目概览</p>
          <!--<div class="exp_abstract">
									<p>项目简介</p>
									<span>
										操作过程简单，创伤较小，深受年轻一族爱美人士所喜爱。
									</span>
          </div>-->
          <div class="exp_abstract">
            <p>项目简介</p>
            <!-- v-html="comm.reserveProcess -->
            <span v-html="comm.reserveProcess"></span>
          </div>
        </div>
        <!-- 医美 的固值1533971621599  -->
        <!-- 当商品的channelCode ==固执 是显示治疗档案 -->
        <!-- v-if="comm.channelCode== '1533971621599'" -->
        <div class="comm_explain1" v-if="comm.channelCode== '1533971621599'">
          <div class="explain_tit">
            <!-- <figure >
                <img
              src="http://img.meiduduo.com/images/productDetails/comm11.png"
              width="15"
              height="17"
            >
            </figure>-->
            <div class="dangan-img"></div>
            <span class="c">治疗档案</span>
          </div>
          <ul>
            <li>
              <span>单次治疗时长</span>
              <div>{{comm.onceTreatmentTime }}</div>
            </li>
            <li>
              <span>治疗次数</span>
              <div>{{comm.treatmentNum }}次</div>
              <!-- <div class="c">哈哈</div> -->
            </li>
            <li>
              <span>效果持续时间</span>
              <div>{{comm.durationTime }}</div>
            </li>
            <li>
              <span>麻醉方式</span>
              <div>{{comm.anesthesia }}</div>
            </li>
            <li>
              <span>恢复过程</span>
              <div>{{comm.recoveryProcedure }}</div>
            </li>
            <li>
              <span>达到效果时间</span>
              <div>{{comm.finishTime }}</div>
            </li>
            <li>
              <span>疤痕情况</span>
              <div>{{comm.scar }}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 流程 -->
      <div class="c tab-item1" v-show="activeId==3">
        <div class="order">
          <div class="link">预定须知</div>

          <div>
            <div class="order-title">服务项目</div>
            <p>{{comm.projectName}}</p>
          </div>
          <div>
            <div class="order-title">通过胚豆预定</div>
            <p>
              全款需支付
              <span>¥{{comm.rulePrice}}</span>
              订金需支付
              <span>¥{{comm.depositPrice}}</span>
              到院支付剩余
              <span>¥{{hospitalPay}}</span>
            </p>
          </div>
          <div>
            <div class="order-title">使用规则</div>
            <p ref="useRule" v-html="comm.useRule"></p>
          </div>
        </div>
      </div>
      <!-- 评价 -->
      <!-- !TODO 目前没有数据，先取消 -->
      <div class="v tab-item1" v-show="activeId==4">
        <comment/>
      </div>
      <!-- 日记 -->
      <div class="c tab-item1" v-show="activeId==5">
        <activeDiary :diaryValue="diaryValue" :shared="shared"/>
        <div v-if="activeId==5&&diaryValue.length == 0" class="nodata">
          <figure>
            <img src="http://img.meiduduo.com/images/nodata.png">
          </figure>
        </div>
      </div>
    </div>

    <!-- TODO: 隐藏推荐商品 -->
    <!-- <div class="propose-pro" v-if="true"> -->
    <div class="propose-pro" v-if="proposeArr.length>0">
      <!-- 猜你喜欢 -->
      <div class="guess-like">
        <span></span>
        <p>猜你喜欢</p>
        <span></span>
      </div>
      <!-- <i-divider color="#ed3f14" lineColor="#ed3f14">猜你喜欢</i-divider> -->
      <!-- 商品列表 -->
      <div class="product-box">
        <div class="product-list">
          <commodityCard
            v-for="(v,i) in proposeArr1"
            :key="i"
            :data="v"
            :shop="true"
            @jump="guessJump"
          />
        </div>
        <div class="product-list">
          <commodityCard
            v-for="(v,i) in proposeArr2"
            :key="i"
            :data="v"
            :shop="true"
            @jump="guessJump"
          />
        </div>
      </div>
    </div>
    <!-- 优惠券弹窗 -->
    <div class="cover" v-show="couponShow" @click.stop="alertCoupon">
      <div class="coupon-alert">
        <div class="c-box flex-c">
          <div class="coupon-title">促销</div>
          <p class="flex-r" style="width:100%;margin-bottom:15px">
            <span class="coupon-icon"></span> 购买该商品后即可领取以下优惠券
          </p>
          <div scroll-y class="pd-src">
            <div class="coupon-lists">
              <!-- 引入组件 -->
              <div class="cp" v-for="(v,i) in couponList" :key="i">
                <voucher :voucher="v" @getVoucher="getVoucher" @useVoucher="useVoucher"/>
              </div>
            </div>
          </div>
        </div>

        <!-- button -->
        <div class="btn-fix">
          <div class="PD-sub-btn" @click.native="alertCoupon">完成</div>
        </div>
      </div>
    </div>

    <!-- 4.1新增分享代言费 -->
    <!-- 阻止默认滑动 -->
    <div class="cover" v-show="explainShow" @click.stop="alertExplaintion">
      <div class="consultative">
        <h2 class="consultative-title">代言费说明</h2>
        <p class="consultative-content">您的好友通过您分享的链接下单并到店消费，您即可获得代言费。</p>
        <div class="PD-sub-btn consultative-btn" @click.stop="alertExplaintion">知道了</div>
        <div class="close-btn" @click.stop="alertExplaintion">&times;</div>
      </div>
    </div>

    <!-- 立即购买 &&加入购物车 -->
    <div class="footer vux-1px-t flex-r" v-if="!platform">
      <div class="footer-icons flex-r">
        <div class="icon-box flex-c" @click.stop="callPhone">
          <p class="icons icon-phone"></p>
          <span>电话</span>
          <!-- <a :href="'tel:'+organ.tel">dsf</a> -->
        </div>
        <div class="icon-box flex-c" @click.stop="servicePeople">
          <p class="icons icon-server"></p>
          <span>客服</span>
        </div>
        <div class="icon-box flex-c" @click.stop="appointment">
          <p class="icons icon-attion"></p>
          <span>预约</span>
        </div>
      </div>
      <div class="footer-cart flex-r">
        <p class="flex-r" @click.stop="addCart">+购物车</p>
        <p class="flex-r" @click.stop="quickBuy">立即购买</p>
      </div>
    </div>
    <!-- 弹出框 -->
    <toast v-model="show8" type="success" text="加入成功"/>
    <!-- 分享 -->
    <actionsheet v-model="actionShow" :menus="shareMadio" show-cancel></actionsheet>
    <!-- 优惠券弹窗 -->
    <toast v-model="alertCouponShow" type="text" :time="1000">购买后可领取</toast>
    <!-- 调到登录界面 -->
    <div v-transfer-dom>
      <confirm v-model="toLoginShow" title="您当前未登录" @on-confirm="onConfirm">
        <p style="text-align:center;">是否去登录</p>
      </confirm>
    </div>

    <Alert v-model="toDefaultBrowser">点击右上角选择在浏览器打开~~</Alert>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  Swiper,
  Tab,
  TabItem,
  Toast,
  Msg,
  Actionsheet,
  Confirm,
  TransferDom,
  Alert
} from "vux";
import inputNumber from "../components/inputNumber.vue";
import comment from "../components/comment.vue";
import activeDiary from "../components/activeDiary.vue";
import sales from "../components/sales.vue";
import voucher from "../components/voucher.vue";
import commodityCard from "../components/commodityCard.vue";
import { http } from "../api/pageApi.js";
const imgList = [
  "http://fs.meiduduo.com/shop/SHOP/other/1543392636675.png",
  "http://fs.meiduduo.com/shop/SHOP/other/1543392636675.png",
  "http://fs.meiduduo.com/shop/SHOP/other/1543392636675.png"
];
const demoList = imgList.map((one, index) => ({
  url: "javascript:",
  img: one
}));

var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default {
  data() {
    return {
      imgList: demoList,
      tabArr: [
        {
          title: "项目详情",
          id: 1
        },
        {
          title: "使用须知",
          id: 2
        },
        {
          title: "常见问题",
          id: 3
        },
        // { title: "评价", id: 4 },
        {
          title: "日记",
          id: 5
        }
      ],
      tabArr2: [
        {
          title: "详情",
          id: 1
        },
        {
          title: "评价",
          id: 4
        }
      ],
      tabArr3: [],
      proposeArr: [],
      proposeArr1: [],
      proposeArr2: [],
      comm: {},
      organ: {},
      servicePersonal: {},
      couponList: [],
      explainShow: false,
      diaryValue: [],
      activeIndex: 0,
      activeId: 1,
      couponShow: false,
      isShow: true,
      payMethod: 1,
      num: 1, //项目数量
      imgsrc: [],
      show8: false,
      toLoginShow: false,
      actionShow: false,
      alertCouponShow: false,
      shared: 0,
      toDefaultBrowser: false,
      shareMadio: {
        menu1: "分享到朋友圈",
        menu2: "分享给好友"
      },
      userId: -1,
      platform: ""
    };
  },
  components: {
    Swiper,
    inputNumber,
    activeDiary,
    Tab,
    TabItem,
    comment,
    sales,
    voucher,
    Confirm,
    Toast,
    Msg,
    Actionsheet,
    TransferDom,
    Alert,
    commodityCard
  },
  directives: {
    TransferDom
  },
  created() {
    this.saveStore();
    this.saveTokenStore();
    this.shared = Number(this.$route.query.share);
    this.platform = this.$route.query.platform;
    // this.getDetail();
  },
  computed: {
    ...mapState(["userInfo", "shareInfo"]),
    hospitalPay() {
      return (this.comm.rulePrice - this.comm.depositPrice).toFixed(2);
    },
    couponSplit() {
      // let a = this.couponList;
      let a = [...this.couponList];
      return a.splice(0, 3);
    },
    oldMoney() {
      let n = 0;
      if (this.comm.commType == 1) {
        if (this.payMethod == 1) {
          // 0定金，1全款
          n = this.comm.rulePrice;
        } else {
          n = this.comm.depositPrice;
        }
      } else {
        n = this.comm.rulePrice;
      }
      return n;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDetail();
    });
  },
  methods: {
    ...mapMutations(["saveUserId", "saveToken"]),
    stopTouch() {
      // document.getElementsByTagName('body').style
    },

    alertCoupon() {
      this.couponShow = !this.couponShow;
      if (this.couponShow) {
        this.move();
      } else {
        console.log("进入move");
        this.stop();
      }
    },
    /***滑动限制***/
    stop() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "";
      document.body.style.position = "";
      if (isAndroid) {
        window.android.hideCouponList(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.hideCouponList.postMessage(null);
      }

      // document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    /***取消滑动限制***/
    move() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      if (isAndroid) {
        window.android.showCouponList(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.showCouponList.postMessage(null);
      }

      // document.removeEventListener("touchmove", mo, false);
    },
    move1() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
    },
    stop1() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.body.style.position = "";
    },
    alertExplaintion() {
      this.explainShow = !this.explainShow;
      if (this.explainShow) {
        this.move1();
      } else {
        this.stop1();
      }
    },
    saveStore() {
      // if (this.$route.query.userId == -1) {
      //   this.saveUserId("");
      // } else {
      //   this.saveUserId(this.$route.query.userId);
      // }
      if (this.$route.query.userId != -1) {
        this.saveUserId(this.$route.query.userId);
      } else if (this.userId != -1) {
        this.saveUserId(this.userId);
      } else {
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
    isProduct() {
      let a = [...this.tabArr];
      let b = [...this.tabArr2];
      if (this.comm.commType == 1) {
        this.tabArr3 = a;
      } else {
        this.tabArr3 = b;
      }
    },
    getDetail() {
      http(
        "commodity/getCommodityInfo",

        {
          id: this.$route.query.id,
          userId: this.userInfo.custId || "",
          lat: this.$route.query.lat || "",
          lng: this.$route.query.lng || "",
          token: this.userInfo.token
        }
      ).then(res => {
        if (res.code == 1) {
          const { comm, organ, servicePersonal, couponList } = res.data;
          couponList.forEach(v => {
            v.state = -3;
          });
          this.comm = comm;
          this.organ = organ;
          this.couponList = couponList;
          this.servicePersonal = servicePersonal;
          // this.$set(this, "servicePersonal", servicePersonal);
          let a = comm.commImg.split(",");
          const demoList = a.map((one, index) => ({
            url: "javascript:",
            img: one
          }));
          this.$set(this, "imgsrc", demoList);
          // console.log(this.imgsrc);
          // 距离显示一位小数
          this.$set(
            this.comm,
            "distance",
            this.comm.distance
              ? this.comm.distance.toFixed(1) + "km"
              : "距离太远"
          );
          // 代言费保留两位小数
          this.$set(
            this.comm,
            "endorsementFee",
            Number(this.comm.endorsementFee).toFixed(2)
          );
          this.isProduct();
          // this.tablist(this.comm);
          // this.NounInterpretation();
          this.getDiary();
          // this.getTaskId();
          // this.isTaskId();
          // TODO: 推荐阅读接口
          this.guessLike();
          // TODO: 推荐阅读接口
          this.shareDetail(this.comm);
        }
      });
    },
    //获取日记列表   POST /diary/queryOneByPkAndUserId
    getDiary() {
      http("diaryBook/list4PageForDiaryBook", {
        // personalName: this.severPersonal.personalName
        commId: this.comm.id || "",
        auditState: 1,
        custId: this.userInfo.custId
      }).then(res => {
        //   console.log(res);
        if (res.code == 1) {
          this.diaryValue = res.data.data;
        }
      });
    },
    onConfirm() {
      // this.toLoginShow = true;
      console.log("点击确认");
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
    //点击收藏
    favoriteProduct() {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
      }
      if (!this.checkSource()) {
        return;
      }
      // 用户登录
      if (this.userInfo.custId || this.userId != -1) {
        http("storeRecord/save", {
          recordId: this.comm.id,
          custId: this.userInfo.custId, //模拟用户id
          recordType: 3, //3:商品; 4:资讯; 9:小视频
          state: this.comm.favourite ? "-1" : "1"
        }).then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.comm.favourite = !this.comm.favourite;
          }
        });
      } else {
        //假如用户没有登陆
        // if (isAndroid) {
        //   window.android.toLogin(null);
        // }
        // if (isiOS) {
        //   window.webkit.messageHandlers.toLogin.postMessage(null);
        // }
        this.toLoginShow = true;
      }
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
    // 医生主页
    goDoctorPage() {
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid) {
        window.android.doctorDetail(
          JSON.stringify({
            doctorId: this.servicePersonal.id
          })
        );
      }
      if (isiOS) {
        window.webkit.messageHandlers.doctorDetail.postMessage({
          doctorId: this.servicePersonal.id
        });
      }
    },
    // 机构主页
    goOrganPage() {
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid) {
        window.android.organDetail(
          JSON.stringify({
            organId: this.organ.id
          })
        );
      }
      if (isiOS) {
        window.webkit.messageHandlers.organDetail.postMessage({
          organId: this.organ.id
        });
      }
    },
    // 预约
    appointment() {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
      }
      let params = {
        organId: this.organ.id,
        organName: this.organ.organName,
        projectName: this.comm.commName,
        // commodityId: this.comm.id,
        projectId: this.comm.projectId ? this.comm.projectId : ""
      };
      if (!this.checkSource()) {
        return;
      }
      if (this.userInfo.custId || this.userId != -1) {
        if (isAndroid) {
          window.android.appointment(JSON.stringify(params));
        }
        if (isiOS) {
          window.webkit.messageHandlers.appointment.postMessage(params);
        }
      } else {
        //假如用户没有登陆
        // if (isAndroid) {
        //   window.android.toLogin(null);
        // }
        // if (isiOS) {
        //   window.webkit.messageHandlers.toLogin.postMessage(null);
        // }
        this.toLoginShow = true;
      }
    },
    // 客服
    servicePeople() {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
      }
      let params = {
        price: this.comm.rulePrice,
        name: this.comm.commName,
        description: this.comm.remark,
        imageUrl: this.imgsrc[0].img,
        organId: this.organ.id
      };
      if (!this.checkSource()) {
        return;
      }
      if (this.userInfo.custId || this.userId != -1) {
        if (isAndroid) {
          window.android.service(JSON.stringify(params));
        }
        if (isiOS) {
          window.webkit.messageHandlers.service.postMessage(params);
        }
      } else {
        this.toLoginShow = true;
      }
    },

    //接受子组件传过来的支付方式
    payType(msg) {
      this.payMethod = msg;
      console.log(this.payMethod);
    },
    //获得子组件的参数
    addnum(msg) {
      this.num = msg;
      console.log(this.num);
    },
    getIndex(item, index) {
      // console.log(index);
      this.activeIndex = index;
      this.activeId = item.id;
    },
    getVoucher() {
      this.alertCouponShow = true;
      console.log("购买后可领取");
    },
    useVoucher(msg) {
      console.log("去优惠券详情");
      console.log(msg);
      let couponId = JSON.parse(msg).couponId;
      console.log(couponId);
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid) {
        window.android.couponDetail(
          JSON.stringify({
            couponId: couponId
          })
        );
      }
      if (isiOS) {
        window.webkit.messageHandlers.couponDetail.postMessage({
          couponId: couponId
        });
      }
    },

    /*
      @ 加入购物车
      @ 加入成功后跳转
      @ 弹出提时
    actions
    */
    addCart() {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
      }
      if (!this.checkSource()) {
        return;
      }
      if (this.userInfo.custId || this.userId != -1) {
        http("cart/save", {
          organId: this.organ.id,
          commodityId: this.comm.id,
          custId: this.userInfo.custId || this.userId,
          buyType: this.payMethod, //定金0 //全款1
          quantity: this.num,
          oldPrice: this.oldMoney, //加入时的价格
          state: 1
        }).then(res => {
          // console.log(res);

          if (res.code == 1) {
            this.show8 = true;
          }
        });
      } else {
        this.toLoginShow = true;
      }
    },
    // 立即否买
    quickBuy() {
      if (isAndroid && !this.shared) {
        this.userId = window.android.getUserId();
      }
      let params = {};
      if (this.comm.commType == 0) {
        params = {
          id: this.comm.id,
          count: this.num,
          payType: "",
          organId: this.organ.id
        };
      } else {
        params = {
          id: this.comm.id,
          count: this.num,
          payType: this.payMethod,
          organId: this.organ.id
        };
      }
      if (!this.checkSource()) {
        return;
      }
      if (this.userInfo.custId || this.userId != -1) {
        if (isAndroid) {
          window.android.buyNow(JSON.stringify(params));
        }
        if (isiOS) {
          window.webkit.messageHandlers.buyNow.postMessage(params);
        }
      } else {
        this.toLoginShow = true;
      }
    },
    shareHandle() {
      // this.actionShow = true;
      if (!this.checkSource()) {
        return;
      }
      let params = {
        name: this.comm.commName,
        description: this.comm.remark,
        imageUrl: this.imgsrc[0].img
      };
      if (isAndroid) {
        window.android.share(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.share.postMessage(params);
      }
    },

    // 打电话
    callPhone() {
      let tel = this.organ.tel.replace(/\ +/g, "");
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid) {
        window.android.call(
          JSON.stringify({
            phoneNumber: tel
          })
        );
      }
      if (isiOS) {
        window.webkit.messageHandlers.call.postMessage({
          phoneNumber: tel
        });
      }
    },

    //猜你喜欢 2019/1/29 梁台的接口
    guessLike() {
      http("commodity/queryRecommendCommodity", {
        userId: this.userInfo.custId,
        categoryId: this.comm.categoryId ? this.comm.categoryId : "",
        organId: this.organ.id,
        id: this.comm.id
      }).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.proposeArr = res.data;

          res.data.forEach((v, i) => {
            v.commImg = v.commImg.split(",");
            if (i % 2) {
              this.proposeArr1.push(res.data[i]);
            } else {
              this.proposeArr2.push(res.data[i]);
            }
          });
        }
      });
    },
    //点击跳转
    guessJump(val) {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        commId: val.id,
        commName: val.commName,
        remark: val.remark,
        commImg: val.commImg[0]
      };
      if (isAndroid) {
        window.android.hotProjectDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.hotProjectDetail.postMessage(params);
      }
    },

    // 数据加载完调APP方法
    shareDetail(item) {
      let params = {
        name: item.commName,
        description: item.remark,
        imageUrl: item.commImg.split(",")[0]
      };
      // console.log(params);
      if (isAndroid) {
        // window.android.hotProjectDetail(JSON.stringify(params));
        window.android.shareDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.shareDetail.postMessage(params);
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
          window.location.href = `http://img.meiduduo.com/h5/download.html?path=projectdetail&id=${
            self.$route.query.id
          }&imgUrl=${self.comm.commImg}&titleName=${
            self.comm.commName
          }&description=${self.comm.remark}`;
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
    }
  }
};
</script>
<style>
.co-p img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>

<style lang="less" scoped>
@import url("../style/style.less");
@import url("../style/projectDetail.less");
.nodata {
  background: #fff;
  height: 450px;
  figure {
    display: block;
    margin: 0 auto;
    width: 192px;
    padding-top: 50px;
    > img {
      width: 100%;
    }
  }
}
.vux-tab {
  background-color: @cof5;
}

.co-p {
  overflow: hidden;
}

.clear-bottom-margin:after {
  display: table;
  content: "";
}

.vo {
  padding-bottom: 100px;
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

@font12: 12px * 2;

.baseconfig {
  padding: 20px 15 * 2px;
  font-size: @baseSize*2;
  color: @baseFirstTitleColor;
  background-color: @base-white;
  margin-bottom: 10px * 2;
}

.bold-font {
  font-weight: bold;
}

.project-introduce-box {
  &:extend(.baseconfig);

  & > .project-title {
    justify-content: space-between;
    align-items: flex-start;

    & > .title-price {
      width: 85%;
      padding-right: 10px;

      & > .title-p {
        // padding: 16px * 2 0;
      }

      & .price {
        color: @baseColor;
        align-items: center;

        & .f-price {
          align-content: flex-end;
          align-items: baseline;

          & > span:first-child {
            font-size: 18px * 2;
          }

          & > span:nth-child(2) {
            font-size: 24px * 2;
          }

          // & > .s-price {

          & > a {
            font-size: 24px;
            margin-left: 15px;
            color: @baseTextColor-c;
            text-decoration: line-through;
          }

          // }
        }
      }
    }

    // 收藏
    .collection {
      color: @baseTextColor-c;
      width: 15%;
      align-items: center;
      //   border-left: 1px solid #f1f1f1;
    }
  }

  & > .distance {
    padding-top: 15px;
    justify-content: space-between;
    align-items: center;
    color: @baseTextColor-c;
    font-size: @font12;
  }
}

// 服务，数量
.server-box {
  &:extend(.baseconfig);
  margin-bottom: 0;

  & .server-title {
    font-weight: bold;
    font-size: 23px;
  }

  & > .project-num {
    &:before {
      content: "";
      display: block;
      width: 10px;
      height: 29px;
      background-color: #73dacf;
      position: absolute;
      left: -2px;
      //   top: 20rpx;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    margin-bottom: 40px;
    align-items: center;

    & .server-title {
      width: 20%;
    }

    & .server-list {
      // margin-left: 20px;
      width: 80%;
    }
  }

  & > .pay-money {
    align-items: flex-start;
  }

  & .server-list-c {
    & > .server-item {
      align-items: center;
    }

    & > .server-item:not(:first-child) {
      margin-left: 10px;
    }

    & .icon-ser {
      display: block;
      width: 26px;
      height: 26px;
      background: url("http://img.meiduduo.com/images/productDetails/yes.png")
        no-repeat left center;
      background-size: contain;
    }
  }
}

.share-fee {
  margin-bottom: 20px;
}

// 机构显示
.organ-address {
  &:extend(.baseconfig);

  & > .organ-inner {
    align-items: center;

    // justify-content: center;
    & > .organ-logo {
      min-width: 100px;
      height: 100px;
      display: block;
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
    }

    & > .organ-detail {
      margin-left: 30px;
      color: @co6;
    }

    margin-bottom: 20px;
  }

  & > .doctor {
    color: @co6;
    font-size: 24px;
    justify-content: space-between;
    align-items: center;

    .doctor-cen {
      align-content: center;
    }
  }
}

.server-intro {
  margin-bottom: 40px;
  &:extend(.baseconfig);

  & > .co {
    margin-bottom: 50px;
    color: @baseSconedTitleColor; //#555
    // line-height: 22px;

    & > .server-title {
      color: @baseFirstTitleColor; //#333
      font-weight: bold;
      padding-left: 10px;
      border-left: 7px solid @baseColor;
      line-height: 1;
      margin-bottom: 30px;
      font-size: 26px;
      // width: 15%;
    }
  }
}

.footer {
  height: 100px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: @base-white;

  & > .footer-icons {
    height: 100%;
    width: 60%;

    & > .icon-box {
      align-items: center;
      flex: 1;
      text-align: center;
      justify-content: center;
      color: @co6;
      font-size: 22px;

      & .icons {
        margin: 0 auto;
        width: 36px;
        height: 36px;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }

  .footer-cart {
    width: 40%;

    & > p {
      flex: 1;
      color: @base-white;
      font-size: 28px;
      justify-content: center;
      align-items: center;
    }

    & > p:first-child {
      background: #fe86d8;
    }

    & > p:last-child {
      background-color: @baseColor;
    }
  }
}

.icon-phone {
  background-image: url("http://img.meiduduo.com/images/shop/call.png");
}

.icon-server {
  background-image: url("http://img.meiduduo.com/images/shop/message_b.png");
}

.icon-attion {
  background-image: url("http://img.meiduduo.com/images/shop/yuyue.png");
}

.no-bottom-padding {
  padding-bottom: 0;
}

.propose-pro {
  background-color: #f5f5f5;

  margin-bottom: 10px;
  & > .product-box {
    padding: 0 15px * 2;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    & > .product-list {
      width: 50%;
    }
    & > .product-list:first-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    & > .product-list:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  & > .guess-like {
    margin-top: 30px * 2;
    margin-bottom: 21px * 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > span {
      display: inline-block;
      width: 34px * 2;
      height: 1px * 2;
      background-color: #959595;
    }
    & > p {
      font-size: 14px * 2;
      color: #959595;
      margin: 0 10px * 2;
    }
  }
}
.propose-pro::before {
  display: table;
  content: "";
}
</style>
