<template>
  <div class="inputNumber">
    <!-- 数量加加 -->
    <div class="c-num" v-if="addNum">
      <span class="add-num" @click="addNumc(-1)">
        <i class="iconfont icon-jianhao" style="color:#999;font-size:14px"></i>
      </span>
      <input type="number" v-model="num">
      <span class="sub-num" @click="addNumc(1)">
        <i class="iconfont icon-jiahao" style="color:#999;font-size:14px"></i>
      </span>
    </div>
    <!-- 选择方案 -->
    <div class="sel" v-if="sel">
      <p class="flex-r co" @click="isShowType(0)" style="margin-bottom:15px;">
        <span class="er-circle" :class="{'cart-active':isShow==0}"></span>
        <span class="c" :class="{'active-font':isShow==0}">
          全款付：
          <span>￥{{comm.rulePrice }}</span>
        </span>
      </p>
      <p class="flex-r co" @click="isShowType(1)">
        <span class="c er-circle" :class="{'cart-active':isShow==1}"></span>
        <!-- <span>{{hospitalPay}}</span> -->
        <span class="c" :class="{'active-font':isShow==1}">
          预付定金
          <span class="c">￥{{comm.depositPrice}}</span>
          <span class="c" style="margin-left:10px;color:#999;">
            <span v-if="organType==1">到院支付：</span>
            <span v-if="organType==2">到店支付：</span>
            <span class="c">￥{{hospitalPay}}</span>
          </span>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    addNum: {
      type: Boolean,
      default: false
    },
    sel: {
      type: Boolean,
      default: false
    },
    comm: {
      type: Object,
      default() {
        return {};
      }
    },
    payType: {
      type: Number,
      default: 1
    },
    organType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      num: 1,
      isShow: 0
    };
  },
  mounted() {},

  computed: {
    isSelShow() {
      if (this.issel) {
        this.isShow = this.issel == 1 ? 0 : 1;
      }
    },
    hospitalPay() {
      if (this.sel)
        return (this.comm.rulePrice - this.comm.depositPrice).toFixed(2);
    }
  },
  beforeUpdate() {
    // console.log(this.q);
  },

  methods: {
    addNumc(n) {
      if (n > 0) {
        this.num++;
      } else {
        if (this.num <= 1) {
          this.num = 1;
        } else {
          this.num--;
        }
      }

      this.$emit("addnum", this.num);
    },
    isShowType(n) {
      this.isShow = n;
      this.$emit("payType", this.isShow == 0 ? "1" : "0");
    }
  }
};
</script>
<style scoped lang="less">
input {
  margin: 0;
  padding: 0;
  min-height: 0;
}
.c-num {
  width: 104px * 2;
  height: 29px * 2;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}

.c-num span,
.c-num input {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: 100%;
  width: 80px;
  border: 1px solid #bbb;
  /* border-radius: 6px; */
  font-size: 15px * 2;
  color: #999;
}
.c-num input {
  width: 40px;
  padding: 0 20px;
}

.c-num span:first-child {
  border-top-left-radius: 6px * 2;
  border-bottom-left-radius: 6px * 2;
}
.add-num,
.sub-num {
  align-items: center;
}
.c-num span:last-child {
  border-top-right-radius: 6px * 2;
  border-bottom-right-radius: 6px * 2;
}

.c-num input {
  //   padding-left: 20px;
  //   padding-right: 20px;
  /* width: 0.7px*100; */
  border-left: none;
  border-right: none;
  border-radius: 0;
}
/* sle*/
.sel {
  /* margin-top: 30px; */
  font-size: 0.24px * 100;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 28px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}
.sel .co {
  line-height: 50px;
  align-items: center;
  //   padding: 15px 0;
}
.co span:first-child {
  margin-right: 10px;
}
.er-circle {
  background-image: url("http://img.meiduduo.com/images/mine/nosel.png");
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
  width: 36px;
  height: 36px;
  /* border: 2px solid rgba(191, 191, 191, 1);
  border-radius: 50%; */
}
.cart-active {
  background-image: url("http://img.meiduduo.com/images/mine/yessel.png");
}
.active-font {
  color: #ff4691;
}
.flex-r {
  display: flex;
  flex-direction: row;
}
</style>

