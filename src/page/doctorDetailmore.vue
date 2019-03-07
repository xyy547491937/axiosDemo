<template>
  <div class="doctordetailbox">
    <div class="doctor-detail-more-tabs">
      <!-- <span @click="goBack" class="title-back-icon iconfont icon-fanhui"></span> -->
      <span @click="goBack" class="title-back-icon"></span>
      <span>医生简介</span>
    </div>
    <div class="doctor-detail-more-tabs-box">
      <span :class="current == 1 ? 'default-select-active' : ''" class="default-select" @click.stop="setActive(1)">简介</span>
      <span :class="current == 2 ? 'default-select-active' : ''" class="default-select" @click.stop="setActive(2)">从业执照</span>
      <span :class="current == 3 ? 'default-select-active' : ''" class="default-select" @click.stop="setActive(3)">荣誉展示</span>
      <!-- <tab
        id="change-bg"
        active-color="#FF4691"
        default-color="#333"
        style="padding:0px;"
        custom-bar-width="75%"
        >
          <tab-item @on-item-click="setActive(1)" selected>
            <span>简介</span>
          </tab-item>
          <tab-item @on-item-click="setActive(2)">
            <span>从业执照</span>
          </tab-item>
          <tab-item @on-item-click="setActive(3)">
            <span>荣誉展示</span>
          </tab-item>
        </tab> -->
    </div>

        <div class="server-info" :class="{'server-no-data': !listData.personalName && !listData.introduce}" v-if="current == 1">
            <div v-if="listData.personalName || listData.introduce" class="boxProfile">
                <div class="doctorName">{{listData.personalName}}</div>
                <div class="doctorContent">
                    <div v-html="listData.introduce!=='undefined'?listData.introduce:''"></div>
                </div>
            </div>
            <div v-else class="no-data-style no-data-box"></div>
        </div>
        <div class="server-info" :class="{'server-no-data': licenseInfo.length < 1}" v-if="current == 2">
           <div v-if="licenseInfo.length > 0" class="boxLicense">
                <div v-for="item in licenseInfo" :key="item">
                    <img :src="item.url" alt="">
                    <p>{{item.name}}</p>
                </div>
           </div>
           <div v-else class="no-data-style no-data-box"></div>
        </div>
        <div class="server-info" :class="{'server-no-data': honorInfo.length < 1}" v-if="current == 3">
           <div v-if="honorInfo.length > 0" class="boxHonorse">
                <div v-for="item in honorInfo" :key="item">
                    <img :src="item.url" alt="">
                    <p>{{item.name}}</p>
                </div>
           </div>
           <div v-else class="no-data-style no-data-box"></div>
        </div>
  </div>
