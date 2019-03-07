<template>
  <div class="pullNew">
    <div class="headImg">
      <figure>
        <img :style="{ backgroundImage: `url(${icon ? icon : 'http://img.meiduduo.com/images/h5/default_icon.png'})` }">
      </figure>
    </div>
    <div class="content">
      <div class="name ellipsis">{{ nickName }}</div>
      <!-- <div class="tip">请点击其中一个红包，拆开的金额将计入拆红包总额</div> -->
      <div class="tip">拆的红包达到<span style="color: #F03E4F;">{{ list.singlePacketAmount }}元</span>即可拿下全部红包，立即提现！</div>
      <!-- !hidePocketList && !isSelfOPen -->
      <div v-if="!hidePocketList" class="pockets">
        <div v-for="(ele,index) in redList" :key="index" :class="{ 'pocket1': touchIndex == index || touchIndex == 4 }" class="pocket" @click="openIt(ele, index)">
          <span v-if="activeIndex == index || touchIndex == 4" :class="{ 'active-money-style': activeIndex == index }" class="money-style">{{ ele }}元</span>
          <span v-else class="money-style text-default">帮TA拆</span>
        </div>
      </div>
      <div v-else-if="!isSelfOPen" class="thanks-button">
        <span @click="checkSource">谢谢您{{ queryActivity.singlePacketAmount ? `，我也奖励您${queryActivity.singlePacketAmount}元` : '' }}</span>
      </div>
      <div v-else class="thanks-button">
        <span @click="checkSource">感谢您帮我拆了{{ redList[activeIndex] }}元</span>
      </div>
      <div v-if="!hidePocketList && !isSelfOPen" class="tip">请点击其中一个红包，拆开的金额将计入拆红包总额</div>
      <!-- <div class="invite">喊好友帮我拆红包</div> -->
      <div class="contDown" v-if="countDown.countdown" :class="{ 'contDown-top': !hidePocketList && !isSelfOPen }">
        倒计时：剩余{{ countDown.info }}结束
      </div>
      <div class="contDown contDown-top" v-else>
        活动结束
      </div>
    </div>
    <opens :item="list" :avtiveId="packetActivityId" ></opens>
    <Alert v-model="toDefaultBrowser">点击右上角选择在浏览器打开~~</Alert>
    <div v-if="thanksLog">
      <x-dialog v-model="thanksLog" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', 'padding-top': '69px', 'background-color': 'transparent'}">
        <div class="thanks-box">
          <figure class="thanks-logo">
            <img :style="{ backgroundImage: `url(${icon ? icon : 'http://img.meiduduo.com/images/h5/default_icon.png'})` }">
          </figure>
          <p class="thanks-name ellipsis">{{ nickName }}</p>
          <p class="thanks-info">感谢您帮我拆了<span style="color: #FB5C6C;">{{ redList[activeIndex] }}</span>元</p>
          <p>
            <span v-if="!isSelfOPen && !noMoneyModal" @click="checkSource" class="thanks-btn">谢谢您，我也奖励您{{ queryActivity.singlePacketAmount }}元</span>
            <span v-if="isSelfOPen" @click="thanksLog = false" class="thanks-btn">确定</span>
            <span v-if="!isSelfOPen && noMoneyModal"  @click="checkSource" class="thanks-btn">抱歉，您未成功拆到红包哦</span>
          </p>
          <span @click="thanksLog = false" class="thanks-cancel">x</span>
        </div>
      </x-dialog>
    </div>
    <div v-if="upperLimit">
      <x-dialog v-model="upperLimit" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', 'background-color': 'transparent'}">
        <div class="upper-limit">
          <figure class="thanks-logo">
            <img src="http://img.meiduduo.com/images/h5/upper.png">
          </figure>
          <p>对不起，您本次帮拆的次数</p>
          <p>已达上限，您可以发起自己的活动！</p>
          <div @click="checkSource" class="upper-btn">我也要拿{{ queryActivity.singlePacketAmount }}元</div>
          <span @click="upperLimit = false" class="upper-cancel">x</span>
        </div>
      </x-dialog>
    </div>
    <div v-if="errorModal">
      <x-dialog v-model="errorModal" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', 'background-color': 'transparent'}">
        <div class="upper-limit">
          <figure class="thanks-logo">
            <img src="http://img.meiduduo.com/images/h5/upper.png">
          </figure>
          <p>{{ errorInfo }}</p>
          <p></p>
          <div v-if="errorBtnText == '确定'" @click="errorModal = false" class="upper-btn">{{ errorBtnText }}</div>
          <div v-else @click="checkSource" class="upper-btn">我也要拿{{ queryActivity.singlePacketAmount }}元</div>
          <span @click="errorModal = false" class="upper-cancel">x</span>
        </div>
      </x-dialog>
    </div>
    <!-- <div v-if="noMoneyModal">
      <x-dialog v-model="noMoneyModal" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', 'padding-bottom': '96px', 'background-color': 'transparent'}">
        <div class="noMoney-modal">
          <div class="main-box">
            <div class="content-box">
              <span class="content-icon"></span>
              <span class="content-info">抱歉，您未成功拆到红包哦</span>
            </div>
          </div>
          <div class="nomoney-btn-box">
            <span @click="checkSource">邀请好友帮拆</span>
          </div>
          <div class="nomoney-btn-bg"></div>
          <span class="aside-bg aside-bg-left"></span>
          <span class="aside-bg aside-bg-right"></span>
          <span @click="noMoneyModal = false" class="cacel-btn-nomoney"></span>
        </div>
      </x-dialog>
    </div> -->
  </div>
