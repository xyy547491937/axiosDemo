<template>
  <div class="information">
    <vue-better-scroll
      class="wrapper"
      ref="scroll"
      :listenScroll="true"
      :listenBeforeScroll="true"
      @scroll="scrollDs"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      :startY="parseInt(startY)"
      :freeScroll="freeScroll"
      @beforeScrollStart="beforeScrollStart"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
    >
      <div class="main" id="main" style="min-height: 600px;" ref="listContent">
        <div style="background:#fff;padding:0 18px 20px;">
        <div class="infor_top_detail">
          <span class="detail_left">
            <figure class="head">
              <img
                :src="authorIcon ? authorIcon : 'http://img.meiduduo.com/images/h5/default_icon.png'"
              >
            </figure>
            <span class="detail_name">
              <em class="detail_source">{{authorName}}</em>
            </span>
          </span>
          <span
            :class="nowDocterFoucs ? 'follow': 'follow focus'"
            @click="focusRecordSave(!nowDocterFoucs)"
          ><div v-if="nowDocterFoucs==1" style="float:left;position:relative;width:10px;height:18px;overflow:hidden;"><x-icon type="ios-checkmark-empty" style="fill:#999;position: absolute;left: -8px;top: -2px;" ></x-icon></div>{{nowDocterFoucs ? '已关注' : '+关注'}}</span>
        </div>
        <div class="content">
          <!--  视屏区域 -->
          <!-- <div class="live-box" v-if="img[0] || img[1]"> -->
            <!--  文章图片 -->
            <!-- <div class="article-img flex-r" v-if="img[0] || img[1]">
              <div class="gride-2">
                <img :src="img[0]" alt mode="widthFix">
              </div>
              <div style="width:4px" v-if="img[0] && img[1]"></div>
              <div class="gride-2" v-if="img[1]">
                <img :src="img[1]" alt mode="widthFix">
              </div>
            </div> -->
          <!-- </div> -->
          <div
            v-html="information.content!=='undefined'?information.content:''"
            @error.capture="imgerror"
          ></div>
          <div class="boxImg" v-if="img&&img.length>0">
            <img class="previewer-demo-img" :class="img.length>1? 'img9': 'margin:0;'" v-for="(item,index) in img"  @click="clickImage(index)" :key="index" :src="item" alt="">
          </div>
          <video
            style="margin:0 auto 50px;display:block;width:100%;height:225px;position：absolute"
            v-if="information.type == 2 && information.videoUrl"
            id="video"
            ref="video"
            autoplay
            controls
            :src="information.videoUrl"
            x5-video-player-type="h5"
            :x5-video-player-fullscreen="true"
            x5-playsinline="playsinline"
            playsinline="playsinline"
          ></video>
        </div>
        <div class="doctor-said-card-info">
          <span class="info-time">{{information.createDate  ? information.createDate : ''}}</span>
          <div class="info-icon">
            <span class="info-icon-see">{{information.commentNum}}</span>
            <!-- <span @click="publicMth('isThumbsUp',customerRecordSave,information)"><i :class="'iconfont '+ (isThumbsUp?'icon-zan icon-zanok':'icon-zan')"></i> -->
            <span @click="likeThisMessage()" :class="information.isThumbsUp ? 'info-icon-zan-active' : 'info-icon-zan-no-active'" class="info-icon-zan">{{information.fabulousNum}}</span>
          </div>
        </div></div>
        <div v-if="comments.length>0" class="commentDoctor" style="padding: 10px 0 0;background: #f5f5f5;">
          <div  style="padding: 0 14px 0;background: #fff;">
          <div class="comme" style="line-height:40px;height:40px;color:#333;border-bottom:1px solid #eee;margin-bottom: 10px;">评论</div>
          <div >
            <div class="information_review" v-for="(item, index) of comments" :key="index">
              <div class="review_main">
                <div class="review_head">
                  <figure class="head">
                    <img :src="item.icon ? item.icon : 'http://img.meiduduo.com/images/h5/default_icon.png'">
                  </figure>
                </div>
                <div class="review_content">
                  <div class="review_title">
                    <span class="review_name">{{item.nickName}}</span>
                    <span
                      class="review_num"
                      ref="zan"
                      @click="commentsZan(item)"
                    >
                      <span :class="item.isThumbsUp ? 'info-icon-zan-active' : 'info-icon-zan-no-active'" class="info-icon-zan">{{item.fabulousNum}}</span>
                      <!-- <i :class="'iconfont '+ (item.isThumbsUp?'icon-zan icon-zanok':'icon-zan')"></i>
                      <em>{{item.fabulousNum}}</em> -->
                    </span>
                  </div>
                  <div class="review_matter2">
                    <div class="review_matter">{{item.content}}</div>
                    <!-- 回复 -->
                    <div class="child-content" v-show="item.children && item.children.length>0">
                      <div v-for="(child,i) in item.children" :key="i" :track-by="i" v-if="i<10">
                        <span class="child-name">{{child.nickName}}：</span>
                        <span class="child-text">{{child.content}}</span>
                      </div>
                    </div>
                  </div>
                  <p class="review_other">
                    <span>{{item.createDate}}</span>
                    <span class="detailC" @click="writeShow(item)">回复</span>
                  </p>
                </div>
              </div>
            </div>
          </div></div>
        </div>
      </div>
    </vue-better-scroll>
    <div class="doctor-said-title">
      <span @click="goBack" class="title-back-icon iconfont icon-fanhui"></span>
      <span>医生说说</span>
    </div>
    <commentModule
      @send="getList(id)"
      @sendStatusM="sendStatusM"
      v-bind:writeItem="writeItem"
      v-if="writeCommentS"
    ></commentModule>
    <div class="toTop" v-show="topShow" @click="scrollTo">顶部</div>
    <div v-transfer-dom>
      <previewer :list="preImg" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>
