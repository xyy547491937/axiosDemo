<style scoped>
.voucher-container {
  padding: 20px 16px 20px 26px;
  background: #fff;
  border-radius: 20px;
  position: relative;
}
.type {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
}
.voucher-box {
  display: flex;
  overflow: hidden;
}
.voucher-detail {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #e5e5e5;
  /* width: 100%; */
  display: flex;
  border-radius: 20px;
  position: relative;
  box-sizing: border-box;
  /* overflow: hidden; */
}
.voucher-detail .dbefore {
  position: absolute;
  top: -20px;
  right: 154px;
  width: 36px;
  height: 36px;
  background: #fff;
  z-index: 11;
  border-bottom: 2px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
}
.voucher-detail .dafter {
  position: absolute;
  bottom: -20px;
  right: 154px;
  width: 36px;
  height: 36px;
  background: #fff;
  z-index: 11;
  border-top: 2px solid #e5e5e5;
  border-radius: 50%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.detail-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 2;
  height: 150px;
  border: 2px dashed #f19ec2;
  border-right: none;
  border-radius: 20px;
  text-align: center;
  align-items: center;
  position: relative;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  /* overflow: hidden; */
}
.detail-left .before {
  position: absolute;
  top: -16px;
  right: -20px;
  width: 40px;
  height: 30px;
  background: #fff;
  z-index: 10;
  border-radius: 50%;
  border-bottom: 2px dashed #f19ec2;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.detail-left .after {
  position: absolute;
  bottom: -16px;
  right: -20px;
  width: 40px;
  height: 30px;
  background: #fff;
  z-index: 10;
  border-radius: 50%;
  border-top: 2px dashed #f19ec2;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.detail-left .before_out {
  position: absolute;
  top: -38px;
  right: -23px;
  width: 40px;
  height: 40px;
  background: #fff;
  z-index: 11;
  border-radius: 50%;
  border-bottom: 2px solid #eee;
}
.detail-left .after_out {
  position: absolute;
  bottom: -38px;
  right: -23px;
  width: 40px;
  height: 40px;
  background: #fff;
  z-index: 11;
  border-radius: 50%;
  border-top: 2px solid #eee;
}

.detail-left .storename {
  color: #333;
  font-size: 26px;
  width: 212px;
}
.detail-left .s-title {
  color: #999;
  font-size: 22px;
  margin-top: 10px;
  width: 212px;
}
.detail-right {
  width: 160px;
  height: 150px;
  line-height: 150px;
  border: 2px dashed #f19ec2;
  border-left: none;
  border-radius: 20px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-align: center;
  position: relative;
}
.detail-right .money {
  font-size: 40px;
  color: #333;
  /* transform: scale(0.5); */
  font-weight: bold;
}
.mb {
  vertical-align: top;
}
.dright {
  position: absolute;
  left: 0;
  top: 30px;
  bottom: 30px;
  width: 2px;
  border-right: 1px dashed #f19ec2;
}
.voucher-action {
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.voucher-action .status {
  text-align: center;
  padding: 10px 6px;
  font-size: 24px;
  color: #ea5690;
  border-bottom: 1px solid #ea5690;
}
.voucher-action .btn {
  padding: 10px 28px;
  color: #fff;
  background: #ea5690;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
}
.notUse {
  background: lightgray !important;
  color: #666 !important;
}
.time {
  width: 200%;
  font-size: 30px;
  color: #999;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: center;
  transform: scale(0.6);
}
.ellipsis-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<template>
  <div style="height:100%">
    <div class="voucher-container" @click="useVoucher">
      <div class="voucher-box">
        <div class="voucher-detail">
          <div class="dbefore"></div>
          <div class="dafter"></div>
          <div class="detail-left">
            <div class="before"></div>
            <div class="after"></div>
            <!-- <div class="before_out"></div>
            <div class="after_out"></div>-->
            <div class="storename ellipsis-1">{{voucher.couponOrganName}}</div>
            <div class="s-title ellipsis-1">{{voucher.couponName}}</div>
            <div class="time">
              <p class="font-scale">{{start}}</p>
              <span class="font-s">--</span>
              <p class="font-scale">{{end}}</p>
            </div>
          </div>
          <div class="detail-right">
            <div class="dright"></div>
            <span class="mb">￥</span>
            <span class="money">{{voucher.reductionPrice}}</span>
          </div>
        </div>
        <!-- <div class="voucher-action" >
                <span class="status">已领取</span>
                <span class="btn" @click.stop="useVoucher">去使用</span>
        </div>-->
        <div class="voucher-action" v-if="vStatus==-3">
          <span class="status">正在疯抢</span>
          <span class="btn" @click.stop="getVoucher" :class="{'notUse':canUse}">领取</span>
        </div>
        <div class="voucher-action" v-if="vStatus==0">
          <span class="status">已领取</span>
          <span class="btn" @click.stop="useVoucher">去使用</span>
        </div>
        <div class="voucher-action" v-if="vStatus==1||vStatus==-2"></div>
      </div>
      <img class="type" v-if="vStatus==1" src="http://img.meiduduo.com/images/shop/shiyong.png" alt>
      <img
        class="type"
        v-if="vStatus==-2"
        src="http://img.meiduduo.com/images/shop/shixiao.png"
        alt
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voucherId: "",
      storeName: "",
      money: "",
      vStatus: "",
      // 1已使用 0未使用 -2已失效
      status: {
        unGet: -3,
        unUse: 0,
        used: 1,
        timeOut: -2
      }
      // status: {
      //   unGet: 0,
      //   unUse: 1,
      //   used: 2,
      //   timeOut: 3
      // }
    };
  },
  props: {
    voucher: {
      type: Object,
      default: {}
    },
    canUse: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "voucher.isReceived": {
      handler(newVal, oldVal) {
        if (newVal == 1) {
          this.vStatus = 0;
        }
      },
      deep: true
    }
  },
  components: {},
  computed: {
    start() {
      let stime = "";
      //  if ( this.voucher.startime) {
      //    stime = this.voucher.startime
      //  }else if (this.voucher.startTime){

      //  }
      stime = this.voucher.startime
        ? this.voucher.startime
        : this.voucher.startTime;
      return stime.substring(0, 10);
    },
    end() {
      return this.voucher.endTime
        ? this.voucher.endTime.substring(0, 10)
        : "长期有效";
    }
  },
  methods: {
    getVoucher() {
      //领取
      this.$emit("getVoucher", this.voucher);
    },
    useVoucher() {
      //使用
      this.$emit("useVoucher", JSON.stringify(this.voucher));
    }
  },
  mounted() {
    // isReceived  1 已领取 0 未领取
    console.log(this.$route.query.couponItem);
    let vou = "";
    this.vStatus = this.voucher.state;

    if (this.$route.query.couponItem) {
      vou = JSON.parse(this.$route.query.couponItem);
      // vou.reductionPrice = parseInt(vou.reductionPrice)
      this.voucher = vou;
      this.$set(this, "voucher", vou);
      this.voucherId = vou.id;
      this.storeName = vou.couponName;
      this.money = vou.reductionPrice;
      this.vStatus = vou.state;
    }
    // else {
    //   this.vStatus = 0;
    // }
    if (this.voucher.isReceived == 1) {
      this.vStatus = 0; //0未使用
    } else if (this.voucher.isReceived == 0) {
      this.vStatus = -3; //未领取
    }

    this.voucher.reductionPrice = parseInt(this.voucher.reductionPrice);
  }
};
</script>
