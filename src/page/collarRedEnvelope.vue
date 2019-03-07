<template>
  <div class="collar-red-envelope">
    <div class="marquee-box">
      <span class="marquee-icon"></span>
      <div class="marquee-content">
        <marquee>
          <marquee-item
            v-for="(item, index) of marqueeList"
            :key="index">{{ item.nickName }}邀请{{ item.inviteNum }}个好友，获得{{ item.rewardAmount }}元现金</marquee-item>
        </marquee>
      </div>
    </div>
    <div class="user-info-box">
      <span
        class="user-icon"
        :style="{backgroundImage: `url(${userIcon})`}"></span>
      <span class="user-content"><span>{{ userNickName }}</span> 恭喜你获得</span>
    </div>
    <div class="collar-info">
      <div class="collar-content">
        <span class="collar-price">
          <span>33</span>
          <span>元</span>
        </span>
        <span class="collar-label">新人任务奖励</span>
      </div>
    </div>
    <div class="collar-code">
      <span class="collar-input">
        <span>我的邀请码：</span>
        <input id="copytext" readonly="readonly" v-model="collarCode" />
      </span>
      <span
        class="copy-btn"
        ref="copy"
        data-clipboard-action="copy"
        data-clipboard-target="#copytext"
        @click="copyCode">复制</span>
    </div>
    <div class="apply-btn">立即领取</div>
    <div class="rule-btn" @click.stop="showMask = true">活动规则</div>
    <div class="mask-box" v-if="showMask">
      <div class="mask-content">
        <span>活动规则</span>
        <p v-if="activeInfo.length > 0" v-html="activeInfo[0].activityRules"></p>
      </div>
      <div class="cancel-icon" @click.stop="showMask = false"></div>
    </div>
  </div>
</template>

<script>
import { Marquee, MarqueeItem } from 'vux'
import { infoDisplayForApp, http, queryInviteCode } from '../api/pageApi.js'

