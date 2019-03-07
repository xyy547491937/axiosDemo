<template>
  <div style="height:100%">
    <!-- clipboard.js 复制的包 -->
    <div class="bg-back clearMar">
      <div class="invite-list">
        <p class="icon-box">
          <span class="iconfont icon-weibiaoti555" style="color:#C63201;font-size:14px;"></span>
        </p>
        <div class="invite-friend">
          <!-- <div class="invite-friend-list">小怪兽邀请3个好友，获得66元现金</div> -->
          <marquee>
            <marquee-item
              v-for="(v,i) in inviteArr"
              :key="i"
              @click.native="onClick(i)"
              class="align-middle"
            >{{v.nickName}}邀请{{v.inviteNum}}个好友,获得{{v.rewardAmount }}元现金</marquee-item>
          </marquee>
        </div>
      </div>
      <!-- 邀请码 -->
      <div class="invite-code">
        <p class="c">
          我的邀请码：
          <span id="success_form_input" readonly="readonly">DSKENDNN</span>
        </p>
        <div
          ref="copy"
          class="invite-btn"
          data-clipboard-action="copy"
          data-clipboard-target="#success_form_input"
          @click="copyLink"
        >复制</div>
      </div>
      <!-- 邀请按钮 -->
      <div @click.stop="inviteBtn" class="invite-box">
        <!-- <div class="invite-big-btn">邀请领取</div> -->
        <img src="/static/invite_btn.png" alt>
      </div>
      <!-- 活动规则 -->
      <div class="active-rule" @click.stop="toggleShow">
        <p class="c">活动规则</p>
      </div>

      <!-- <input type="text" id="success_form_input" readonly="readonly" v-model="link"> -->
      <!-- <button
        ref="copy"
        data-clipboard-action="copy"
        data-clipboard-target="#success_form_input"
        @click="copyLink"
      >复制</button>-->
      <div class="cover" v-show="isShowing">
        <div class="alert-rule">
          <div class="rule-text-box">
            <div class="rule-text">
              <div class="rule-title-box">
                <div class="rule-title">活动规则</div>
              </div>

              <p v-if="activeList.length > 0" class="text-inner" v-html="activeList[0].activityRules"></p>
            </div>
          </div>
        </div>
        <div class="close" @click.stop="toggleShow">&times;</div>
      </div>
    </div>
  </div>
</template>
<script>
// import vueSeamless from "vue-seamless-scroll";
import { toggle } from "@/mixin/toggle.js";
import { Marquee, MarqueeItem } from "vux";
import { http, queryInviteCode } from "../api/pageApi.js";
import { setInterval } from "timers";

