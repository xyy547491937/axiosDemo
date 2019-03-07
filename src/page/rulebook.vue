<template>
  <div class="vo">
    <div class="container-rule">
      <h3 class="rule-title">常见问题</h3>
      <div class="cv">
        <p class="x-title">1. 关于结算时间</p>
        <span class="x-content">用户在每月的1-5号发起提现申请，平台将在一周内结算上个自然月（每月1日-每月最后1日）的可提现金额。</span>
      </div>
      <div class="cv">
        <p class="x-title">2. 关于结算订单</p>
        <span class="x-content">每月1-5号结算的是上个自然月（每月1日-每月最后1日）已使用的订单。</span>
      </div>
      <div class="cv">
        <p class="x-title">3. 关于提现</p>
        <span class="x-content">提现金额大于等于100元时，点击提现按钮进行提现；提现金额小于100元时，不能进行提现；提现成功后金额在微信钱包中查看。</span>
      </div>
      <!-- 关于提现 -->
      <div class="cv">
        <p class="x-title">4. 名词解释</p>
        <p class="x-title flex-r">
          <span class="line-title">可提现金额：</span>
          <span class="hv">状态为已使用的订单的代言费总额。</span>
        </p>
        <p class="x-title flex-r">
          <span class="line-title">账户余额：</span>
          <span class="hv">包含状态为已使用和未使用订单的代言费总额。</span>
        </p>
        <p class="x-title flex-r">
          <span class="line-title">累计到账：</span>
          <span class="hv">累计到账的所有已使用订单的代言费总额。</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import url("../style/style.less");

.container-rule {
  font-size: @baseSize*2;
  color: @baseTextColor-c;
  padding: @basePadding*2;
  background-color: @base-white;
  line-height: 22px * 2;

  & > .rule-title {
    font-size: 16px * 2;
    font-weight: bold;
    color: @baseFirstTitleColor;
    margin-bottom: 30px * 2;
  }

  & > .cv {
    margin-bottom: 15px * 2;

    & .x-title {
      font-weight: bold;
      color: @baseFirstTitleColor;
      margin-bottom: 15px * 2;
    }
  }

  & .hv {
    margin-left: 10px * 2;
    font-weight: normal;
    color: @baseTextColor-c;
  }
}
.line-title {
  display: inline-block;
  width: 25%;
}
</style>
