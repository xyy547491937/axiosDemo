<template>
  <div class="container">
    <x-button @click.native="goGroupDetails">拼团详情</x-button>
    <x-button @click.native="goDoctorDetail" type="primary">医生详情</x-button>
    <x-button @click.native="goDoctorDetailApp" type="primary">医生详情app</x-button>
    <x-button @click.native="goInviteFriends" type="warn">邀请好友</x-button>
    <x-button @click.native="redEnvelope" type="warn">拆红包</x-button>
    <x-button @click.native="registered" type="warn">注册</x-button>
    <x-button @click.native="login" type="warn">登录</x-button>
    <x-button @click.native="goRulePage">拆红包规则</x-button>
    <x-button @click.native="goDownloadPage">下载中转页</x-button>

    <!-- <divider>link</divider> -->
    <!-- <x-button type="default" show-loading>submit</x-button>
    <x-button type="primary" show-loading>submit</x-button>
    <x-button type="warn" show-loading></x-button>-->
    <x-button
      @click.native="changeJump('./projectDetail',{id:40,userId:1098,lat: 38.03647,lng: 114.53952,token:'293cc25c2e66fb3bfff27e8c4803f2bd'})"
    >go projectDetail</x-button>
    <x-button
      @click.native="changeJump('./pointDetail',{isNoShow:0,point:1000000,isLimitTime:0,userId:1098,activityId:41,id:14, lat: 38.03647,lng: 114.53952,token:'293cc25c2e66fb3bfff27e8c4803f2bd'})"
    >go pointDetail</x-button>
    <x-button @click.native="changeJump('./aboutUs',{})">go aboutUs</x-button>
    <x-button
      @click.native="changeJump('./informatioBetterscroll',{id:74,type:4,userId:2457})"
    >go informatioBetterscroll</x-button>
    <x-button
      @click.native="changeJump('./information',{id:9099,type:10,userId:2457,share:1,customerPacketId: 49})"
    >go information</x-button>
    <x-button
      @click.native="changeJump('./informationPage',{id:74,type:4,userId:2457,share:1,customerPacketId: 49})"
    >go informationPage</x-button>
    <x-button
      @click.native="changeJump('./informationShare',{id:74,type:4,userId:2457,share:1,customerPacketId: 49})"
    >go informationShare</x-button>
    <x-button
      @click.native="changeJump('./informatioBetterscroll',{id:74,type:4,userId:2457,share:1})"
    >go informatioBetterscroll</x-button>
    <x-button @click.native="changeJump('./rulebook',{})">go rulebook</x-button>
    <x-button @click.native="changeJump('./userPrivate',{})">go userPrivate</x-button>
    <x-button @click.native="changeJump('./PDPrivateBook',{})">go 胚豆用户隐私</x-button>
    <x-button @click.native="changeJump('./test',{})">测试页面</x-button>
    <x-button @click.native="changeJump('./qmShare',{userId:2061})">全民抢钱分享页</x-button>

    <x-button @click.native="mechanism">机构主页</x-button>
    <x-button @click.native="changeJump('./advert',{userId:2061})">广告页</x-button>
    <x-button @click.native="changeJump('./organIntroduce',{})">机构介绍</x-button>
    <x-button @click.native="changeJump('./videoInfo',{id:249})">视频详情</x-button>
    <x-button @click.native="changeJump('./PdEnter')">招募详情</x-button>
    <x-button @click.native="changeJump('./PDApplyerBook')">胚豆达人用户协议</x-button>
    <x-button @click.native="changeJump('./inviteActive', {token:'293cc25c2e66fb3bfff27e8c4803f2bd', custId: 1})">邀请好友活动</x-button>
    <x-button
      @click.native="changeJump('./informationNewPage',{id:9099,type:10,userId:2457,share:1,customerPacketId: 49})"
    >文章详情页new</x-button>
    <x-button @click.native="changeJump('./collarRedEnvelope', {token:'293cc25c2e66fb3bfff27e8c4803f2bd', custId: 1})">邀请好友领红包</x-button>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapActions } from "vuex";
import { XButton, Divider } from "vux";

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loadPageConfig"]),
    mechanism() {
      this.$router.push({
        path: "/organ",
        query: {
          token: "-1",
          userId: 2457,
          // 医生列表
          organId: 2,
          lat: 38.03647,
          lng: 114.53952,
          share: "1"
        }
      });
    },
    goGroupDetails() {
      this.$router.push({
        path: "/groupDetails",
        query: {
          clusterNo: 2,
          groupState: "拼团中",
          id: 170,
          groupCommId: 186,
          commId: 58,
          share: "1",
          token: "-1"
        }
      });
    },
    goDoctorDetail() {
      this.$router.push({
        path: "/doctorDetail",
        query: {
          id: 7,
          custId: 2457,
          share: "1"
        }
      });
    },
    goDoctorDetailApp() {
      this.$router.push({
        path: "/doctorDetailApp",
        query: {
          id: 11,
          userId: 2457,
          share: "0"
        }
      });
    },
    goInviteFriends() {
      this.$router.push({
        path: "/inviteFriends",
        query: {
          id: 250,
          commodityId: 58,
          share: "1"
        }
      });
    },
    redEnvelope() {
      this.$router.push({
        path: "/redEnvelope",
        query: {
          custId: 2457,
          areaId: 37,
          icon: "http://img.meiduduo.com/images/mine/lxbg.png",
          nickName: "朴不二",
          customerPacketId: 2432,
          packetActivityId: 67
        }
      });
    },
    registered() {
      this.$router.push({
        path: "/registered",
        query: {
          clear_cache: Date.now()
        }
      });
    },
    login() {
      this.$router.push({
        path: "/login",
        query: {
          clear_cache: Date.now()
        }
      });
    },
    goRulePage() {
      this.$router.push({
        path: "/ruleDescription"
      });
    },
    goDownloadPage() {
      // this.$router.push({
      //   path: '/iosDownload',
      //   query: {
      //     clear_cache: Date.now()
      //   }
      // })
      window.location.href = "http://img.meiduduo.com/h5/download.html";
    }
  },
  components: {
    XButton,
    Divider
  },
  store
};
</script>

<style scoped>
.container {
  margin: 0px auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