</template>

<script>
import opens from '../components/opens'
import { queryActivityByCustId, openEnvelopeList, dismantleEnvelope } from '../api/pageApi.js'
import { dealTime } from '../utils/util.js'
import { mapState } from 'vuex';
import { Alert, XDialog } from 'vux'
export default {
  data() {
    return {
      // packetActivityId: '',
      // time: '',
      // ind: '',
      // customerPacketId: '',
      // item: {},
      // originCustId: null,
      // timeInterval: '',
      // countDT: [],
      // currentPrice: '',
      redList: ['11', '22', '333'],
      queryActivity: {},
      countDown: {
        info: '00天00:00:00',
        countdown: true
      }, // 倒计时信息
      timer: null,
      list: {},
      shared: false,
      toDefaultBrowser: false,
      touchIndex: null, // 点击的红包index.为4的时候全部打开
      activeIndex: null, // 点击的红包index
      isTouched: false, // 是否拆过
      thanksLog: false, // 感谢弹窗
      hidePocketList: false, // 是否隐藏拆红包列表
      upperLimit: false, // 帮拆次数达到上限弹窗
      noMoneyModal: false, // 拆到0元时
      isSelfOPen: false, // 是否自拆过
      errorModal: false, // 是否展示提示弹窗
      errorInfo: '', // 提示信息
      errorBtnText: '', // 提示信息button内容
    }
  },
  components: {
    Alert,
    opens,
    XDialog
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  },
  created () {

    // 传参说明：custId 用户id；areaId 区域id；customerPacketId 用户参与红包活动记录id;icon 用户头像链接；nickName 用户名称；share 是否分享（默认 true）; packetActivityId 红包活动id；
    // 路径：http://192.168.1.51:8080/#/redEnvelope?custId=1966&areaId=37&icon=http%3A%2F%2Fimg.meiduduo.com%2Fimages%2Fmine%2Flxbg.png&nickName=%E6%9C%B4%E4%B8%8D%E4%BA%8C&customerPacketId=1

    this.shared = 1 || Number(this.$route.query.share)
    this.queryActivityByCustIdF()
    this.queryOpenList()

    // this.packetActivityId = this.$route.query.id
    // this.time = this.$route.query.time
    // this.originCustId = this.$route.query.originCustId ? this.$route.query.originCustId: null
    // this.count(this.time)
  },
  computed: {
    ...mapState(['shareInfo', 'nowUserInfo']),
    icon () {
      return this.$route.query.icon
    },
    nickName () {
      return this.$route.query.nickName
    },
    packetActivityId () {
      return this.$route.query.packetActivityId
    }
  },
  methods: {
    openIt (val, index) { // 拆红包
      if (!this.nowUserInfo.userId) {
        this.$router.push({
          path: '/login',
          query: {
            clear_cache: Date.now()
          }
        })
      } else if(this.isTouched) {
        this.$vux.alert.show({
          title: '您已拆过红包了！'
        })
      } else {
        dismantleEnvelope({
          customerPacketId: this.$route.query.customerPacketId,
          inviteCustId: this.nowUserInfo.userId,
          areaId: this.nowUserInfo.areaId
        }).then(res => {
          console.log('帮拆红包')
          console.log(res)
          // TODO: 下面10行需要隐藏
          // this.isTouched = true
          // this.touchIndex = index
          //   this.activeIndex = index
          //   setTimeout(() => {
          //     this.touchIndex = 4
          //   }, 2000)
          //   setTimeout(() => {
          //     this.thanksLog = true
          //     this.hidePocketList = true
          //   }, 3000)
          if (res.code == 1) {
            this.isTouched = true
            this.touchIndex = index
            this.activeIndex = index
            this.isSelfOPen = res.data.isJoined == 1 ? true : false
            if (!Number(res.data.receivedDrawAmount)) {
              this.noMoneyModal = true
            } else {
              this.noMoneyModal = false
            }
            switch (index) {
              case 0:
                this.redList = [res.data.receivedDrawAmount, res.data.unreceivedDrawAmount1, res.data.unreceivedDrawAmount2]
                break;
              case 1:
                this.redList = [res.data.unreceivedDrawAmount1, res.data.receivedDrawAmount, res.data.unreceivedDrawAmount2]
                break;
              case 2:
                this.redList = [res.data.unreceivedDrawAmount1, res.data.unreceivedDrawAmount2, res.data.receivedDrawAmount]
                break;
            }
            this.queryOpenList()
            this.queryActivityByCustIdF()
            setTimeout(() => {
              this.touchIndex = 4
            }, 2000)
            setTimeout(() => {
              this.thanksLog = true
              // this.thanksLog = this.noMoneyModal ? false : true
              this.hidePocketList = true
            }, 3000)
          } else {
            if (res.msg == '您帮拆红包次数已经达到上限') {
              this.upperLimit = true
              this.hidePocketList = true
            } else if (res.msg == '您已经帮此红包主拆过红包') {
              this.errorInfo = res.msg
              this.errorBtnText = '确定'
              this.errorModal = true
              this.hidePocketList = true
            } else if (res.msg == '未在活动有效期内') {
              this.errorInfo = res.msg
              this.errorBtnText = '确定'
              this.errorModal = true
              this.hidePocketList = true
            } else if (res.msg == '抱歉！该红包活动已经满额') {
              this.errorInfo = res.msg
              this.errorBtnText = '确定'
              this.errorModal = true
              this.hidePocketList = true
            } else {
              this.$vux.alert.show({
                title: res.msg
              })
            }
          }
        })
      }
    },
    // 用户自拆红包
    saveForClient(index) {
      this.ind = index
      var obj = {
        custId: this.$store.state.userInfo.custId,
        packetActivityId: this.packetActivityId,
        areaId: this.$store.state.userInfo.cityId,
      }
      if (this.originCustId) {
        obj.originCustId= this.originCustId
      }
      this.$http.post("/customerPacket/saveForClient", obj).then(res => {
        if (res.code === 1) {
          if (index==2) {
            this.redList = [res.data.unreceivedDrawAmount1,res.data.unreceivedDrawAmount2,res.data.receivedDrawAmount]
          } else if(index==1){
            this.redList = [res.data.unreceivedDrawAmount1,res.data.receivedDrawAmount,res.data.unreceivedDrawAmount2]
          } else {
            this.redList = [res.data.receivedDrawAmount,res.data.unreceivedDrawAmount1,res.data.unreceivedDrawAmount2]
          }
          this.$set(this,'customerPacketId',res.data.customerPacketId)
        }
      });
    },
    openedList(customerPacketId) {
      this.$http.post("/packetInviteRecord/openedEnvelopeRecordList4Page", {
        customerPacketId: customerPacketId,
        pageNum: 1,
        pageSize: 100000
      })
      .then(res => {
        if (res.code === 1) {
          this.$set(this.item,'list',res.data.paginationVO.data)
          this.$set(this.item,'addUpAmount',res.data.addUpAmount)
        }
      });
    },
    count(timeStr) {
      console.log(1,timeStr)
      var that = this
      this.timeInterval = setInterval(function () {
        var date = new Date();
        var now = date.getTime();
        //设置截止时间
        var str = timeStr;
        var endDate = new Date(str);
        var end = endDate.getTime();
        //时间差
        var leftTime = end - now;
        //定义变量 d,h,m,s保存倒计时的时间
        var d, h, m, s;
        if (leftTime >= 0) {
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
          m = Math.floor(leftTime / 1000 / 60 % 60);
          s = Math.floor(leftTime / 1000 % 60);
          that.countDT = [d,h,m,s]
        } else {
          that.countDT = []
          clearInterval(this.timeInterval)
          this.timeInterval = ''
        }
      }, 1000)
    },
    queryActivityByCustIdF () {
      let obj = {
        custId: this.$route.query.custId,
        // areaId: this.$route.query.areaId,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }
      const self = this
      queryActivityByCustId(obj).then(res => {
        if (res.code === 1) {
          this.queryActivity = res.data
          // if (res.data.endTime) {
          //   this.timer = setInterval(function () {
          //     self.countDown = dealTime(res.data.endTime)
          //   }, 1000)
          // }
        }
      });
    },
    queryOpenList () {
      const self = this
      openEnvelopeList({
        customerPacketId: this.$route.query.customerPacketId,
        pageNum: 1,
        pageSize: 10000,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }).then(res => {
        if (res.code === 1) {
          this.list = res.data
          if (res.data.activityEndTime) {
            this.timer = setInterval(function () {
              self.countDown = dealTime(res.data.activityEndTime)
            }, 1000)
          }
        }
      })
    },
    checkSource () {
      this.upperLimit = false
      this.thanksLog = false
      const self = this
      if (!this.shared) {
        return true
      } else {
        let a = this.checkWeiXin()
        const navigatorInfo = navigator.userAgent
        const isAndroid = navigatorInfo.indexOf('Android') > -1 || navigatorInfo.indexOf('Adr') > -1; //android终端
        const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (!a) { // 原生浏览器内处理逻辑
          if (isAndroid) {
            window.location.href = this.shareInfo.androidScheme
            setTimeout(() => {
              window.location.href = self.shareInfo.androidDownload
            }, 500)
          }
          if (isiOS) {
            window.location.href = this.shareInfo.iosScheme
            setTimeout(() => {
              window.location.href = self.shareInfo.iosDownload
            }, 500)
          }
        } else { // 微信浏览器内处理逻辑
          // if (isAndroid) {
          //   window.location.href = self.shareInfo.androidDownload
          // }
          // if (isiOS) {
          //   self.$router.push({
          //     path: '/iosDounload'
          //   })
          // }
          // self.$router.push({
          //   path: '/iosDownload',
          //   query: {
          //     clear_cache: Date.now()
          //   }
          // })
          window.location.href = 'http://img.meiduduo.com/h5/download.html?path=main'
        }
        return false
      }
    },
    checkWeiXin () { // 是否在微信浏览器打开
      const navigatorInfo = navigator.userAgent.toLowerCase()
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
      //   // this.toDefaultBrowser = true
      //   return true
      // } else {
      //   return false
      // }
    },
  },
  filters: {
    dealMoney (money) {
      return Math.round(money * 100) / 100
    }
  }
}
</script>
<style lang="less" scoped>
.pullNew{
  background: #ffd4bf url("http://img.meiduduo.com/images/mine/lxbg.png") no-repeat left top;
  background-size: 100% 324px;
  padding: 204px 30px 0 30px;
  min-height: 100%;
  box-sizing: border-box;
  .headImg{
    position:absolute;
    top:134px;
    left: 0;
    right:0;
    width: 140px;
    height: 140px;
    margin: 0 auto;
    box-sizing: border-box;
    border: 4px solid #fff;
    border-radius: 100%;
    overflow: hidden;
    z-index: 999;
    background-color: #fff;
    > figure {
      width: 132px;
      height: 132px;
      border-radius: 100%;
      display: inline-block;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  .content{
    padding:70px 0 36px 0;
    background:#fff;
    margin-bottom:20px;
    border-radius:10px;
    .name{
      height: 100px;
      width: 300px;
      margin: 0 auto;
      line-height: 100px;
      font-size: 34px;
      color: #FB5C6C;
      text-align: center;
      font-weight:700;
    }
    .tip{
      height: 24px;
      line-height: 24px;
      font-size: 24px;
      color: #333333;
      text-align: center;
    }
    .pockets{
      background: #FFEDED;
      width: 630px;
      height: 280px;
      font-size: 22px;
      margin:27px auto;
      border-radius:10px;
      overflow: hidden;
      .pocket{
        margin:33px 0 0 33px;
        width: 168px;
        height: 204px;
        background: #FB6C78;
        background: url("http://img.meiduduo.com/images/mine/chaiing.png") no-repeat left top;
        float: left;
        background-size: 168px 204px;
        text-align: center;
      }
      .pocket1{
        margin: 22px 0 0 33px;
        width: 168px;
        height: 235px;
        background: url("http://img.meiduduo.com/images/mine/chaied.png") no-repeat left top;
        background-size: 168px 204px;
      }
      .pocketed{
        color:#F03E4F;
      }
      .pocketing{
        color:#F88C00;
      }
      .money{
        height: 84px;
        line-height: 84px;
        font-size: 28px;
      }
    }
    .invite{
      margin: 66px auto;
      width: 450px;
      height: 100px;
      line-height: 100px;
      color: #FB5C6C;
      font-size: 32px;
      text-align: center;
      background:linear-gradient(to bottom, #FFF049, #FDBA16);
      border-radius: 10px;
      -moz-box-shadow: 0 10px 40px 0 #ccc;
      -webkit-box-shadow: 0 10px 40px 0 #ccc;
      box-shadow:0 10px 40px 0 #ccc;
      font-weight:700;
    }
    .contDown{
      height: 24px;
      line-height: 24px;
      font-size: 24px;
      color: #FB5C6C;
      text-align: center;
    }
    .contDown-top {
      margin-top: 84px;
    }
  }
}
.pockets{
  background: #FFEDED;
  width: 630rpx;
  height: 280rpx;
  font-size: 22rpx;
  margin:27rpx auto;
  border-radius:10rpx;
  overflow: hidden;
  .pocket{
    margin:33rpx 0 0 33rpx;
    width: 168rpx;
    height: 204rpx;
    background: #FB6C78;
    background: url("http://img.meiduduo.com/images/mine/chaiing.png") no-repeat left top;
    float: left;
    background-size: 168rpx 204rpx;
  }
  .pocket1{
    margin: 22rpx 0 0 33rpx;
    width: 168rpx;
    height: 235rpx;
    background: url("http://img.meiduduo.com/images/mine/chaied.png") no-repeat left top;
    background-size: 168rpx 204rpx;
  }
  .pocketed{
    color:#F03E4F;
  }
  .pocketing{
    color:#F88C00;
  }
  .money{
    height: 84rpx;
    line-height: 84rpx;
    font-size: 28rpx;
  }
}
.money-style {
  font-size: 36px;
  font-weight: 600;
  color: #F88C00;
  margin-top: 15px;
  display: inline-block;
}
.active-money-style {
  color: #F03E4F;
}
.thanks-box {
  width: 620px;
  height: 430px;
  padding: 69px 80px 0 80px;
  box-sizing: border-box;
  border-radius: 18px;
  background-color: #fff;
  position: relative;
  margin: 0 auto;
  font-size: 34px;
  color: #333333;
  .thanks-logo {
    width: 138px;
    height: 138px;
    box-sizing: border-box;
    display: block;
    border-radius: 100%;
    // border: 4px solid #fff;
    position: absolute;
    top: -69px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    // display: flex;
    // display: -webkit-flex;
    // align-items: center;
    // -webkit-align-items: center;
    // justify-content: center;
    // -webkit-justify-content: center;
    > img {
      width: 138px;
      height: 138px;
      display: inline-block;
      border-radius: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .thanks-name {
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 40px;
  }
  .thanks-info {
    margin-bottom: 50px;
  }
  .thanks-btn {
    font-size: 32px;
    color: #CF5E1A;
    width: 460px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    display: inline-block;
    background:linear-gradient(0deg,rgba(253,186,22,1),rgba(255,240,73,1));
    background-color: #FFF049;
    box-shadow:0px 10px 20px 0px rgba(64,0,1,0.2);
    border-radius: 10px;
  }
}
.thanks-cancel {
  position: absolute;
  top: 15px;
  right: 30px;
  height: 56px;
  line-height: 56px;
  font-size:56px;
  color:#999999;
}
.thanks-button {
  width: 630px;
  height: 280px;
  box-sizing: border-box;
  line-height: 280px;
  font-size: 32px;
  color: #FB5C6C;
  margin: auto;
  text-align: center;
  > span {
    width: 460px;
    height: 100px;
    font-weight: 600;
    line-height: 100px;
    display: inline-block;
    text-align: center;
    background:linear-gradient(0deg,rgba(253,186,22,1),rgba(255,240,73,1));
    background-color: #FFF049;
    box-shadow:0px 10px 20px 0px rgba(64,0,1,0.2);
    border-radius: 10px;
  }
}
.upper-limit {
  width: 620px;
  box-sizing: border-box;
  background: #fff;
  font-size: 26px;
  color: #333333;
  padding: 40px 80px 55px;
  border-radius: 10px;
  margin: 0 auto;
  position: relative;
  > figure {
    width: 172px;
    height: 164px;
    display: block;
    margin: 0 auto;
    margin-bottom: 34px;
    > img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
  .upper-btn {
    margin-top: 40px;
    width: 100%;
    height:100px;
    line-height: 100px;
    box-sizing: border-box;
    color: #FB5C6C;
    font-size: 32px;
    font-weight: 600;
    background:linear-gradient(0deg,rgba(253,186,22,1),rgba(255,240,73,1));
    background-color: #FFF049;
    box-shadow:0px 10px 20px 0px rgba(64,0,1,0.2);
    border-radius:10px;
  }
  .upper-cancel {
    position: absolute;
    top: 15px;
    right: 30px;
    height: 56px;
    line-height: 56px;
    font-size:56px;
    color:#999999;
  }
}
.text-default {
  color: #FFDE00;
  font-size: 20px;
  font-weight: 400;
  margin-top: 32px;
  line-height: 26px;
}
.noMoney-modal {
  width: 560px;
  height: 596px;
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 18px;
  background-color: #FD6F65;
  position: relative;
  padding-top: 25px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  .main-box {
    width: 512px;
    background-color: #fff;
    border-radius: 18px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 33px;
    .content-box {
      width: 453px;
      box-sizing: border-box;
      border:3px solid rgba(241,196,129,1);
      border-bottom: 0;
      border-radius:18px;
      margin: 0 auto;
      .content-icon {
        display: block;
        width: 172px;
        height: 164px;
        margin: 0 auto;
        background-image: url('http://img.meiduduo.com/images/h5/upper.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 31px;
        margin-bottom: 21px;
      }
      .content-info {
        font-size:32px;
        font-weight:600;
        color:rgba(241,196,129,1);
        line-height:49px;
        text-align: center;
        display: block;
        margin-bottom: 40px;
      }
    }
  }
  .nomoney-btn-box {
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    -webkit-flex: 1;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    background:linear-gradient(0deg,rgba(255,75,78,1),rgba(254,94,96,1));
    background-color: #FF4B4E;
    > span {
      display: block;
      width:460px;
      height:100px;
      background:linear-gradient(0deg,rgba(253,186,22,1),rgba(255,240,73,1));
      box-shadow:0px 10px 20px 0px rgba(64,0,1,0.2);
      border-radius:10px;
      background-color: #FDBA16;
      font-size:32px;
      font-weight:600;
      color:rgba(207,94,26,1);
      line-height:100px;
      margin: 40px auto 0;
    }
  }
  .nomoney-btn-bg {
    background-image: url('http://img.meiduduo.com/images/mine/laxin4.png');
    width: 100%;
    height: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 190px;
  }
}
.cacel-btn-nomoney {
  background-image: url('http://img.meiduduo.com/images/h5/del.png');
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  bottom: -96px;
  left: 50%;
  transform: translateX(-50%);
}
.aside-bg {
  display: block;
  position: absolute;
  top: 100px;
  width: 100px;
  height: 150px;

  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.aside-bg-left {
  background-image: url('http://img.meiduduo.com/images/mine/laxin3.png');
  left: -20px;
}
.aside-bg-right {
  background-image: url('http://img.meiduduo.com/images/mine/laxin2.png');
  right: -20px;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
