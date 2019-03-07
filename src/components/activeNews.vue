<style>
.activeArticle {
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.activeArticle .activeArticle-content {
  width: 50%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 6px 8px 6px;
}
.activeArticle figure {
  width: 290px;
  height: 180px;
  border-radius: 8px;
}
.activeArticle .art-img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.activeArticle .ac-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.activeArticle .activeArticle-title {
  font-size: 36px;
  color: #333;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ac-bottom {
  font-size: 24px;
  padding-bottom: 6px;
}
.ac-bottom .tag {
  border: 1px solid #ff4069;
  color: #ff4069;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 2px;
  max-width: 84px;
  padding: 1px 2px;
  font-size: 20px;
  box-sizing: border-box;
  /* height: 32px; */
}
.ac-bottom .from {
  margin-right: 10px;
  color: #999;
  max-width: 140px;
  height: 32px;
}
.ac-bottom .num {
  display: flex;
  align-items: center;
  color: #999;
  margin-left: 15px;
}

/* 文本溢出处理 */
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comm-num {
  margin-left: 5px;
}
</style>
<template>
  <div class="activeArticle" @click="toInfomation(arti)">
    <div class="activeArticle-content">
      <div class="activeArticle-title">{{arti.title}}</div>
      <div class="ac-bottom">
        <!--  -->
        <div class="tag ellipsis" v-if="arti.channelName">{{arti.channelName}}</div>
        <div class="from ellipsis">{{arti.source}}</div>
        <div class="num" style="display:flex;align-item:center;text-align: center; margin-top:2px;">
          <!-- <i-icon
            type="message"
            size="16"
            style="display:flex;align-item:center;text-align: center;"
          />-->
          <span class="iconfont icon-pinglun" style="font-size:14px;"></span>
          <span class="comm-num">{{arti.commentNum}}</span>
        </div>
      </div>
    </div>
    <figure>
      <img class="art-img" :src="cover" alt>
    </figure>

    <!-- <img class="art-img" src="http://img.meiduduo.com/images/index/kangshuai.png" alt=""> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    arti: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    }
  },
  components: {},
  computed: {
    cover() {
      return this.arti.cover[0];
    }
  },
  methods: {
    toInfomation(item) {
      this.$emit("goVideoOrArticle", item);
    }
  }
};
</script>