<script>
import commentModule from "./commentModule";
import { http, queryLike, toAttention } from "../api/pageApi.js";
import { Scroller, Confirm, TransferDom } from "vux";
import { log } from "util";
import VueBetterScroll from "vue2-better-scroll";
import { Previewer } from 'vux'
import { mapState, mapMutations } from 'vuex';
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default {
  data() {
    return {
      show: false,

      text1: "Hello world",
      id: "",
      custId: "",
      type: "12",
      topShow: false,
      writeCommentS: false,
      isFollow: "",
      comments: [],
      customerRecords: [],
      writeItem: {
        write1: false,
        write2: true,
        sendStatus: false,
        contentId: "",
        custId: "",

        criticId: "",
        commentId: "",
        commentType: ""
      },
      scrollToNum: "",
      information: {},
      hcArticle: {},
      img: [],
      pageNum: 1,
      pageSize: 5,
      // downflag: false, //是否是下拉刷新,
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: false
      },
      pullDownRefreshObj: {
        //是否是下拉刷新,
        threshold: 90,
        stop: 40
      },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      freeScroll: true,
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      preImg: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      },
      isThumbsUp: true
    };
  },
  components: {
    commentModule,
    Scroller,
    Confirm,
    TransferDom,
    VueBetterScroll,
    Previewer
  },
  directives: {
    TransferDom
  },
  created() {
    this.id = this.$route.query.id;
    this.authorIcon = this.$store.state.nowDoctorDetail.icon;
    this.authorName = this.$store.state.nowDoctorDetail.name;
    console.log(this.$store.state.nowDoctorDetail.name)
    this.custId = this.$store.state.userInfo.custId;
    this.$set(this.writeItem, "commentType", this.type);
    this.$set(this.writeItem, "sendStatus", false);
    this.$set(this.writeItem, "contentId", this.$route.query.id);
    this.$set(this.writeItem, "custId", this.custId);
  },
  mounted() {
    this.$nextTick(() => {
      this.queryOneByPk(this.id);
      this.getList(this.id);
    });
  },
  computed: {
    ...mapState(['nowDocterFoucs', 'nowDoctorDetail', 'userInfo'])
  },
  methods: {
    ...mapMutations(['updateDoctorFoucs']),
    goBack () {
      this.$router.go(-1)
    },
    likeThisMessage (obj) {
      let params = {
        id: this.information.id,
        userId: this.userInfo.custId,
        type: 12,
        state: this.information.isThumbsUp ? -1 : 1
      }
      this.likeIt(params)
    },
    likeIt (obj) {
      queryLike({
        recordId: obj.id,
        custId: obj.userId,
        recordType: obj.type,
        crType: 1,
        state: obj.state
      }).then(res => {
        this.queryOneByPk(this.id)
        if (res.code == 1) {
          console.log('点赞操作成功')
        }
      })
    },
    clickImage (index) {
      this.$refs.previewer.show(index)
    },
    imgerror(event) {
      event.target.style.display = "none";
    },
    beforeScrollStart(e) {
      console.log(" this.$refs.scroll.refresh();");
      this.$refs.scroll.refresh();
      console.log(this.$refs.scroll.refresh());
      console.log(this.$refs.scroll);
      console.log(this.$refs.scroll.clientHeight);
    },
     publicMth(data, mth, item, index) {
      console.log(this[data]);
      this.$set(this, data, !this[data]);
      if (data == "isThumbsUp") {
        this.$set(
          item,
          "fabulousNum",
          this[data] ? item.fabulousNum + 1 : item.fabulousNum - 1
        );
      }
      mth(item, this[data]);
    },
    customerRecordSave(item, status) {
      //点赞
      var option = {
        recordId: item.id,
        custId: this.custId,
        recordType: 12,
        crType: 1,
        state: status ? 1 : -1
      };
      http("customerRecord/save", option).then(res => {
        if (res.code == 1) {
          item.isThumbsUp = !item.isThumbsUp;
          this.isThumbsUp = !this.isThumbsUp;
          let params = {
            isThumbsUp: item.isThumbsUp,
            fabulousNum: item.fabulousNum
          };
        }
      });
    },
    // 滚动到页面顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    scrollDs(data) {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(clientHeight);

      if (Math.abs(data.y) >= clientHeight) {
        this.topShow = true;
      } else {
        this.topShow = false;
      }
    },
    //上拉加载
    onPullingUp() {
      console.log("上拉加载更多");
      this.pageNum++;
      this.getList(this.id);
    },
    //下拉刷新
    onPullingDown() {
      // this.downflag = true;
      this.pageNum = 1;
      this.getList(this.id);
      // this.$refs.scroll.forceUpdate(true);
    },
    // 关注
    focusRecordSave(state) {
      toAttention({
        recordId: this.nowDoctorDetail.id,
        custId: this.userInfo.custId,
        recordType: 1,
        state: this.nowDocterFoucs ? -1 : 1,
        token: this.userInfo.token == '' ? null : this.userInfo.token
      }).then(res => {
        if (res.code == 1) {
          this.updateDoctorFoucs(state)
        }
      })
    },
    queryOneByPk(id) {
      let option = {
        id
      };
      if (this.userInfo.custId) {
        option.custId = this.userInfo.custId
      }

      http("/tops/queryOneByPkAndCustId", option).then(res => {
        if (res.code == 1) {
          this.information = res.data;
          this.information.content = this.information.content.replace(
            /(\r\n|\n|\r)/gm,
            "<br>"
          );
          this.information.content = this.information.content.replace(
            /\<p\>\<br\>\<\/p\>/g,
            ""
          );
          this.information.content = this.information.content.replace(
            /\<br\>/g,
            " "
          );
          this.writeCommentS = true;
          // if (res.data.isFollow == 1) {
          //   this.$set(this, "isFollow", true);
          // } else {
          //   this.$set(this, "isFollow", false);
          // }
          this.img = this.information.images ? this.information.images.split(",") : []
          // this.img = [
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png',
          //   'http://img.meiduduo.com/images/h5/default_icon.png'
          // ]
          this.preImg = this.img.map(el => {
            let a = {}
            a.src = el
            a.msrc = el
            return a
          })
          console.log(this.img)
        }
      });
    },
    getList(id) {
      var option = {
        contentId: id,
        custId: this.custId || "",
        commentType: this.type,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      http("comment/list4Page", option).then(res => {
        this.customerRecords = [];
        if (!res || res.code == -1) {
          return false;
        }

        if (res.data.data.length > 0) {
          console.log("data 有数据");
          res.data.data.forEach((ele, index) => {
            this.$set(
              this.customerRecords,
              index,
              ele.isThumbsUp > 0 ? true : false
            );
          });
          var a = res.data.data;

          if (this.pageNum == 1) {
            this.comments = a;
            return false;
          }
          if (this.pageNum * this.pageSize < res.data.total) {
            this.comments = this.comments.concat(a);
            this.$refs.scroll.forceUpdate(true);
          } else {
            this.comments = this.comments.concat(a);
            this.$refs.scroll.forceUpdate(false);
          }
        } else {
          console.log("data 没有数据");
          this.$refs.scroll.forceUpdate(false);
        }
        let num = res.data.data ? res.data.data.length : 0;
        let js = { type: this.type, id, num };
        js = JSON.stringify(js);
      });
    },
    commentsZan(item){
      if (isAndroid && this.$route.query.share != 1) {
        this.userId = window.android.getUserId();
      }
        //点赞
      var option = {
        recordId: item.id,
        custId: this.custId,
        recordType: 11,
        crType: 1,
        state: item.isThumbsUp? -1 : 1
      };
      http("customerRecord/save", option).then(res => {
        if (res.code == 1) {
          item.isThumbsUp = !item.isThumbsUp;
          if(!item.isThumbsUp){
            item.fabulousNum--

          }else{
            item.fabulousNum++
          }
        }
      });
    },
    //回复
    writeShow(item) {
      console.log(item)
      this.$set(this.writeItem, "sendStatus", true);
      this.$set(this.writeItem, "commentId", item.id);
      this.$set(this.writeItem, "criticId", item.criticId || item.custId);
    },
    //发送评论成功
    sendStatusM(data) {
      this.$set(this.writeItem, "sendStatus", data);
    }
  }
};
</script>
<style lang="css" scoped>
.iconfont{
  color:#999;
}
.boxImg{
  padding:10px 0 0;
  overflow: hidden;
}
.boxImg img{
  width: 100%;
  border-radius: 10px;
  margin-right: 14px;
  margin-bottom: 14px;
  float: left;
}
.boxImg img:nth-child(3n){
  margin-right: 0;
}
.boxImg .img9{
  display: block;
  width: 215px;
  height: 215px;
}
.doctor-said-card-info {
    width: 100%;
    display: flex;
    -webkit-display: flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    font-size: 24px;
    padding-top: 40px;
    color: #999;
  }
