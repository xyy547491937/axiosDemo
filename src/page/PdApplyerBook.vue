<template>
  <div>
    <!-- 胚豆达人用户协议 -->
    <div class="Pd-private" v-html="PdBook.content"></div>
  </div>
</template>
<script>
import { http } from "../api/pageApi.js";
let fromURL = "";
export default {
  data() {
    return {
      PdBook: {},
      fromURL: ""
    };
  },
  mounted() {
    this.getBook();
  },
  methods: {
    getBook() {
      http(this.$store.state.httpUrl + "sys/agreement/getAgreementDoyen").then(
        res => {
          if (res.code == 1) {
            this.PdBook = res.data;
          }
        }
      );
    }
  }
};
</script>
<style lang="less">
.Pd-private {
  padding: 15px 20px 15px 15px;
}
</style>