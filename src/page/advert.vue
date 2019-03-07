<template>
  <div class="advert">
    <img
      v-for="(v,i) in 10"
      :key="i"
      :src="'http://img.meiduduo.com/images/xyy/adv_'+ (i+1) +'.png'"
      alt
    >
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>