</template>
<script>
// import { Tab, TabItem } from "vux";
import {
  queryDoctorDetail
} from "../api/pageApi.js";
export default {
    data(){
        return{
            isActive: {
                isProfileAct: true,
                isLicenseAct: false,
                isHonorAct: false
            },
            listData: {},
            licenseInfo: [],
            honorInfo: [],
            current: 1,
        }
    },
    // components: {
    //     TabItem,
    //     Tab
    // },
    created(){
        this.getData();
    },
    mounted () {
      console.log('mounted ....')
      this.current = 1
    },
    methods:{
        goBack () {
          this.$router.go(-1)
        },
        getData(){
            let params = {id: this.$route.query.id}
            queryDoctorDetail(params).then(res => {
                if (res.code === 1) {
                    console.log();
                    this.listData = res.data;
                    this.licenseInfo =res.data.licenseInfo?JSON.parse(res.data.licenseInfo):'';
                    this.honorInfo =res.data.honorInfo?JSON.parse(res.data.honorInfo):'';
                }
            })
        },
        setActive(e) {
            this.current = e
            // this.setObjectFalse(this.isActive);
            // let act = this.isActive;
            // switch (e) {
            //     case 1:
            //     act.isProfileAct = true;
            //     break;
            //     case 2:
            //     act.isLicenseAct = true;
            //     break;
            //     case 3:
            //     act.isHonorAct = true;
            //     break;
            // }
        },
        setObjectFalse(obj) {
            for (const key in obj) {
                obj[key] = false;
            }
            return obj;
        },
    }
}
</script>
<style lang="less" scoped>
.doctordetailbox{
    background: #f5f5f5;
    min-height: 100%;
    box-sizing: border-box;
    position: relative;
}
.boxProfile,.boxLicense,.boxHonorse{
    background-color: #fff;
    padding: 40px 40px 40px 40px;
    /deep/ img{
        display: block;
        max-width: 100%;
        height: auto;
        overflow: hidden;
    }
}
.boxProfile{
    .doctorName{
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 15px;
        font-family: PingFangSC-Semibold;
    }
    .doctorContent{
        p{
            font-size: 28px;
            line-height: 44px;
            color: #333333;
            font-family: PingFangSC-Regular;
        }

        /deep/p{
            font-size: 28px;
            line-height: 44px;
            color: #333333;
            font-family: PingFangSC-Regular;
        }
    }
}
.vux-tab-wrap{
    width: 100%;
    height: 42px;
    // border-bottom: 10px #f5f5f5 solid;
}
.vux-tab .vux-tab-item{
    background: none;
}
.boxLicense,.boxHonorse{
    p{
        color: #333333;
        font-family: PingFangSC-Semibold;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        padding: 17px 0 27px;
    }
    /deep/p{
        color: #333333;
        font-family: PingFangSC-Semibold;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        padding: 17px 0 27px;
    }
}
.server-info {
    // padding: 40px;
    padding-top: 260px;
    height: 100%;
    // background: #fff;
    box-sizing: border-box;
    ul > li {
        position: relative;
        background: rgba(255, 255, 255, 1);
        //   margin-bottom: 10px;
        > img {
        margin: 42px 22px 20px 31px;
        background-size: 200px 200px;
        width: 200px;
        height: 200px;
        border-radius: 10px;
        display: inline-block;
        }
        > span {
        position: absolute;
        &:nth-child(2) {
            width: 463px;
            height: 65px;
            font-size: 30px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 36px;
            top: 38px;
            right: 34px;
        }
        &:nth-child(3) {
            font-size: 26px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 36px;
            top: 120px;
            left: 253px;
        }
        &:nth-child(5) {
            font-size: 24px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 30px;
            top: 210px;
            right: 23px;
        }
        }
        > div {
        position: absolute;
        top: 155px;
        left: 246px;
        > span {
            &:first-child {
            font-size: 32px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(252, 67, 150, 1);
            }
            &:last-child {
            font-size: 24px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            text-decoration: line-through;
            color: rgba(153, 153, 153, 1);
            }
        }
        }
        .sever-icon {
        position: absolute;
        left: 248px;
        top: 210px;
        .icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 5px;
            float: left;
            color: #fff;
            font-size: 22px;
            line-height: 30px;
            padding-left: 2px;
            box-sizing: border-box;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            margin-left: 8px;
        }
        .fen {
            background: rgba(250, 151, 230, 1);
        }
        .bao {
            background: rgba(123, 219, 207, 1);
        }
        }
    }
    }
.doctor-detail-more-tabs {
  width: 100%;
  height: 150px;
  text-align: center;
  color: #333;
  font-weight: 500;
  font-size: 34px;
  line-height: 34px;
  box-sizing: border-box;
  padding-top: 100px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 1;
  .title-back-icon {
    position: absolute;
    top: 102px;
    left: 25px;
    width: 18px;
    height: 34px;
    background-image: url('http://img.meiduduo.com/images/xyy/back_icon_lsy.png');
    background-size: 18px 34px;
    background-repeat: no-repeat;
    // transform: translateY(-50%);
  }
}
.doctor-detail-more-tabs-box {
  position: fixed;
  top: 150px;
  width: 100%;
  background: #fff;
  display: flex;
  -webkit-display: flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  -webkit-align-items: center;
  z-index: 1;
}
.no-data-style {
  position: absolute;
  top: 260px;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('http://img.meiduduo.com/images/nodata.png');
  background-position: center;
  background-size: 220px 270px;
  background-repeat: no-repeat;
}
// .no-data-box {
//   height: 650px;
//   width: 100%;
// }
.default-select {
  width: 120px;
  height: 84px;
  display: block;
  line-height: 84px;
  box-sizing: border-box;
  font-size: 28px;
  text-align: center;
  color: #333333;
  border-bottom: 4px solid #fff;
}
.default-select-active {
  color: #FF4691;
  border-color: #FF4691;
}
.server-no-data {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-image: url('http://img.meiduduo.com/images/nodata.png');
  // background-position: center;
  // background-size: 220px 270px;
  // background-repeat: no-repeat;
}
</style>
