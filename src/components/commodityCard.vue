<template>
  <div @click="jump" class="commodity">
    <!-- <img class="" :src="data.commImg[0]" alt> -->
    <div class="commodity_img" :style="{backgroundImage:`url(${data.commImg[0]})`}"></div>
    <div class="commodity_main">
      <div class="title_box z-lines-2-overflow-hidden">
        <span class="commodity_title">[{{ data.commName }}]</span>
        <span class="commodity_content">{{ data.remark }}</span>
      </div>
      <!-- <div class="content_box z-lines-2-overflow-hidden">
        <span class="commodity_content">{{ data.remark }}</span>
      </div>-->
      <span class="commodity_rule_price">
        <span class="commodity_rule_label">￥</span>
        {{ data.rulePrice }}
      </span>
      <div class="commodity_info">
        <!-- <span>￥{{ data.rulePrice }}</span> -->
        <span style="text-decoration:line-through;">￥{{ data.price }}</span>
        <span>{{ data.buyNum }}人购买</span>
      </div>
      <div class="commodity-organ-style z-lines-1-overflow-hidden" v-if="shop">{{ data.organName }}</div>
      <div class="commodity_footer">
        <div v-if="share" class="commodity_dot">
          <span style="background: #D29DFF;">分享赚{{ data.endorsementFee }}代言费</span>
        </div>
        <div v-else class="commodity_dot">
          <span v-if="data.distance" style="background: #D29DFF;">{{ data.distance }}km</span>
          <span v-if="data.isStage" class="commodity-footer-item" style="background: #FA97E6;">分</span>
          <span v-if="data.isInsurance" class="commodity-footer-item" style="background: #74DEC4;">保</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "share", "shop"],
  data() {
    return {};
  },
  methods: {
    jump() {
      this.$emit("jump", this.data);
    }
  }
};
</script>

<style scoped>
.commodity {
  /* break-inside: avoid; */
  width: 334px;
  box-sizing: border-box;
  /* margin: 20px; */
  margin-bottom: 20px;
  /* margin-left: 10px; */
}
figure {
  display: block;
  width: 334px;
  height: 350px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.commodity_img {
  display: block;
  width: 334px;
  height: 350px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.commodity_main {
  padding: 20px 17px;
  background: #fff;
  border-radius: 0 0 8px 8px;
}
.commodity_title {
  font-size: 28px;
  height: 40px;
  line-height: 40px;
  font-weight: 700;
  color: #333333;
}
.commodity_content {
  font-size: 28px;
  color: #666666;
  height: 40px;
  line-height: 40px;
}
.commodity_info {
  font-size: 24px;
  color: #999999;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.commodity_info span:first-child {
  font-size: 24px;
  color: #999999;
  margin-right: 14px;
}
.commodity_info span:last-child {
  flex: 1;
  text-align: right;
}
.commodity_footer {
  display: flex;
  /* justify-content: space-between; */
  font-size: 22px;
  color: #fff;
}
.commodity_dot > span {
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  margin-right: 8px;
}
.commodity_dot > span:first-child {
  padding: 0 11px;
}
.commodity_dot > span:last-child {
  margin-right: 0;
}
.commodity_footer > img {
  display: block;
  width: 72px;
  height: 32px;
}
.content_box {
  font-size: 24px;
  color: #666666;
}
.title_box {
  font-weight: 400;
  font-size: 28px;
  color: #333333;
}
span.commodity-footer-item {
  /* width: 60px; */
  padding: 0 5px;
  text-align: center;
}
.commodity_rule_price {
  color: #ff4691;
  font-size: 32px;
  font-weight: 600;
}
.commodity_rule_label {
  font-size: 24px;
  font-weight: 400;
}
.commodity-organ-style {
  font-size: 24px;
  color: #999999;
}
</style>
