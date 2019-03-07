<template>
  <!-- 1 小视频 2文章 3资讯-->
  <div>
    <div class="typeDiary-kuang" @click="videoDetail(videoList)">
      <!-- 视频 和咨询 -->
      <div
        class="video-model"
        :style="{backgroundImage:`url(${videoList.cover[0]})`}"
        v-if="videoList.type==1 "
      >
        <span class="play-btn" v-if="videoList.type==1"></span>
      </div>

      <!-- 文章 -->
      <div
        class="article-box"
        :class="{'video-model': !videoList.cover.length>=3}"
        v-if="videoList.type==2"
      >
        <div class="article-box-if" v-if="videoList.cover.length>=3">
          <div class="gride-1 gride-3" :style="{backgroundImage:`url(${videoList.cover[0]})`}">
            <!-- <img :src="videoList.cover[0]" alt=""> -->
          </div>
          <div class="gride-1 gride-3" :style="{backgroundImage:`url(${videoList.cover[1]})`}">
            <!-- <img :src="videoList.cover[1]" alt=""> -->
          </div>
          <div class="gride-1 gride-3" :style="{backgroundImage:`url(${videoList.cover[2]})`}">
            <!-- <img :src="videoList.cover[2]" alt=""> -->
          </div>
        </div>
        <div class="article-box-if" v-else>
          <div class="gride-1 video-model" :style="{backgroundImage:`url(${videoList.cover[0]})`}">
            <!-- <img :src="videoList.cover[0]" alt=""> -->
          </div>
        </div>
      </div>

      <div class="video-intr ellipse-3" v-html="videoList.content "></div>
      <div>
        <div class="typeDiary-bottom flex-r img-show">
          <div class="show-num flex-r">
            <span class="organ-icon" :style="{backgroundImage:`url(${videoList.authorIcon})`}">
              <!-- <img :src="videoList.authorIcon" alt width="100%"> -->
            </span>

            <span class="xyy-ellipsis-1 organ-name">{{videoList.authorName}}</span>
          </div>
          <div class="flex-r show-num zan-add">
            <div span="4">
              <!-- <i-icon type="browse" size="14"/> -->
              <span class="iconfont icon-yanjing" style="font-size:14px;"></span>
              <span class>{{ videoList.readNum }}</span>
            </div>
            <div span="4">
              <!-- <i-icon type="message" size="14" style="text-align: center;"/> -->
              <span class="iconfont icon-pinglun" style="font-size:14px;"></span>
              <span>{{ videoList.commentNum }}</span>
            </div>
            <div span="4" @click.stop="giveGoods(videoList)">
              <span
                class="iconfont icon-zan"
                style="font-size:14px;color:#ff4691"
                v-if="videoList.isThumbsUp"
              ></span>
              <span class="iconfont icon-zan" style="font-size:14px;color:#999" v-else></span>
              <span>{{ videoList.fabulousNum }}</span>
            </div>
            <!-- <div span="4">
							<i-icon type="like" size="14" style="text-align: center;" />
							<span>1320</span>
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <!-- 调到登录界面 -->
    <!-- <div v-transfer-dom>
      <confirm v-model="toLoginShow" title="您当前未登录" @on-confirm="onConfirm">
        <p style="text-align:center;">是否去登录</p>
      </confirm>
    </div>-->
  </div>
  <!-- 数据加载完毕 -->
  <!-- <div class="noData" v-if="diaryValue.length < 1"></div> -->
</template>

<script>
import { mapState } from "vuex";
import { http } from "../api/pageApi.js";
import { Confirm, TransferDom } from "vux";

export default {
  props: {
    videoList: {
      type: Object,
      default: {}
    },
    shared: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isFollow: false, // 是否关注
      list: [],
      toLoginShow: false,
      userId: -1
    };
  },

  directives: {
    TransferDom
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    // console.log(this.videoList);
  },
  methods: {
    videoDetail(item) {
      this.$emit("goVideoOrArticle", item);
    },
    toFollow(item) {
      // 关注用户
      item.isFollow = !item.isFollow;
      //POST /focusRecord/save
    },
    giveGoods(item) {
      this.$emit("giveZan", item);
    }
  }
};
</script>
<style scoped lang="less">
@import url("../style/organ.less");