.info-icon .info-icon-see{
    margin-right: 31px;
    background-image: url('http://img.meiduduo.com/images/h5/talk_icon.png');
    background-position: left center;
    background-repeat: no-repeat;
    background-size: 26px 24px;
    padding-left: 30px;
}
.content img,
.content video {
  display: block;
  max-width: 100%;
  height: auto;
  /* overflow: hidden; */
  /* min-height: 100px; */
}
</style>
<style lang="less" scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}
.scroll-content{
  background: #f5f5f5;
}
.flex-r {
  display: flex;
  flex-direction: row;
}
input,
textarea {
  -webkit-appearance: none;
  outline: none;
  outline-color: transparent;
}
input:not([type="checkbox"]) {
  box-shadow: none;
  -webkit-appearance: none;
}
.information {
  font-family: PingFangSC-Regular;
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 90px;
}
.main {
  padding-top: 31px;

  // margin-bottom: 100px;
  // padding-bottom: 200px;
}
.title {
  font-size: 48px;
  color: #333;
  font-weight: bold;
  font-family: PingFangSC-Regular;
  margin-bottom: 44px;
  margin-top: 33px;
}
.infor_top_detail {
  margin-top: 40px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-bottom: 21px;
  justify-content: space-between;
  align-items: center;
}
.detail_left {
  display: flex;
  align-items: center;
}
.detail_left .head {
  width: 90px;
  height: 90px;
  float: left;
  margin-right: 20px;
  img {
    width: 100%;
    border-radius: 50%;
    height: 100%;
  }
}
.detail_name {
  min-width: 100px;
  // height: 62px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.detail_name em {
  font-style: normal;
  display: block;
}
.detail_name > .detail_source {
  font-size: 32px;
  color: #333333;
  font-weight: 700;
}
.detail_name > .detail_fromNow {
  display: block;
  font-size: 24px;
  color: #cccccc;
}
.follow {
   color:#999;
border:2px solid #999;
padding:4px 16px 4px 14px;
  text-align: center;
  font-size:24px;
  border-radius:50px;

}
.follow.focus {
  color: #ff2692;

   border:2px solid #ff2692;
  padding:4px 16px;
}
.content {
  font-family: PingFangSC-Light;
  font-size: 32px !important;
  color: #333333;
  width: 100%;
  position: relative;
  /deep/ img {
    display: block;
    max-width: 100%;
    height: auto;
    // max-width: 100%;
    overflow: hidden;
    min-height: 100px;
  }
  /deep/ video {
    display: block;
    max-width: 100%;
    height: auto;
    // max-width: 100%;
    overflow: hidden;
    min-height: 100px;
  }
  /deep/ iframe {
    width: 100%;
  }
}
.content /deep/ p {
  line-height: 50px;
  margin-bottom: 50px;
  font-size: 36px;
}
.operation {
  display: flex;
  display: -webkit-flex;
  /* justify-content: space-between; */
  justify-content: center;
  padding: 20px 10px;
}
.operation1 {
  width: 152px;
  height: 55px;
  padding: 0 10px 60px;
  margin: 0 auto;
}
.operation span,
.operation1 span {
  display: inline-block;
  width: 152px;
  height: 55px;
  border: 1px solid #ccc;
  border-radius: 28px;
  font-size: 24px;
  color: #999;
  line-height: 55px;
  text-align: center;
}
.operation .fabulous {
  /* margin-right: 120px; */
}
.icon-zanok {
  color: #ff4691;
}
.operation .binding-bg {
  width: 30px;
  height: 30px;
  display: inline-block;
}
.operation span img,
.operation1 span img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 11px;
}
.review_main {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.review_head,
.review_head .head {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  img {
    width: 67px;
  height: 68px;
    border-radius: 50%;
  }
}
.review_content {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding-left: 25px;
}
.review_title {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.review_matter2 {
  margin-top: 10px;
}
// .review_title > span {
//   -webkit-box-flex: 0.5;
//   -webkit-flex: 0.5;
//   flex: 0.5;
// }
.review_name {
  font-size: 24px;
  color: #0f5893;
  height: 29px;
  line-height: 29px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 430px;
}

.review_title > .review_num {
  flex: 1;
  text-align: right;
  height: 29px;
  line-height: 29px;
  em {
    font-style: normal;
  }
}
.review_num > img {
  display: inline-block;
}
.review_num > em {
  color: #cccccc;
  line-height: 29px;
  display: inline-block;
  padding-left: 5px;
  font-size: 26px;
}
.review_matter {
  font-size: 24px;
  color: #333333;
  line-height: 45px;
  word-break: break-all;
}
.review_other span {
  display: inline-block;
  height: 52px;
  line-height: 52px;
  color: #b4b4b4;
  font-size: 24px;
}
.review_other span.detailC {
  padding: 0 22px;
}
/* 返回顶部样式 */
.toTop {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  position: fixed;
  bottom: 116px;
  right: 16px;
  z-index: 20;
  border-radius: 100% 100%;
  border: 1px solid #cccccc;
  -moz-box-shadow: 0 0 10px 0 #ccc;
  -webkit-box-shadow: 0 0 10px 0 #ccc;
  box-shadow: 0 0 10px 0 #ccc;
  padding-top: 50px;
  background: #fff url("http://img.meiduduo.com/images/topArr.png") no-repeat
    center 0.16rem;
  background-size: 26px 28px;
  text-align: center;
  font-size: 22px;
  color: #333333;
}
/* 回复样式 */
.child-content {
  overflow: hidden;
  background: #f6f6f6;
  padding: 10px 24px;
  font-size: 24px;
  border-radius: 10px;
}

.child-content div {
  clear: both;
}

.child-content .child-name {
  float: left;
  color: #3f6ba6;
}

.child-text {
  float: left;
  color: #666;
}
.content {
  & > .live-box {
    // max-height: 165px;
    width: 100%;
    margin-bottom: 50px;
    & > .live {
      width: 100%;
      height: 100%;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }

      & > .pause {
        width: 60px;
        height: 60px;
        display: block;
        background-image: url("http://img.meiduduo.com/images/info/play.png");
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        margin-top: -30px;
        margin-left: -30px;
        background-position: center;
      }
    }
    & > .article-img {
      width: 100%;
      & > .gride-2 {
        // width: 50%;
        flex: 1;
        border-radius: 10px;
        // max-height: 165px;
        overflow: hidden;
        & > img {
          //   box-shadow: 10px 10px 5px #888888;

          display: block;
          max-width: 100%;
          height: auto;
          width: 100%;
        }
      }
    }
  }
}
.info-icon-zan {
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 26px 24px;
  padding-left: 30px;
  font-size: 24px;
}
.info-icon-zan-no-active {
  background-image: url('http://img.meiduduo.com/images/info/zan1.png');
  color: #999999;
}
.info-icon-zan-active {
  background-image: url('http://img.meiduduo.com/images/info/zan2.png');
  color: #FF4691;
}
.doctor-said-title {
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
    // transform: translateY(-50%);
  }
}
</style>