export default {
  data() {
    return {
      marqueeList: [],
      userUrl: 'http://img.meiduduo.com/images/nodata.png',
      collarCode: 'DSKENDNN',
      copyBtn: null,
      inviteActivityId: 1, // 邀请好友活动id
      cycles: 1, // 用户循环次数
      showMask: false, // 是否展示活动规则
      activeInfo: [], // 活动详情
      token: '',
      custId: '',
      userIcon: '',
      userNickName: ''
    }
  },
  components: {
    Marquee,
    MarqueeItem
  },
  mounted () {
    this.copyBtn = new this.clipboard(this.$refs.copy)
    this.token = this.$route.query.token
    this.custId = this.$route.query.userId
    this.userIcon = this.$route.query.userIcon
    this.userNickName = this.$route.query.userNickName
    this.getActiveId()
  },
  methods: {
    copyCode() {
      const _this = this
      const clipboard = _this.copyBtn
      clipboard.on('success', function() {
        _this.$vux.toast.text('内容已复制到剪粘板', 'middle')
      })
      clipboard.on('error', function() {
        _this.$vux.toast.text('复制失败，请手动复制！', 'middle')
      })
    },
    queryMarqueeList(id, n) {
      infoDisplayForApp({
        inviteActivityId: id,
        cycles: n
      }).then(res => {
        if (res.code == 1) {
          this.marqueeList = res.data
        }
      })
    },
    getActiveId() {
      http('inviteActivity/receivingPackage').then(res => {
        if (res.code == 1) {
          this.activeInfo = res.data
          this.queryMarqueeList(res.data[0].id, 1)
          this.queryCode()
          setTimeout(() => {
            this.queryMarqueeList(this.activeInfo[0].id, 2)
          }, 1000000);
        }
      })
    },
    queryCode() {
      queryInviteCode({
        custId: this.custId,
        inviteActivityId: this.activeInfo[0].id,
        token: this.token
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.collar-red-envelope {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background:linear-gradient(0deg,rgba(232,41,42,1),rgba(248,80,65,1),rgba(253,157,75,1),rgba(255,184,70,1));
  position: relative;
  padding: 39px 0 33px;
  > .marquee-box {
    width: 530px;
    height: 60px;
    margin: 0 auto 22px;
    padding: 0 52px;
    box-sizing: border-box;
    background:linear-gradient(0deg,rgba(255,155,19,1),rgba(255,191,35,1),rgba(255,221,32,1));
    box-shadow:0px 5px 15px 1px rgba(207,17,4,0.4);
    border-radius: 30px;
    font-size: 24px;
    color: #C63201;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    > .marquee-icon {
      width: 32px;
      height: 32px;
      display: block;
      border-radius: 100%;
      background-image: url('http://img.meiduduo.com/images/h5/collor/message_icon.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 12px;
    }
    > .marquee-content {
      flex: 1;
      -webkit-flex: 1;
      li {
        width: 378px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  > .user-info-box {
    width: 465px;
    margin: 0 auto 31px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    > .user-icon {
      width: 68px;
      height: 68px;
      display: inline-block;
      border-radius: 100%;
      box-sizing: border-box;
      border: 2px solid #fff;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 15px;
    }
    > .user-content {
      font-size: 32px;
      color: #fff;
      display: flex;
      -webkit-display: flex;
      align-items: center;
      -webkit-align-items: center;
      > span {
        color: #FFEA54;
        width: 210px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .collar-info {
    height: 663px;
    background-image: url('http://img.meiduduo.com/images/h5/collor/collar_info.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 44px;
    position: relative;
    > .collar-content {
      color: #F33E39;
      min-width: 300px;
      background-image: url('http://img.meiduduo.com/images/h5/collor/max_height.png');
      background-size: 82px 48px;
      background-repeat: no-repeat;
      background-position: top right;
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      > .collar-price {
        font-weight: 500;
        display: flex;
        -webkit-display: flex;
        align-items: flex-end;
        -webkit-align-items: flex-end;
        justify-content: center;
        -webkit-justify-content: center;
        > span:first-child {
          font-size: 180px;
          line-height: 135px;
        }
        > span:last-child {
          font-size: 80px;
          line-height: 71px;
        }
      }
      > .collar-label {
        width: 300px;
        display: block;
        font-size: 28px;
        text-align: center;
        margin: 31px auto 0;
        background-image: url('http://img.meiduduo.com/images/h5/collor/new_user_info.png');
        background-size: 100% 12px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  .collar-code {
    width: 550px;
    margin: 0 auto 42px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    font-size: 32px;
    color: #FFEA54;
    .collar-input {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
    }
    > .copy-btn {
      width: 100px;
      height: 50px;
      display: inline-block;
      line-height: 50px;
      border: 2px solid #FFEA54;
      border-radius: 10px;
      margin-left: 28px;
      text-align: center;
    }
    input {
      border: 0;
      background-color: transparent;
      font-size: 32px;
      color: #FFEA54;
      width: 200px;
      outline: none;
    }
  }
  .apply-btn {
    width: 620px;
    height: 110px;
    margin: 0 auto 42px;
    line-height: 110px;
    text-align: center;
    background:linear-gradient(0deg,rgba(255,139,3,1),rgba(255,187,33,1),rgba(255,238,89,1));
    box-shadow:0px 12px 30px 5px rgba(207,17,4,0.7);
    border-radius: 55px;
    color: #C63201;
    font-size: 46px;
    font-weight: 600;
  }
  .rule-btn {
    width: 140px;
    height: 50px;
    line-height: 50px;
    border: 2px solid #FFEA54;
    border-radius: 25px;
    text-align: center;
    font-size: 26px;
    color: #FFEA54;
    margin: 0 auto;
  }
  .mask-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    > .mask-content {
      width: 590px;
      height: 730px;
      margin: 100px auto 0;
      padding: 54px;
      box-sizing: border-box;
      border-radius: 20px;
      background-image: url('http://img.meiduduo.com/images/h5/collor/text-bg.png');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      > span {
        font-size: 36px;
        color: #C63201;
        font-weight: 600;
        display: block;
        width: 70%;
        box-sizing: border-box;
        margin: 0 auto 40px;
        text-align: center;
        background-image: url('http://img.meiduduo.com/images/h5/collor/rule-icon.png'), url('http://img.meiduduo.com/images/h5/collor/rule-icon.png');
        background-position: left center, right center;
        background-size: 62px 32px, 62px 32px;
        background-repeat: no-repeat, no-repeat;
      }
      > p {
        font-size: 26px;
        color: #333;
        line-height: 44px;
      }
    }
    > .cancel-icon {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      margin: 45px auto 0;
      background-image: url('http://img.meiduduo.com/images/h5/collor/cancel-icon.png');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}
</style>