.organ-icon {
  width: 40px;
  height: 40px;
  // display: block;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  display: block;
}

.flex-r {
  display: flex;
  flex-direction: row;
}

.show-img {
  justify-content: space-between;
  align-items: center;
}

.zan-add {
  justify-content: space-around;
}

.show-num {
  width: 50%;

  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  > span {
    // width: 127px;
    // height: 25px;
    font-size: 26px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(85, 85, 85, 1);
  }
}

.div-type {
  align-items: center;
}

.typeDiary-bottom {
  padding: 0.18px * 100 0;
  font-size: 0.25px * 100;
  color: #acacac;
}

/* .typeDiary-bottom {
		;
	} */

.typeDiary-price {
  font-size: 0.2px * 100;
}

.div-hos {
  margin: 25px 0;
  padding: 0.1px * 100 0.2px * 100 0.1px * 100 0.2px * 100;
  background-color: #f5f5f5;
  color: #555;
}

.div-hos .diary-icons {
  vertical-align: sub;
  height: 0.3px * 100;
  width: 0.3px * 100;
  background: url("http://img.meiduduo.com/images/index/bye_icon.png") no-repeat;
  background-size: contain;
}

.div-hos-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-size: 0.22px * 100;
}

.typeDiary-type {
  color: #ff4691;
  margin-left: 0.1px * 100;
  font-size: 26px;
}

.typeDiary-details {
  color: #666666;
  font-size: 0.26px * 100;
  /* margin-bottom: .1px*100; */
  width: 100%;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 30px 0;
}

.typeDiary-pos {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1px * 100;
  height: 0.3px * 100;
}

.typeDiary-before {
  width: 3.42px * 100;
  height: 3.7px * 100;
  border-radius: 0.1px * 100;
  position: relative;
  overflow: hidden;
}

.typeDiary-before-img {
  height: 100%;
  width: 100%;
}

.user-info {
  display: flex;
  flex-direction: row;
}

.typeDiary-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.28px * 100 0 0.24px * 100;
  font-size: 26px;
  color: #555;
  align-items: center;
}

.typeDiary-name {
  font-size: 0.3px * 100;
}

.typeDiary-kuang {
  background: #fff;
  // margin-bottom: 0.18px * 100;
  padding: 24px 0.24px * 100;
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
}

.typeDiary-img {
  width: 40px;
  height: 40px;
}

.typeDiary-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
}

.add_btn {
  display: flex;
  align-items: center;
  color: #fa418c;
  height: 34px;
  border-radius: 17px;
  border: 1px solid #fa418c;
  line-height: 34px;
  justify-content: center;
  font-size: 22px;

  & > span {
    padding: 4px 10px;
  }
}

.over_banner {
  font-size: 20px;
  color: #666666;
  text-align: center;
  padding: 17px;
}

.no_data {
  width: 100%;
  height: 400px;
  margin-top: 30px;
  font-size: 24px;
  color: #999999;
  text-align: center;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-model {
  // margin-bottom: 30px;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;

  > .play-btn {
    background-image: url("http://img.meiduduo.com/images/info/play.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 120px;
    height: 120px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    > img {
      width: 100%;
    }
  }
}

.video-intr {
  width: 100%;
  font-size: 26px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(102, 102, 102, 1);
  // display: block;
  margin-top: 30px;
}
.article-box {
  // margin-bottom: 30px;
  > .article-box-if {
    // height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    > .gride-1:not(:first-child) {
      margin-left: 15px;
    }
    > .gride-1 {
      flex: 1;
      border-radius: 10px;

      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      > img {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }
  }
}
.gride-3 {
  height: 220px;
}
.organ-name {
  margin-left: 10px;
}
</style>
