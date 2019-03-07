<template>
<div class="openBox">
  <div class="open">
    <div class="openTop">大家帮忙拆了<span class="tipColor">{{ item.addUpAmount }}元</span>红包</div>
    <ul v-if="item.paginationVO">
      <li v-for="(ele,index) in item.paginationVO.data" :key="index">
        <div class="left">
          <!-- <figure>
            <img :style="{ backgroundImage: `url(${ele.icon ? ele.icon : 'http://img.meiduduo.com/images/h5/default_icon.png'})` }">
          </figure> -->
          <div class="left-icon">
            <img :style="{ backgroundImage: `url(${ele.icon ? ele.icon : 'http://img.meiduduo.com/images/h5/default_icon.png'})` }">
          </div>
          <div class="right-info">
            <span class="name ellipsis">{{ele.nickName}}</span>
            <span class="times ellipsis">{{ele.createDate}}</span>
          </div>
        </div>
        <div class="right">帮忙拆了<span class="tipColor">{{ele.drawAmount}}元</span></div>
      </li>
    </ul>
  </div>
  <div @click="goPage" class="rule">
    规则说明
  </div>
</div>
</template>

<script>
export default {
  props:['item', 'avtiveId'],
  data() {
    return {}
  },
  methods: {
    goPage () {
      this.$router.push({
        path: '/ruleDescription',
        query: {
          id: this.avtiveId,
          clear_cache: Date.now()
        }
      })
    }
  },
  filters: {
    dealMoney (money) {
      return Math.round(money * 100) / 100
    }
  }
}
</script>
<style lang="less" scoped>
.openBox{
  overflow: hidden;
  border-radius:10px;
}
.rule{
  margin: 38px auto;
  width: 138px;
  height:48px;
  line-height:48px;
  color:#fff;
  font-size:23px;
  text-align: center;
  // padding: 0 22px;
  border-radius: 48px;
  background:linear-gradient(to bottom, #FF9C7B, #FF5467);
  // background: linear-gradient(top,#FF9C7B #FF5467);
}
.open{
  width: 690px;
  margin: 0 auto;
  background: #fff;
  color: #333;
  padding: 0 34px 9px;
  box-sizing:border-box;
  .tipColor{
    color: #fc8893;
  }
  .openTop{
    height: 99px;
    line-height: 99px;
    text-align: center;
    font-size: 34px;
    border-bottom: 1px solid #EEE;
  }
  > ul {
    list-style: none;
  }
  ul>li{
    height: 99px;
    width: 100%;
    padding: 20px 0;
    .left{
      overflow: hidden;
      float: left;
      > img {
        width: 99px;
        height: 99px;
        margin-right: 22px;
        border-radius: 100%;
        display: inline-block;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
      .left-icon{
        width: 99px;
        height: 99px;
        float: left;
        margin-right: 22px;
        border-radius: 100%;
        position: relative;
        overflow: hidden;
        > img {
          width: 104px;
          height: 104px;
          display: block;
          border-radius: 100%;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          position: absolute;
          top: -1px;
          left: -1px;
        }
      }
      .right-info{
        float: left;
        .name{
          width: 240px;
          font-size: 26px;
          line-height: 26px;
          padding: 20px 0 14px 0;
          display: block;
          text-align: left;
        }
        .times{
          width: 240px;
          font-size: 24px;
          line-height: 24px;
          color: #999999;
          display: block;
          text-align: left;
        }
      }
    }
    .right{
      float: right;
      padding: 36px 0 0 0;
      font-size: 26px;
    }
  }
}
.ellipsis {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
