<template>
  <div class="information" @click="betterScrollClick">
    <vue-better-scroll
      class="wrapper"
      ref="scroll"
      :click="true"
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
      <div class="main" id="main" style="min-height: 700px;" ref="listContent"
      v-longTouch="handleLongTouch">
        <div class="title">{{information.title}}</div>
        <div class="infor_top_detail">
          <span class="detail_left">
            <figure class="head" @click="type!=4?goUserpage(information.author,information): ''">
              <img
                v-if="information.title"
                :src="information.authorIcon ? information.authorIcon : 'http://img.meiduduo.com/images/h5/default_icon.png'"
              >
            </figure>
            <span class="detail_name">
              <em class="detail_source">{{information.authorName}}</em>
              <em class="detail_fromNow">{{information.releaseTime ? information.releaseTime: ''}}</em>
            </span>
          </span>
          <span
            v-if="type!=4 && information.author!=custId"
            :class="isFollow ? 'follow': 'follow focus'"
            @click="focusRecordSave(information)"
          >{{information.isFollow==1 ? '已关注' : '+关注'}}</span>
        </div>
        <div class="content" @click="openImg">
          <!--  视屏区域 -->
          <div class="live-box" v-if="img[0] || img[1]">
            <!--  文章图片 -->
            <div class="article-img flex-r" v-if="img[0] || img[1]">
              <div class="gride-2">
                <img :src="img[0]" alt mode="widthFix">
              </div>
              <div style="width:4px" v-if="img[0] && img[1]"></div>
              <div class="gride-2" v-if="img[1]">
                <img :src="img[1]" alt mode="widthFix">
                <!-- <img src="http://img.meiduduo.com/images/index/pt_bg.png" alt=""> -->
              </div>
            </div>
          </div>
          <video
            style="margin:0 auto 50px;display:block;width:100%;height:225px;position：absolute"
            v-if="type==4&&information.isVideo==1"
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
          <div
            v-html="information.content!=='undefined'?information.content:''"
            @error.capture="imgerror"
            class="needsclick"
            :class="isSelect ? 'select-text' : ''"
            @click.stop="contentClick"
          ></div>
        </div>
        <div v-if="information.title" class="operation">
          <span class="fabulous" @click="publicMth('isThumbsUp',customerRecordSave,information)">
            <i :class="'iconfont '+ (isThumbsUp?'icon-zan icon-zanok':'icon-zan')"></i>
            {{information.fabulousNum}}
          </span>
          <span style="width:120px;height:6px;border:none" v-if="type!=8&&type!=10"></span>
          <span
            class="collection"
            v-if="type!=8&&type!=10"
            @click="publicMth('isFavourite',storeRecordSave,information)"
          >
            <i :class="'iconfont '+ (isFavourite?'icon-shoucang1 icon-zanok':'icon-shoucang1')"></i>
            {{information.favouriteNum}}
          </span>
        </div>
        <div v-if="comments.length > 0 && information.title" class="information_review" v-for="(item, index) of comments" :key="index">
          <div class="review_main">
            <div class="review_head">
              <!-- <span v-if="item.icon" :style="{ backgroundImage: `url(${item.icon})` }"></span> -->
              <!-- <img @error.capture="iconerror" :style="{ backgroundImage: `url(${item.icon})` }"> -->
              <figure class="head"  @click="goUserpage(item.id,item)">
                <img @error.capture="iconerror" :src="item.icon">
                <!-- <span @error.capture="imgerror" v-if="item.icon" :style="{ backgroundImage: `url(${item.icon})` }"></span> -->
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
                  <i :class="'iconfont '+ (item.isThumbsUp?'icon-zan icon-zanok':'icon-zan')"></i>
                  <em>{{item.fabulousNum}}</em>
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
      </div>
    </vue-better-scroll>
    <writeComment
      @send="getList(id)"
      @sendStatusM="sendStatusM"
      @showInput="showInput"
      v-bind:writeItem="writeItem"
      v-if="writeCommentS"
    ></writeComment>
    <div class="newloading">
    <loading v-model="showLoading"></loading>
    </div>
    <div class="toTop" v-show="topShow" @click="scrollTo">顶部</div>
    <previewer ref="previewer" :list="previewerList" :options="options">
      <!-- <template slot="button-after">
        <span class="previewer-delete-icon-box">
          <img src="../assets/previewer_delete_icon.png" width="22" height="22" class="previewer-delete-icon" @click.prevent.stop="removeImg">
        </span>
      </template> -->
    </previewer>
  </div>
