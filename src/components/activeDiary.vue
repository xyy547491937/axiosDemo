<template>
  <div>
    <div v-for="(item, index) of diaryValue" :key="index" class="typeDiary-kuang">
      <div class="typeDiary-title">
        <div class="user-info" @click.stop="userDetail(item)">
          <div>
            <figure class="typeDiary-img">
              <img :src="item.authorIcon" alt>
            </figure>
          </div>
          <div span="18" class="typeDiary-name">{{ item.authorName }}</div>
        </div>

        <div span="4" class="typeDiary-name" v-if="item. author!=userInfo.custId">
          <span class="add_btn" @click="focus(item)">
            <span v-if="!item.isFollow">+关注</span>
            <span v-else>已关注</span>
          </span>
        </div>
      </div>

      <div>
        <div class="flex-r show-img" @click.stop="diaryBookDetail(item)">
          <div span="12">
            <div class="typeDiary-before">
              <figure class="typeDiary-before">
                <img :src="item.preFirstPhoto" class="typeDiary-before-img" width="100%">
              </figure>

              <figure class="typeDiary-pos">
                <img src="http://img.meiduduo.com/images/index/Before.png" width="100%">
              </figure>
            </div>
          </div>
          <div span="12">
            <div class="typeDiary-before">
              <figure class="typeDiary-before">
                <img :src="item.afterFirstPhoto" class="typeDiary-before-img" width="100%">
              </figure>

              <figure class="typeDiary-pos">
                <img src="http://img.meiduduo.com/images/index/After.png" width="100%">
              </figure>
            </div>
          </div>
        </div>
        <!-- <div>
          <span class="typeDiary-details" v-html=" item.diaryContent"></span>
        </div>-->
        <div class="div-type flex-r">
          <!-- <i-icon type="label" color="#FF4892" size="20"/> -->
          <span class="iconfont icon-label" style="font-size:20px ;color:#ff4892"></span>
          <span class="typeDiary-type">{{item.title}}</span>
        </div>
        <div class="div-hos">
          <div class="flex-r show-img">
            <div span="20">
              <div class="div-hos-left">
                <!-- <img src="http://img.meiduduo.com/images/index/bye_icon.png" alt> -->
                <div class="diary-icons"></div>
                {{ item.commName }}
              </div>
            </div>
            <div span="4">
              <div class="typeDiary-price">￥{{ item.rulePrice }}</div>
            </div>
          </div>
        </div>
        <div class="typeDiary-bottom flex-r img-show">
          <div class="show-num">{{item.shortTimeString}}</div>
          <div class="flex-r show-num zan-add">
            <div span="4">
              <!-- <i-icon type="browse" size="14"/> -->
              <span class="iconfont icon-yanjing" style="font-size:14px;"></span>
              <span>{{ item.readNum }}</span>
            </div>
            <div span="4">
              <!-- <i-icon type="message" size="14" style="text-align: center;"/> -->
              <span class="iconfont icon-pinglun" style="font-size:14px;"></span>
              <span>{{ item.commentNum }}</span>
            </div>
            <!-- @click.stop="giveGoods(item)" -->
            <div span="4">
              <!-- <span
                class="iconfont icon-zan"
                style="font-size:14px;color:#ff4691"
                v-if="item.isThumbsUp"
              ></span>
              <span class="iconfont icon-zan" style="font-size:14px;color:#999" v-else></span>-->
              <span>赞</span>
              <span>{{ item.fabulousNum }}</span>
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
    <div v-transfer-dom>
      <confirm v-model="toLoginShow" title="您当前未登录" @on-confirm="onConfirm">
        <p style="text-align:center;">是否去登录</p>
      </confirm>
    </div>
  </div>
  <!-- 数据加载完毕 -->
  <!-- <div class="noData" v-if="diaryValue.length < 1"></div> -->
</template>

