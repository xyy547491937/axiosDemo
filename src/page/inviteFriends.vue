<template>
  <div class="invite-friends">
    <div class="invite-product">
      <div class="product-main">
        <div class="product-header common-box-style">
          <span v-if="data.commImg && data.commImg.length > 0" :style="{ backgroundImage: `url(${data.commImg[0]})` }"></span>
          <!-- <figure>
            <img v-if="data.commImg && data.commImg.length > 0" :style="{ backgroundImage: `url(${data.commImg[0]})` }" alt="">
          </figure> -->
          <div>
            <p>[{{ data.commodityName }}]{{ data.remark }}</p>
            <p>{{ data.organName }}</p>
            <p>
              <span>¥{{ data.groupPrice }}</span>
              <span>单买：¥{{ data.price }}</span>
            </p>
          </div>
        </div>
        <div class="product-content">
          <p class="content-label">
            <span>
              <!-- <img src="http://img.meiduduo.com/images/shop/line_left.png" alt=""> -->
            </span>
            <span>距结束</span>
            <span>
              <!-- <img src="http://img.meiduduo.com/images/shop/line_left.png" alt=""> -->
            </span>
          </p>
          <p class="count-down">
            <span>{{ day }}</span> 天
            <span>{{ hour }}</span> :
            <span>{{ minute }}</span> :
            <span>{{ second }}</span>
          </p>
          <p class="user-info">
            <span>{{ data.clusterNo }}</span>人成团，还差<span>{{ data.gapNo }}</span>人
          </p>
          <div class="user-icons">
            <div class="user-own">
              <img class="active" :style="{ backgroundImage: `url(${data.icon})` }" alt="">
            </div>
            <!-- <img class="active" v-for="(item, index) of data.icons" :key="index" v-if="index < 4" :src="item" alt=""> -->
            <img v-if="data.icons" :class="{ 'active': data.icons[i - 1] ? true : false }" v-for="i in data.clusterNo < 4 ? data.clusterNo - 1 : 4" :key="i" :style="{ backgroundImage: `url(${data.icons.length ? data.icons[i - 1] : 'http://img.meiduduo.com/images/shop/other.png'})` }" alt="">
          </div>
          <p @click="toJoin(1)" v-if="inviteActive == 1" class="invite-btn">邀请好友参团</p>
          <p @click="toJoin(2)" v-if="inviteActive == 2" class="invite-btn">一键参团</p>
          <p @click="toJoin(3)" v-if="inviteActive == 3" class="invite-btn">下单成功，去app查看订单和支付</p>
          <p class="process-label">拼团流程</p>
          <p class="process-content">
            <span>开团 <br />或者参团</span>
            <span class="process-line"></span>
            <span>邀请 <br />好友拼团</span>
            <span class="process-line"></span>
            <span>人满 <br />分别发货</span>
            <span class="process-line"></span>
            <span>人不满 <br />自动退款</span>
          </p>
        </div>
      </div>
    </div>
    <div class="product-list">
      <p class="content-label">
        <span>
          <!-- <img src="http://img.meiduduo.com/images/shop/line_left.png" alt=""> -->
        </span>
        <span>正在热拼的商品</span>
        <span>
          <!-- <img src="http://img.meiduduo.com/images/shop/line_left.png" alt=""> -->
        </span>
      </p>
      <div class="product-box-main">
        <div @click="checkSource" v-for="(item, index) of itemList" :key="index" class="product-item common-box-style">
          <span :style="{ backgroundImage: `url(${item.cover})` }"></span>
          <!-- <figure>
            <img :style="{ backgroundImage: `url(${item.cover})` }" alt="">
          </figure> -->
          <div>
            <p class="product-item-name z-lines-2-overflow-hidden">[{{ item.commName }}]{{ data.remark }}</p>
            <p class="product-item-organ">{{ item.organName }}</p>
            <p class="product-item-price">
              <span>¥{{ item.groupPrice }}</span>
              <span>单买：¥{{ item.price }}</span>
            </p>
            <p class="product-item-info">
              <span v-if="item.distance" class="bg-color-there">{{ item.distance }}km</span>
              <span v-if="item.isStage == 'Y'" class="bg-color-one">分</span>
              <span v-if="item.isInsurance == 'Y'" class="bg-color-four">保</span>
              <span class="product-item-number">距结束：{{ item.time }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Alert v-model="toDefaultBrowser">点击右上角选择在浏览器打开~~</Alert>
  </div>
</template>
<script>
import { queryInviteDetail, queryFightGroupList, checkJoin, pushOrder, queryGroupCommidity } from '../api/pageApi.js'
import { mapState } from 'vuex';
import { Alert } from 'vux';
export default {
  data () {
    return {
      inviteActive: 2, // 1 邀请，2 参团，3 成功
      data: {},
      timer: null,
      day: '00', // 天
      hour: '00', // 时
      minute: '00', // 分
      second: '00', // 秒
      itemList: [],
      timer: null,
      toDefaultBrowser: false,
      shared: false,
      querying: false, // 请求中
    }
  },
  components: {
    Alert
  },
  computed: {
    ...mapState(['shareInfo', 'nowUserInfo'])
  },
  created () {
    this.shared = Number(this.$route.query.share)
    if (this.nowUserInfo.userId) {
      this.isJoined()
    }
    this.getPDetail()
    this.loadList()
  },
  destroyed () {

    // 传参说明：id 订单id；commodityId 商品id；
    // 路径：http://192.168.1.51:8080/#/inviteFriends?id=250&commodityId=58

    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    toJoin (val) {
      if (!this.nowUserInfo.userId) {
        this.$router.push({
          path: '/login',
          query: {
            clear_cache: Date.now()
          }
        })
      } else if (val == 2) {
        if (this.querying) {
          return
        }
        this.querying = true
        queryGroupCommidity({
          id: this.data.fightGroupId,
          commType: 'P'
        }).then(res => {
          if (res.code == 1) {
            let a = res.data
            let params = {
              organId: a.comm.organId,
              customId: this.nowUserInfo.userId,
              unit: a.comm.unit,
              groupCommId: a.comm.groupCommId,
              isOwner: 0,
              orderType: 2
            }
            if (this.data.id) {
              params.goId = this.data.id
            }
            pushOrder(params).then(res =>{
              this.querying = false
              if (res.code == 1) {
                this.inviteActive = 3
                this.$vux.alert.show({
                  title: '下单成功！',
                  content: '请到app中查看订单和支付！'
                })
              } else {
                if (res.data == -3) {
                  this.$vux.alert.show({
                    title: '商品库存不足'
                  })
                  return
                } else if (res.data == -5) {
                  this.$vux.alert.show({
                    title: '拼主不能参与自己的拼团'
                  })
                  return
                } else if (res.data == -6) {
                  this.inviteActive = 3
                  this.$vux.alert.show({
                    title: '已参与活动'
                  })
                  return
                } else {
                  this.$vux.alert.show({
                    title: '参团失败！'
                  })
                }
              }
            })
          }
        })
      } else if (val == 3) {
        this.checkSource()
      }
    },
    isJoined () { // 是否已参团
      checkJoin({
        id: this.$route.query.id,
        custId: this.nowUserInfo.userId
      }).then(res => {
        if (res.code == 1) {
          if (res.data == 2) { // 拼团成功
            this.inviteActive = 3
          }
        }
      })
    },
    getPDetail () {
      queryInviteDetail({
        id: this.$route.query.id,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }).then(res => {
        if (res.code === 1) {
          let a = res.data
          if (a.commImg) {
            a.commImg = a.commImg.split(',')
          } else {
            a.commImg = []
          }
          if (a.icons) {
            a.icons = a.icons.split(',')
          } else {
            a.icons = []
          }
          this.data = a
          if (this.data.endTime) {
            this.timer = setInterval(this.countdown, 1000, this.data.endTime)
          }
        }
      })
    },
    countdown (endTime) {
      let val = endTime.slice(0, 19).replace(/-/g,"/") // 处理时间格式，兼容ios
      var time = Date.parse(val) - Date.parse(new Date())
      var a = null
      if (time > 0) {
        a = time
      } else {
        a = 0
      }
      var seconds = Math.floor((a / 1000) % 60)
      var minutes = Math.floor((a / 1000 / 60) % 60)
      var hours = Math.floor((a / (1000 * 60 * 60)) % 24)
      var days = Math.floor(a / (1000 * 60 * 60 *24))
      this.day = days > 9 ? days : '0' + days // 天
      this.hour = hours > 9 ? hours : '0' + hours // 时
      this.minute = minutes > 9 ? minutes : '0' + minutes // 分
      this.second = seconds > 9 ? seconds : '0' + seconds // 秒
    },
    loadList () {
      let params = {
        pageNum: 1,
        pageSize: 4,
        // TODO: 区域id
        // areaId: this.areaId,
        onState: 1,
        token: this.$route.query.token == '-1' ? null : this.$route.query.token
      }
      queryFightGroupList(params).then(res => {
        let self = this
        if (res.code === 1) {
          let a = res.data.data
          this.itemList = res.data.data.map(el => {
            if (el.commImg) {
              el.commImg = el.commImg.split(',')
            } else {
              el.commImg = []
            }
            return el
          })
          if (res.data.data.length > 0) {
            this.timer = setInterval(function () {
              for (var i = 0, j = a.length; i < j; i++) {
                  a[i].time = self.dealEndTime(a[i].endTime)
                  self.$set(self.itemList, i, a[i])
              }
            }, 1000)
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }
      })
    },
    dealEndTime (value) {
      let times = value.slice(0, 19)
      let val = times.replace(/-/g,"/")
      let a = new Date().getTime()
      let b = new Date(val).getTime()
      let c = b - a
      let j = Math.floor(c / (24 * 60 * 60 * 1000)) // 天
      let d = Math.floor((c - j*24*60*60*1000) / (60 * 60 * 1000)) // 时
      let e = Math.floor((c - j*24*60*60*1000 - d * 60 * 60 * 1000) / (60 * 1000)) // 分
      let f = Math.floor((c - j*24*60*60*1000 - d * 60 * 60 * 1000 - e * 60 * 1000) / 1000) // 秒
      let g = d > 9 ? d : '0' + d
      let h = e > 9 ? e : '0' + e
      let i = f > 9 ? f : '0' + f
      return `${j}天${g}:${h}:${i}`
    },
    checkSource () {
      const self = this
      if (!this.shared) {
        return true
      } else {
        let a = this.checkWeiXin()
        const navigatorInfo = navigator.userAgent
        const isAndroid = navigatorInfo.indexOf('Android') > -1 || navigatorInfo.indexOf('Adr') > -1; //android终端
        const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (!a) {
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
        } else {
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
  }
}
</script>
<style lang="less" scoped>
.box-margin-bottom {
  margin-bottom: 18px;
}
.box-border-bottom {
  border-bottom: 1px solid #F1F1F1;
}
.box-border-top {
  border-top: 1px solid #F1F1F1;
}

.bg-color-one {
  background-color: #FE86D8;
}
.bg-color-two {
  background-color: #FF4691;
}
.bg-color-there {
  background-color: #D29DFF;
}
.bg-color-four {
  background-color: #74DEC4;
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

.invite-friends {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  .invite-product {
    width: 100%;
    box-sizing: border-box;
    padding: 60px 30px 86px 30px;
    background-color: #FFF4F9;
    background-image: url('http://img.meiduduo.com/images/shop/tbanner.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: contain;
    .product-main {
      width: 100%;
      box-sizing: border-box;
      // background-color: #fff;
      .product-header {
        padding: 24px 29px 17px 24px;
        border-bottom: 1px dashed #BBBBBB;
        background: #fff;
        border-radius: 5px 5px 20px 20px;
        box-shadow: 0 0 20px rgba(255, 70, 145, .35);
        > span {
          display: inline-block;
          width: 210px;
          height: 210px;
          border-radius: 5px;
          margin-right: 25px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          // > img {
          //   width: 100%;
          //   height: 100%;
          //   display: inline-block;
          //   border-radius: 5px;
          //   background-size: 100% 100%;
          //   background-repeat: no-repeat;
          //   background-position: center;
          // }
        }
        // > img {
        //   display: inline-block;
        //   width: 210px;
        //   height: 210px;
        //   border-radius: 5px;
        //   margin-right: 25px;
        // }
        > div {
          font-size: 24px;
          color: #999;
          p {
            &:first-child {
              font-size: 26px;
              color: #333;
              font-weight: bold;
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              margin-bottom: 24px;
            }
            &:last-child {
              margin-top: 24px;
              span:first-child {
                font-size: 30px;
                color: #FC4396;
                font-weight: bold;
                margin-right: 19px;
              }
            }
          }
        }
      }
      .product-content {
        width: 100%;
        border-radius: 20px 20px 5px 5px;
        box-sizing: border-box;
        padding: 30px;
        // margin-top: 2px;
        background-color: #fff;
        box-shadow: 0 0 20px rgba(255, 70, 145, .35);
        .content-label {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          justify-content: center;
          -webkit-justify-content: center;
          font-size: 32px;
          color: #FF4691;
          margin-bottom: 14px;
          > span {
            display: inline-block;
            // width: 36px;
            // height: 4px;
            &:first-child {
              margin-right: 33px;
              background-image: url('http://img.meiduduo.com/images/shop/line_left.png');
              background-repeat: no-repeat;
              display: block;
              width: 74px;
              height: 14px;
            }
            &:last-child {
              margin-left: 33px;
              transform: rotate(180deg);
              background-image: url('http://img.meiduduo.com/images/shop/line_left.png');
              background-repeat: no-repeat;
              display: block;
              width: 74px;
              height: 14px;
            }
          }
        }
        .count-down {
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          color: #FF4691;
          margin-bottom: 29px;
          > span {
            color: #fff;
            background-color: #FF4691;
            display: inline-block;
            width: 44px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 5px;
          }
        }
        .user-info {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 54px;
          > span {
            color: #FF4691;
          }
        }
        .user-icons {
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
          -webkit-justify-content: space-around;
          margin-bottom: 69px;
          .active {
            border: 2px solid #FF4691;
          }
          .user-own {
            position: relative;
            width: 100px;
            height: 100px;
            &::after {
              content: '拼主';
              color: #fff;
              background-color: #FF4691;
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
            > img {
              width: 100px;
              height: 100px;
              display: inline-block;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
          img {
            width: 100px;
            height: 100px;
            border-radius: 100%;
            box-sizing: border-box;
            background-image: url('http://img.meiduduo.com/images/shop/other.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
        .invite-btn {
          width: 100%;
          height: 80px;
          line-height: 80px;
          border-radius: 80px;
          text-align: center;
          background: #FF4691;
          color: #fff;
          box-shadow: 0 0 20px rgba(255, 70, 145, .35);
          margin-bottom: 61px;
        }
        .process-label {
          font-size: 28px;
          color: #333;
          margin-bottom: 30px;
        }
        .process-content {
          font-size: 24px;
          color: #BBBBBB;
          display: flex;
          justify-content: space-around;
          align-items: center;
          display: -webkit-flex;
          -webkit-justify-content: space-around;
          -webkit-align-items: center;
        }
      }
    }
  }
  .product-list {
    width: 100%;
    box-sizing: border-box;
    padding: 60px 30px 0 30px;
    .content-label {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
      font-size: 32px;
      color: #FF4691;
      margin-bottom: 14px;
      > span {
        display: inline-block;
        // width: 36px;
        // height: 4px;
        &:first-child {
          margin-right: 33px;
          background-image: url('http://img.meiduduo.com/images/shop/line_left.png');
          background-repeat: no-repeat;
          display: block;
          width: 74px;
          height: 14px;
        }
        &:last-child {
          margin-left: 33px;
          transform: rotate(180deg);
          background-image: url('http://img.meiduduo.com/images/shop/line_left.png');
          background-repeat: no-repeat;
          display: block;
          width: 74px;
          height: 14px;
        }
      }
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
        > span {
          display: inline-block;
          width: 180px;
          height: 180px;
          border-radius: 5px;
          margin-right: 25px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          // > img {
          //   width: 100%;
          //   height: 100%;
          //   display: inline-block;
          //   border-radius: 5px;
          //   background-size: 100% 100%;
          //   background-repeat: no-repeat;
          //   background-position: center;
          // }
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
                color: #FC4396;
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
  }
}
.process-line {
  display: inline-block;
  margin: 0 10px;
  border-bottom: 1px dashed #BBBBBB;
  flex: 1;
  -webkit-flex: 1;
}
.z-lines-2-overflow-hidden{
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