</template>
<script>
import Vue from 'vue'
import writeComment from "./writeComment.vue";
import { http, querySignature } from "../api/pageApi.js";
import { Scroller, Confirm, TransferDom,  Loading, Previewer   } from "vux";
import { log } from "util";
// import VueBetterScroll from "vue2-better-scroll";
import VueBetterScroll from "../../node_modules/vue2-better-scroll/src/lib";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
import longTouch  from '@/utils/longTouch'
import { mapState } from 'vuex';
import wxShare from '../utils/wx.js';
export default {
  data() {
    return {
      show: false,

      text1: "Hello world",
      id: "",
      custId: "",
      type: "",
      topShow: false,
      writeCommentS: false,
      isFollow: "",
      isFavourite: "",
      isThumbsUp: "",
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
      previewerList:[],
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
      preventDefaultExceptionObj:{
        className:/(^|\s)main(\s|$)/
      },
      freeScroll: true,
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      fromLogin: false,
      showLoading: false,
      options: {
        // isClickableElement: function (el) {
        //   return /previewer-delete-icon/.test(el.className)
        // },
        // getThumbBoundsFn (index) {
        //   let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
        //   let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        //   let rect = thumbnail.getBoundingClientRect()
        //   return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        // }
      },
      shared: false,
      inviter: -1,
      isSelect: true,
      signatureData: {}, // 分享签名数据
    };
  },
  components: {
    writeComment,
    Scroller,
    Confirm,
    TransferDom,
    Loading,
    Previewer,
    VueBetterScroll
  },
  directives: {
    TransferDom,
    longTouch
  },
  created() {
    this.querySignatureData()
    // 传参说明：
    // id 资讯id；type 资讯类型；userId 当前登录用户的id；share 是否分享（1是，0否）；inviter 邀请者id（用于阅读返现）；customerPacketId 用户参与红包活动记录id；
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.shared = Number(this.$route.query.share)
    this.inviter = Number(this.$route.query.inviter)
    console.log(this.$route.query)

    this.custId = this.$route.query.userId != -1 ? this.$route.query.userId : ''
    if (this.inviter != -1 && this.shared == 0 && this.$route.query.userId == -1 && this.$route.query.customerPacketId != -1) {
      // if (isiOS) {
      //   window.webkit.messageHandlers.toLogin.postMessage(null)
      // }
      if (isAndroid) {
        let a = window.android.getUserId()
        this.custId = a == -1 ? '' : a
        if (a == -1) {
          window.android.toLogin(null)
        }
      }
    }
    if (this.inviter != -1 && this.shared == 0 && this.custId != '' && this.$route.query.customerPacketId != -1 && this.inviter != this.custId) { // 从h5进入app（被邀请）
      console.log('全民零钱——————')
      console.log(this.$route.query)
      this.readerLink()
    }

    // if (this.$route.query.userId != -1) {
    //   this.custId = this.$route.query.userId
    // }

    //阅读返现
    // if(this.$route.query.share == 1 ){
    //   this.custId = this.$store.state.nowUserInfo.userId?this.$store.state.nowUserInfo.userId:''
    // }else{
    //   this.custId =
    //         this.$route.query.userId == "-1" ? "" : this.$route.query.userId;
    // }
    //没有包含阅读返现
    this.$set(this.writeItem, "commentType", this.type);
    this.$set(this.writeItem, "sendStatus", false);
    this.$set(this.writeItem, "contentId", this.$route.query.id);
    this.$set(this.writeItem, "custId", this.custId);
    //阅读返现
    // this.$store.commit('saveNowUserInfo', 1888)//暂时用这个记得删除
    /////暂时用这个记得删除暂时用这个记得删除暂时用这个记得删除暂时用这个记得删除暂时用这个记得删除
    //暂时用这个记得删除暂时用这个记得删除暂时用这个记得删除暂时用这个记得删除暂时用这个记得删除暂时用这个记得删除
    // console.log(this.$store);
    // console.log(this.$route);
// if(this.$route.query.share == 1 && !this.$store.state.nowUserInfo.userId){
// this.goLogin();
// }
// if(this.$route.query.share == 1 && this.$route.query.customerPacketId && this.$store.state.nowUserInfo.userId){
// this.readerLink();
// }
  },
  mounted() {
    this.$nextTick(() => {
        // 显示
        this.showLoading = true;
      if (this.type == 10) {
        this.queryOneByPkAndUserId(this.id);
      } else {
        this.infoQueryOneByPkAndUserId(this.id);
      }
      this.getList(this.id);
      // setTimeout(() => {
      //   this.$refs.scroll.refresh();
      // }, 2000);
    });
  },
  computed: {
    ...mapState(['shareInfo', 'nowUserInfo'])
  },
    methods: {
      querySignatureData () {
        console.log(location.href)
        querySignature({
          pageUrl: location.href.split('#')[0]
        }).then(res => {
          console.log('请求签名成功')
          if (res.code == 1) {
            this.signatureData = res.data
            this.signatureData.link = location.href
            this.signatureData.title = '分享到朋友圈'
            this.signatureData.imgUrl = 'http://img.meiduduo.com/images/info/information_write_icon.png'
            this.signatureData.desc = '分享到朋友圈'
            this.signatureData.type = 'link'
            this.signatureData.dataUrl = ''
            console.log('调用分享')
            wxShare(this.signatureData)
          }
        })
      },
      updateDate () {
        if (this.type == 10) {
          this.queryOneByPkAndUserId(this.id)
        } else {
          this.infoQueryOneByPkAndUserId(this.id)
        }
        this.getList(this.id)
      },
      showInput () {
        if (!this.checkSource()) {
          return;
        }
      },
      handleLongTouch(){
        console.log('长按啦！！！')
        this.$refs.scroll.disable();
        setTimeout(()=>{
          this.$refs.scroll.enable();
        },1000)
      },
      openImg(event){
        // console.log(event.target.currentSrc,this.previewerList);
        // let list = this.previewerList;
        // for(let i=0;i<list.length;i++){
        //   if(list[i].src==event.target.currentSrc){
        //     this.$refs.previewer.show(i);
        //     return
        //   }
        // }
      },
    goUserpage(userId,item){
      let params = {
        userId: userId,
        recordType: item.createType == 0 ? "0" : "1"
      }
      if (isAndroid) {
        window.android.userDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.userDetail.postMessage(params);
      }
    },
    readerLink(){
      let params = {
      customerPacketId: this.$route.query.customerPacketId,
      inviteCustId: this.custId,
      recordType: this.$route.query.type==4?2:3, //2资讯详情，3文章详情
      token: this.$route.query.token
      }
      console.log(params)
      http("customerPacket/saveForReadCashBackWhenRead", params).then(res => {
        console.log(res);
        console.log('调用成功')
      })
    },
    goLogin(){
      this.$router.push({
      path: '/login',
      query: {
      clear_cache: Date.now()
      }
      })
    },
    imgerror(event) {
      event.target.style.display = "none";
    },
    iconerror (event) {
      event.target.style.backgroundImage = 'url(http://img.meiduduo.com/images/h5/default_icon.png)'
      event.target.src = ''
    },
    beforeScrollStart(e) {
      // console.log(" this.$refs.scroll.refresh();");
      this.$refs.scroll.refresh();
      this.$refs.scroll.enable();

      // console.log(this.$refs.scroll.refresh());
      // console.log(this.$refs.scroll);
      // console.log(this.$refs.scroll.clientHeight);
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

    goBack() {
      this.$router.go(-1);
    },
    // 关注
    focusRecordSave(item) {
      console.log('点击关注')
      if (!this.checkSource()) {
        return;
      }
      let type = item.authorType == 0 && item.createType == 0 ? "2" : "6";
      if (isAndroid && this.$route.query.share != 1) {
        this.custId = window.android.getUserId();
      }
      if (!this.custId) {
        this.onConfirm();
        return false;
      }
      var option = {
        recordId: item.author,
        custId: this.custId,
        state: item.isFollow ? -1 : 1,
        recordType: type
      };

      http("focusRecord/save", option).then(res => {
        if (res.code == 1) {
          item.isFollow = !item.isFollow;
          this.isFollow = !this.isFollow
          let params = {
            isFollow: item.isFollow,
            authorType: type,
            author: item.author
          };
          if (isAndroid) {
            window.android.lookStatus(JSON.stringify(params));
          }
          if (isiOS) {
            window.webkit.messageHandlers.lookStatus.postMessage(params);
          }
        }
      });
    },
    queryOneByPkAndUserId(id) {
      var option = {
        type: this.type,
        id,
        custId: this.custId
      };

      http("article/queryOneByPkAndUserId", option).then(res => {
        if (res.code == 1) {
          // 隐藏
          this.showLoading = false;
          this.information = res.data;
          let imgarr =JSON.parse(res.data.contentImgs)
          imgarr.unshift(res.data.cover);
          // console.log(imgarr);
          this.previewerList  = imgarr.map(el => {
            let a = {}
            a.src = el
            a.msrc = el
            return a
          })
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
          if (res.data.isFollow == 1) {
            this.$set(this, "isFollow", true);
          } else {
            this.$set(this, "isFollow", false);
          }
          this.img = this.information.cover ? this.information.cover.split(",") : []
          this.isFavourite = res.data.isFavourite > 0 ? true : false;
          this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false;
          let params = {
            title: this.information.title,
            content: this.information.content,
            image: this.img[0]
          }
          const navigatorInfo = navigator.userAgent;
          const isAndroid =
            navigatorInfo.indexOf("Android") > -1 ||
            navigatorInfo.indexOf("Adr") > -1; //android终端
          const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
            window.android.shareDetail(JSON.stringify(params));
          }
          if (isiOS) {
            window.webkit.messageHandlers.shareDetail.postMessage(params);
          }
        }
      });
    },
    infoQueryOneByPkAndUserId(id) {
      if (this.type == 8) {
        // this.$http.post('/question/queryOneByPk', {id, custId: this.custId}).then((res) => {
        //   res.data.createDate = res.data.createDate.split(' ')[0]
        //   console.log(res.data, 456)
        //   this.information = res.data
        //   this.writeCommentS = true
        //   if (res.data.isFollow === 1) {
        //     this.$set(this,'isFollow',true)
        //   } else{
        //     this.$set(this,'isFollow',false)
        //   }
        //   console.log(res.data.isFollow, this.isFollow)
        //   this.isFavourite = res.data.isFavourite > 0 ? true : false
        //   this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false
        // })
      } else {
        var option = {
          type: this.type,
          id,
          custId: this.custId || ""
        };
        http("info/queryOneByPkAndUserId", option).then(res => {
          // 隐藏
          this.showLoading = false;
          this.information = res.data;
          this.writeCommentS = true;
          this.img = this.information.cover ? this.information.cover.split(",") : []
          this.isFavourite = res.data.isFavourite > 0 ? true : false;
          this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false;
          let params = {
            title: this.information.title,
            content: this.information.content,
            image: this.img[0]
          }
          const navigatorInfo = navigator.userAgent;
          const isAndroid =
            navigatorInfo.indexOf("Android") > -1 ||
            navigatorInfo.indexOf("Adr") > -1; //android终端
          const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
            window.android.shareDetail(JSON.stringify(params));
          }
          if (isiOS) {
            window.webkit.messageHandlers.shareDetail.postMessage(params);
          }
        });
      }
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
            // this.hcArticle.isThumbsUp = ele.isThumbsUp  > 0 ? 1 : 0
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
    publicMth(data, mth, item, index) {
      console.log('进入点赞或收藏方法~~~')
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid && this.$route.query.share != 1) {
        console.log('请求安卓方法获取用户id start')
        let a = window.android.getUserId();
        this.custId = a == -1 ? '' : a
        console.log(a, this.custId)
        console.log('请求安卓方法获取用户id end')
      }
      if (
        this.information.author == this.$route.query.userId &&
        data == "isFollow"
      ) {
        return false;
      }
      console.log(this)
      if (!this.custId) {
        console.log('没有用户id，去登录')
        this.onConfirm();
        return false;
      }
      if (index >= 0) {
        this.comments[index].isThumbsUp =
          this.comments[index].isThumbsUp == 0 ? 1 : 0;
        if (this.comments[index].isThumbsUp == 0) {
          this.$refs.zan[index].childNodes[2].textContent--;
        } else {
          this.$refs.zan[index].childNodes[2].textContent++;
        }
        this.$set(data, index, !data[index]);
        mth(item, this.comments[index].isThumbsUp, index);
      } else {
        console.log(this[data]);
        this.$set(this, data, !this[data]);
        console.log('调用点赞或收藏方法')
        if (data == "isThumbsUp") {
          this.$set(
            item,
            "fabulousNum",
            this[data] ? item.fabulousNum + 1 : item.fabulousNum - 1
          );
        }
        if (data == "isFavourite") {
          this.$set(
            item,
            "favouriteNum",
            this[data] ? item.favouriteNum + 1 : item.favouriteNum - 1
          );
        }
        mth(item, this[data]);
      }
    },
    onConfirm() {
      console.log("点击确认");
      if (isAndroid) {
        window.android.toLogin(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.toLogin.postMessage(null);
      }
    },
    customerRecordSave(item, status, index) {
      //点赞
      var option = {
        recordId: item.id,
        custId: this.custId,
        recordType: index >= 0 ? 11 : this.type,
        crType: 1,
        state: status ? 1 : -1
      };
      console.log(option)
      http("customerRecord/save", option).then(res => {
        // if (index >= 0) {
        if (res.code == 1) {
          item.isThumbsUp = !item.isThumbsUp;
          let params = {
            isThumbsUp: item.isThumbsUp,
            fabulousNum: item.fabulousNum
          };
          if (isAndroid) {
            window.android.likeStatus(JSON.stringify(params));
          }
          if (isiOS) {
            window.webkit.messageHandlers.likeStatus.postMessage(params);
          }
          this.updateDate()
        }
        // }
      });
    },
    commentsZan(item){
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid && this.$route.query.share != 1) {
        this.custId = window.android.getUserId();
      }
      if (!this.custId) {
        this.onConfirm();
        return false;
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
          this.updateDate()
          // item.isThumbsUp = !item.isThumbsUp;
          // if(!item.isThumbsUp){
          //   item.fabulousNum--

          // }else{
          //   item.fabulousNum++
          // }

          // if (isAndroid) {
          //   window.android.likeStatus(JSON.stringify(params));
          // }
          // if (isiOS) {
          //   window.webkit.messageHandlers.likeStatus.postMessage(params);
          // }
        }
      });
    },
    storeRecordSave(item, status) {
      //收藏
      var option = {
        custId: this.custId,
        recordId: item.id,
        recordType: this.type,
        state: status ? 1 : -1
      };
      http("storeRecord/save", option).then(res => {
        if (res.code == 1) {
          this.updateDate()
        }
      });
    },

    //回复
    writeShow(item) {
      if (!this.checkSource()) {
        return;
      }
      if (isAndroid && this.$route.query.share != 1) {
        this.custId = window.android.getUserId();
      }
      if (!this.custId) {
        this.onConfirm();
        return false;
      }
      this.$set(this.writeItem, "sendStatus", true);
      this.$set(this.writeItem, "commentId", item.id);
      this.$set(this.writeItem, "criticId", item.custId);
    },
    //发送评论成功
    sendStatusM(data) {
      if (data) {
        this.onConfirm();
        return false;
      } else {
        this.$set(this.writeItem, "sendStatus", data);
      }
    },
    checkSource () {
      const self = this
      if (!this.shared) {
        return true
      } else {
        let a = this.checkWeiXin()
        const navigatorInfo = navigator.userAgent
        const isAndroid = navigatorInfo.indexOf('Android') > -1 || navigatorInfo.indexOf('Adr') > -1; //android终端
        const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (!a) { // 原生浏览器内处理逻辑
          if (isAndroid) {
            window.location.href = this.shareInfo.androidScheme
            setTimeout(() => {
              window.location.href = self.shareInfo.androidDownload
            }, 500)
          }
          if (isiOS) {
            window.location.href = this.shareInfo.iosScheme
            setTimeout(() => {
              window.location.href = self.shareInfo.iosDownload
            }, 500)
          }
        } else { // 微信浏览器内处理逻辑
          window.location.href = `http://img.meiduduo.com/h5/download.html?path=newsdetail&id=${self.$route.query.id}&type=${self.$route.query.type}&share=0&inviter=${this.custId}&customerPacketId=${self.$route.query.customerPacketId}&imgUrl=${self.img[0]}&titleName=${self.information.title}`
          // window.location.href = 'http://img.meiduduo.com/h5/download.html'
        }
        return false
      }
    },
    checkWeiXin () { // 是否在微信浏览器打开
      const navigatorInfo = navigator.userAgent.toLowerCase()
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
      //   return true
      // } else {
      //   return false
      // }
    },
    contentClick (event) {
      console.log('click 啦！')
      console.log(event)
      this.isSelect = !this.isSelect
      // if (event.target.currentSrc) {
      //   this.previewerList.push({
      //     src: event.target.currentSrc,
      //     msrc: event.target.currentSrc
      //   })
      // }
      // let list = this.previewerList;
      // for(let i=0;i<list.length;i++){
      //   if(list[i].src==event.target.currentSrc){
      //     this.$refs.previewer.show(i);
      //     return
      //   }
      // }
    },
    betterScrollClick (event) {
      console.log(event)
      console.log('better scroll click')
    }
  }
};
</script>
<style lang="css">
.content img,
.content video {
  display: block;
  max-width: 100%;
  height: auto;
  /* overflow: hidden; */
  /* min-height: 100px; */
}
</style>
<style lang="less">
.newloading .weui-toast{
  background: none!important;
}
.wrapper {
  height: 100%;
  overflow: hidden;
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 90px;
}
.main {
  padding: 0 24px 0;
  margin-top: 31px;
  user-select:auto;
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
  margin-bottom: 48px;
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
  width: 110px;
  height: 36px;
  background: rgba(255, 70, 145, 1);
  border-radius: 20px;
  border: 1px solid rgba(255, 70, 145, 1);
  font-size: 28px;
  padding: 8px;
  color: #fff;
  text-align: center;
  line-height: 36px;
}
.follow.focus {
  background: #fff;
  color: rgba(255, 70, 145, 1);
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
  width: 67px;
  height: 68px;
  border-radius: 68px;
  span {
    width: 67px;
    height: 68px;
    border-radius: 68px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  img {
    width: 67px;
    height: 68px;
    border-radius: 68px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
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
.select-text {
  user-select:text;
  -webkit-user-select:text;
}
</style>