<script>
import { mapState } from "vuex";
import { http } from "../api/pageApi.js";
import { Confirm, TransferDom } from "vux";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
  props: {
    diaryValue: {
      type: Array,
      default: []
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
      shared: false,
      userId: -1
    };
  },
  components: {
    Confirm,
    TransferDom
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {},
  methods: {
    jump(item) {
      this.changeJump("/pagesShow/diary_info", {
        id: item.id,
        type: 7
      });
    },

    //跳转日记本

    diaryBookDetail(item) {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        diaryBookId: item.id
      };
      if (isAndroid) {
        window.android.diaryBookDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.diaryBookDetail.postMessage(params);
      }
    },
    //点金头像跳转
    userDetail(item) {
      if (!this.checkSource()) {
        return;
      }
      let params = {
        recordType: item.createType == 0 ? 0 : 1,
        userId: item.author
      };
      if (isAndroid) {
        window.android.userDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.userDetail.postMessage(params);
      }
    },
    toFollow(item) {
      // 关注用户
      item.isFollow = !item.isFollow;
      //POST /focusRecord/save
    },
    onConfirm() {
      // this.toLoginShow = true;
      console.log("点击确认");
      if (isAndroid) {
        window.android.toLogin(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.toLogin.postMessage(null);
      }
    },

    focus(item) {
      if (isAndroid) {
        this.userId = window.android.getUserId();
      }
      if (!this.checkSource()) {
        return;
      }
      if (this.userInfo.custId || this.userId != -1) {
        http("focusRecord/save", {
          recordId: item.author,
          custId: this.$store.state.userInfo.custId,
          recordType: 6,
          state: item.isFollow ? "-1" : "1"
        }).then(res => {
          if (res.code == 1) {
            //   this.isFollow = false;
            this.toFollow(item);
          }
        });
      } else {
        this.toLoginShow = true;
      }
    },
    //点赞
    giveGoods(item) {
      if (isAndroid) {
        this.userId = window.android.getUserId();
      }
      if (!this.checkSource()) {
        return;
      }
      if (this.$store.state.userInfo.custId || this.userId != -1) {
        http("customerRecord/save", {
          recordId: item.id,
          custId: this.$store.state.userInfo.custId,
          recordType: 7,
          crType: 1,
          state: item.isThumbsUp ? "-1" : "1"
        }).then(res => {
          // console.log(res);
          if (res.code == 1) {
            if (!item.isThumbsUp) {
              item.fabulousNum++;
              // console.log(item.fabulousNum);
            } else {
              item.fabulousNum--;
            }
            item.isThumbsUp = !item.isThumbsUp;
          }
        });
      } else {
        //假如用户没有登陆
        this.toLoginShow = true;
      }
    },
    checkSource() {
      const self = this;
      if (!this.shared) {
        return true;
      } else {
        let a = this.checkWeiXin();
        const navigatorInfo = navigator.userAgent;
        const isAndroid =
          navigatorInfo.indexOf("Android") > -1 ||
          navigatorInfo.indexOf("Adr") > -1; //android终端
        const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (!a) {
          if (isAndroid) {
            window.location.href = this.shareInfo.androidScheme;
            setTimeout(() => {
              window.location.href = self.shareInfo.androidDownload;
            }, 500);
          }
          if (isiOS) {
            window.location.href = this.shareInfo.iosScheme;
            setTimeout(() => {
              window.location.href = self.shareInfo.iosDownload;
            }, 500);
          }
        } else {
          window.location.href =
            "http://img.meiduduo.com/h5/download.html?path=main";
        }
        return false;
      }
    },
    checkWeiXin() {
      // 是否在微信浏览器打开
      const navigatorInfo = navigator.userAgent.toLowerCase();
      if (navigatorInfo.match(/WeiBo/i) == "weibo") {
        return true
      } else if (navigatorInfo.match(/QQ/i) == "qq") {
        return true
      } else if (navigatorInfo.match(/MicroMessenger/i) == "micromessenger") {
        return true
      } else {
        return false
      }
      // if (navigatorInfo.match(/MicroMessenger/i) == "micromessenger") {
      //   // this.toDefaultBrowser = true;
      //   return true;
      // } else {
      //   return false;
      // }
    }
  }
};
</script>

<style scoped lang="less">
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
  margin-bottom: 0.18px * 100;
  padding: 0 0.24px * 100;
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
</style>