var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default {
  data() {
    return {
      copyBtn: null,
      inviteArr: [],
      activeList: [],
      token: '',
      custId: '',
      userIcon: '',
      userNickName: ''
    };
  },
  components: {
    // vueSeamless
    Marquee,
    MarqueeItem
  },
  mixins: [toggle],
  mounted() {
    this.copyBtn = new this.clipboard(this.$refs.copy);
    this.token = this.$route.query.token
    this.custId = this.$route.query.userId
    this.userIcon = this.$route.query.userIcon
    this.userNickName = this.$route.query.userNickName

    this.getActiveId(1);
  },
  methods: {
    copyLink() {
      /*这是点击按钮触发的点击事件*/
      let _this = this;
      let clipboard = _this.copyBtn;
      clipboard.on("success", function() {
        _this.$vux.toast.text('内容已复制到剪粘板', 'middle')
      });
      clipboard.on("error", function() {
        _this.$vux.toast.text('复制失败，请手动复制！', 'middle')
      });
    },
    // 获取活动id
    getActiveId(n) {
      http("inviteActivity/receivingPackage").then(res => {
        // console.log(res);
        if (res.code == 1) {
          this.activeList = res.data;
          if (res.data.length > 0) {
            this.inviteActiveList(res.data[0].id, n);
            this.queryCode()
          }
        }
      });
    },
    //请求活动列表
    inviteActiveList(inviteActivityId, cycles) {
      http("virtualInvite/infoDisplayForApp", {
        inviteActivityId,
        cycles
      }).then(res => {
        // console.log(res);
        if (res.code == 1) {
          this.inviteArr = res.data;
        }
      });
    },
    //定时循环
    setInviteAdd() {
      let n = 1;
      setInterval(() => {
        n++;
        this.getActiveId(n);
      }, 36000000);
    },
    queryCode() {
      queryInviteCode({
        custId: this.custId,
        inviteActivityId: this.activeList[0].id
      }).then(res => {
        console.log(res)
      })
    },
    inviteBtn() {
      let params = {
        title: '邀请好友',
        content: `我是${this.userNickName}，快来领取33元现金红包。注册就送...`,
        image: this.userIcon,
        shareWebUrl: `http://192.168.1.51:8080/#/collarRedEnvelope?token=${this.token}&custId=${this.custId}&userIcon=${this.userIcon}&userNickName=${this.userNickName}`
      }
      if (isAndroid) {
        window.android.inviteFriend(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.inviteFriend.postMessage(params);
      }
    }
  }
};
</script>
<style lang="less">
.seamless-warp {
  height: 50px;
}
.bg-back {
  background-color: #ffe1ad;
  height: 100%;
  position: relative;
  // background: linear-gradient(
  //   0deg,
  //   rgba(232, 41, 42, 1),
  //   rgba(248, 80, 65, 1),
  //   rgba(253, 157, 75, 1),
  //   rgba(255, 184, 70, 1)
  // );
  // border-bottom-left-radius: 50%;
  // border-bottom-right-radius: 50%;
  background-image: url("/static/invite_1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  & > .invite-list {
    // position: absolute;
    // top: 39px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 39px;
    width: 530px;
    height: 60px;
    background: linear-gradient(
      0deg,
      rgba(255, 155, 19, 1),
      rgba(255, 191, 35, 1),
      rgba(255, 221, 32, 1)
    );
    box-shadow: 0px 5px 15px 1px rgba(207, 17, 4, 0.4);
    border-radius: 30px;
    & > .icon-box {
      margin-left: 56px;
      margin-right: 12px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      border: 1px solid #c63201;
    }
    & > .invite-friend {
      font-size: 12px;
      color: #c63201;
    }
  }
  & > .invite-code {
    position: absolute;
    right: 15%;
    top: 450px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #ffea54;
    & > .invite-btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 15px;
      width: 100px;
      height: 50px;
      // padding: 0 2px;
      border: 2px solid rgba(255, 234, 84, 1);
      border-radius: 10px;
    }
  }
  .invite-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    // & > .invite-big-btn {
    //   position: absolute;
    //   bottom: 124px;
    //   width: 620px;
    //   height: 110px;
    //   background: linear-gradient(
    //     0deg,
    //     rgba(255, 139, 3, 1),
    //     rgba(255, 187, 33, 1),
    //     rgba(255, 238, 89, 1)
    //   );
    //   box-shadow: 0px 12px 32px 3px rgba(255, 147, 7, 0.51);
    //   border-radius: 55px;
    // }

    & > img {
      position: absolute;
      bottom: 124px;
      width: 620px;
      // height: 110px;
    }
  }
  .active-rule {
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    bottom: 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: rgba(198, 50, 1, 1);
    & > p {
      text-align: center;
      width: 140px;
      font-size: 26px;
      line-height: 50px;
      height: 50px;
      border: 2px solid rgba(198, 50, 1, 1);
      border-radius: 25px;
    }
  }
}
.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  & > .alert-rule {
    width: 590px;
    height: 730px;
    background-image: url("/static/text-bg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    margin: 0 auto;
    padding: 15px;
    & > .rule-text-box {
      background-color: #fff;
      // width: 100%;
      // height: 100%;
      border-radius: 20px;
      padding: 39px;
      & > .rule-text {
        & > .rule-title-box {
          margin-bottom: 41px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          & > .rule-title {
            margin: 0 15px;
            font-size: 36px;
            color: #c63201;
            text-align: center;
            font-weight: bold;
          }
        }
        & > .rule-title-box::before {
          content: "";
          display: block;
          height: 32px;
          width: 62px;
          background-image: url("/static/rule-icon.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        & > .rule-title-box::after {
          content: "";
          display: block;
          height: 32px;
          width: 62px;
          background-image: url("/static/rule-icon.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        & > .text-inner {
          font-size: 26px;
          color: #333;
        }
      }
    }
  }
  & > .close {
    width: 60px;
    height: 60px;
    border: 1px solid #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #fff;
    border-radius: 50%;
    margin-top: 45px;
  }
}
.clearMar::before {
  display: table;
  content: "";
}
.align-middle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
