<template>
  <div class="doctor-said-card">
    <div class="doctor-said-card-header">
      <span class="header-icon" :style="{backgroundImage: `url(${nowDoctorDetail.icon})`}"></span>
      <span class="header-doctor-name">{{ nowDoctorDetail.name }}</span>
      <span @click="changeFoucsState(true)" v-if="!nowDocterFoucs" class="header-dcotor-foucs">+ 关注</span>
      <span @click="changeFoucsState(false)" v-else class="header-dcotor-foucs foucsed">
        <x-icon type="ios-checkmark-empty" style="fill:#999;position: absolute;left: -2px;top: 0;" size="24" ></x-icon>
        已关注
      </span>
      <!-- <div style="float:left;position:relative;width:10px;height:18px;overflow:hidden;">
        <x-icon type="ios-checkmark-empty" style="fill:#999;position: absolute;left: -8px;top: -2px;" ></x-icon>
      </div> -->
    </div>
    <p @click="toSaidDetail" class="doctor-said-card-content">
      {{ showContent }}
      <span v-if="showAllContentBtn" class="content-all">全文</span>
    </p>
    <div class="doctor-said-card-media">
      <span v-if="index < 9" v-for="(item, index) of mediaImg" :key="index" :style="{backgroundImage: `url(${item})`}" class="media-item" :class="{'one-type': mediaType == 'one', 'two-type': mediaType == 'two'}"></span>
    </div>
    <div class="doctor-said-card-info">
      <span class="info-time">{{ cardData.createDate }}</span>
      <div class="info-icon">
        <span class="info-icon-see">{{ cardData.commentNum }}</span>
        <span>赞 {{ cardData.fabulousNum }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { toAttention } from '../api/pageApi.js'
export default {
  props: ['cardData'],
  data () {
    return {}
  },
  computed: {
    ...mapState(['nowDocterFoucs', 'nowDoctorDetail', 'userInfo']),
    mediaType () {
      let imgArr = this.cardData.images ? this.cardData.images.split(',') : []
      if (imgArr.length == 1) {
        return 'one'
      } else if (imgArr.length > 1) {
        return 'two'
      }
    },
    mediaImg () {
      return this.cardData.images ? this.cardData.images.split(',') : []
    },
    showAllContentBtn () {
      return this.cardData.content.length > 100 ? true : false
    },
    showContent () {
      return this.cardData.content.length > 100 ? this.cardData.content.slice(0, 100) : this.cardData.content
    }
  },
  methods: {
    ...mapMutations(['updateDoctorFoucs']),
    toSaidDetail () {
      console.log('去说说详情页！')
      this.$router.push({
        path: '/info',
        query: {
          id: this.cardData.id
        }
      })
    },
    changeFoucsState (state) {
      toAttention({
        recordId: this.nowDoctorDetail.id,
        custId: this.userInfo.custId,
        recordType: 1,
        state: this.nowDocterFoucs ? -1 : 1,
        token: this.userInfo.token == '' ? null : this.userInfo.token
      }).then(res => {
        if (res.code == 1) {
          this.updateDoctorFoucs(state)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.doctor-said-card {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 24px 29px 32px 31px;
  .doctor-said-card-header {
    height: 68px;
    width: 100%;
    display: flex;
    -webkit-display: flex;
    align-items: center;
    -webkit-align-items: center;
    position: relative;
    .header-icon {
      width: 68px;
      height: 68px;
      display: inline-block;
      border-radius: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-right: 23px;
    }
    .header-doctor-name {
      font-size: 32px;
      color: #333;
      font-weight: 600;
    }
    .header-dcotor-foucs {
      width:126px;
      height:46px;
      box-sizing: border-box;
      border:1px solid rgba(255,70,145,1);
      border-radius:23px;
      text-align: center;
      display: inline-block;
      color: #FF2692;
      font-size: 24px;
      font-weight: bold;
      line-height: 46px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
    .foucsed {
      border:1px solid rgba(228,228,228,1);
      border-radius:23px;
      color: #999;
      padding-left: 17px;
    }
  }
  .doctor-said-card-content {
    margin: 21px 0 24px 0;
    font-size: 32px;
    color: #333;
    font-weight: 400;
    .content-all {
      color: #FF4691;
    }
  }
  .doctor-said-card-media {
    width: 100%;
    display: flex;
    -webkit-display: flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    .media-item {
      border-radius: 10px;
      display: block;
      box-sizing: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-bottom: 14px;
    }
    .one-type {
      width: 100%;
      height: 330px;
    }
    .two-type {
      width: 220px;
      height: 220px;
      margin-right: 10px;
    }
  }
  .doctor-said-card-info {
    width: 100%;
    display: flex;
    -webkit-display: flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    font-size: 24px;
    color: #999;
    .info-time {

    }
    .info-icon {
      .info-icon-see {
        margin-right: 31px;
        background-image: url('http://img.meiduduo.com/images/h5/talk_icon.png');
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 26px 24px;
        padding-left: 30px;
      }
    }
  }
}
</style>
