<style>
.videoinfo{
    background: #f5f5f5;
    /* overflow: hidden; */
}
.video{
    width: 100%;
    height: 375px;
}
.video-outer{
    background: #fff;
}
.video-box{
    padding: 18px 30px;
    background: #fff;
}
.video-author{
    /* padding: 18px 0; */
    /* margin: 0 30px; */
    padding-bottom: 18px;
    border-bottom: 1px solid #ddd;
}
.author-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title-content{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.title-content .authorName{
    color: #333;
}
.title-content-figure{
    display: inline-block;
    width: 88px;
    height: 88px;
    margin-right: 20px;
    border-radius: 50%;
    background-size: cover;
}
.author-title img{
    display: inline-block;
    width: 88px;
    height: 88px;
    border-radius: 50%;
}
.follow{
    background: #FF4691;
    color:#fff;
    font-size: 28px;
    padding: 10px 32px;
    border-radius: 8px;
}
.video-content{
    padding: 30px 0 50px 0;
    font-size: 28px;
    color: #333;
}
.num-box{
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 24px;
}
.num-box .num{
    display: flex;
    flex-direction: row;
}
.num-box .num .zan{
    margin-right: 16px;
}
.comments{
    /* margin-top: 20px; */
    background: #fff;
}
.weui-cells{
    margin-top: 0!important;
}
.comments-title{
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding-right: 30px;
}
.comments-title1{
    color: #333;
    font-size: 30px;
    font-weight: 700;
}
.comments-num{
    color: #999;
    font-size: 24px;
}
.comments-list{
    padding: 30px;
}
.comment{
    display: flex;
    margin-bottom: 20px;
}
.comment-avator{
    margin-right: 22px;
}
.comment-avator-figure{
    display: inline-block;
    width: 60px;
    height: 60px;
}
.comment-avator img{
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-right: 30px;
    border-radius: 50%;
}
.comment-content{
    display: flex;
    flex: 1;
    flex-direction: column;
}
.comment-author{
    display: flex;
    justify-content: space-between;
}
.comment-author .zan-box{
    display: flex;
    align-items: center;
}
.comment-author .zan-box .zan{
    background:url('http://img.meiduduo.com/images/info/zan1.png') no-repeat;
    background-size: 100%;
    width: 30px;
    height: 30px;
    margin-right: 6px;
}
.comment-author .name{
    color: #3F6BA6;
    font-size: 28px;
}
.comment-author .num{
    font-size: 24px;
    color: #999;
}
.comment-txt{
    margin: 10px 0;
    color: #333;
    font-size: 32px;
}
.comment-time{
    display: flex;
    justify-content: flex-start;
    font-size: 24px;
    color: #333;
}
.comment-time .time{
    color: #999;
    margin-right: 16px;
}
.video-list-box{
    background: #fff;
}
.video-list-title{
    padding: 20px 30px;
    color: #333;
    font-size: 30px;
    font-weight: 700;
    border-bottom: 1px solid #ddd;
}
.video-list{
    padding: 20px 20px 0 0;
    /* padding: 20px; */
    /* column-count:2;
    column-gap: 20px; */
    overflow: hidden;
}
.video-item {
    float: left;
    width: 50%;
    padding: 0 0 0 20px;
    margin-bottom: 18px;
    /* break-inside: avoid; */
    box-sizing: border-box;
    /* padding: 10px; */
    overflow: hidden;
    /* border: 1px solid #f5f5f5; */
    /* border-radius: 4px; */
}
/* .video-item:nth-child(2n+1){
    margin-right: 10px;
} */
.item-con{
    border-left: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
}
.lineView{
   background: #f5f5f5;
   height: 20px;
}
.item-box{
    position: relative;
}
.play-figure{
    position: absolute;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    background: url('http://img.meiduduo.com/images/info/play.png') no-repeat;
    background-size: 100%;
}
.item-box .play{
    position: absolute;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
}
.cover-figure{
  width: 100%;
  min-height: 400px;
  max-height: 600px;
}
.item-box .cover{
    width: 100%;
    height: 400px;
  /* min-height: 400px;
  max-height: 600px; */
}
.item-title{
    font-size: 26px;
    font-weight: 700;
    padding: 4px 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; */
  height: 44px;
  line-height: 44px;
}
.bottom-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 14px 20px 14px;
    width: 100%;
    box-sizing: border-box;
}
.inner{
    /* display: flex;
    flex: 1;
    align-items: center; */
    margin-top: 10px;
    font-size: 24px;
    /* width: 60%; */
}
.bottom-box img{
    margin-right: 10px;
}
.inner-figure{
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background-size: 100%;
    vertical-align: middle;
    border-radius: 50%;
}
.inner .name{
    /* display: flex;
    flex: 1; */
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}
.inner2{
    /* display: flex;
    width: 28px;
    height: 24px;  */
}
.bottom-box .avator{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.like-figure{
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url('http://img.meiduduo.com/images/info/nolike.png') no-repeat;
    background-size: 100%;
    vertical-align: middle;
}
.bottom-box .like{
    display: inline-block;
    width: 28px;
    height: 24px;
}
.bottom-box .num{
    display: inline-block;
    color: #999;
    font-size: 26px;
}
.nolist{
    font-size: 28px;
}
.video-list .nolist{
    padding-left: 15px;
}
.nolist-figure{
    margin: 0 auto;
    margin-top: 20px;
    width: 240px;
    height: 285px;
    background-size: cover;
}
.nodataimg{
    width: 33%;
    margin: 0 auto;
    margin-top: 30px;
}
#videobox{
    object-fit:cover;
    overflow: hidden;
}
.video-container{
    position: relative;
    overflow: hidden;
    height: 800px;
    /* position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10; */
}
.video-container video{
    height: 800px;
}
.top-name{
    position: absolute;
    bottom: 100px;
    left: 10px;
    z-index: 100;
}
.playbtn{
    position: fixed;
    top: -100px;
    left: 0;
}
.videoimg{
    width: 100%;
    height: 450px;
}
.videoimg img{
    display: inline-block;
    width: 100%;
    height: 450px;
}
.top-recomment{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 30px;
    background: #000;
}
.top-recomment .logo-box{
     display: flex;
     align-items: center;
}
.top-recomment .logo{
    display: inline-block;
    width: 75px;
    height: 75px;
    border-radius: 8px;
    vertical-align: middle;
    background: url('http://img.meiduduo.com/images/mine/mineLogo.png')no-repeat;
    background-size: 100%;
}
.top-recomment .slogo{
    color: #fff;
    margin-left: 26px;
}
.openbtn{
    display: flex;
    align-items: center;
    /* background: -webkit-gradient(linear,left top,right top,from(#ff657d),to(#fe267d));
    background: linear-gradient(90deg,#ff657d,#fe267d); */
    background: #ff4691;
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    padding: 5px 28px;
    border-radius: 22px;
}
</style>
<template>
 <div class="videoinfo" ref="videoinfo" >
    <div class="top-recomment">
        <div class="logo-box">
            <div class="logo"></div>
            <div class="slogo">女人都爱逛胚豆</div>
        </div>
        <div class="openbtn" @click="checkSource">打开</div>
    </div>
    <!-- :style="{height:videoHeight+'px'}" -->
    <div class="video-container" ref="videoContainer" >
        <!-- :height="videoHeight" -->
        <video width="100%" v-if="video.videoUrl"   ref="video" id="videobox" :poster="video.cover"  controls
         webkit-playsinline="true" playsinline="true" x5-playsinline="true" x-webkit-airplay="allow"
         controlsList='nofullscreen nodownload noremote '
         >
            <source :src="video.videoUrl"  type="video/mp4">
            <!-- <source :src="videoUrl"  type='video/webm'> -->
        </video>
    </div>

    <div ref="videoBox" class="video-outer" :style="{minHeight:videoHeight+'px'}">
    <div class="video-box" >
        <div class="video-author">
            <div class="author-title">
                <div class="title-content">
                    <!-- <figure class="title-content-figure">
                        <img :src="video.authorIcon" alt="">
                    </figure> -->
                    <div class="title-content-figure" :style="{backgroundImage:`url(${video.authorIcon})`}"></div>
                    <div class="authorName">{{video.authorName}}</div>
                </div>
                <div class="follow" @click="checkSource">关注</div>
            </div>

        </div>
        <div class="video-content">
            {{video.content}}
        </div>
        <div class="num-box">
           <div class="time">{{video.releaseTime}} </div>
           <div class="num">
               <div class="zan">{{video.fabulousNum}} 次赞</div>
               <div>{{video.favouriteNum}} 次收藏</div>
           </div>
        </div>

    </div>
    <div class="lineView"></div>
    <!-- 评论 -->
    <div class="comments">
         <group>
            <cell-box is-link>
              <div class="comments-title">
                  <div class="comments-title1">评论</div>
                  <div class="comments-num" @click="checkSource">共{{total}}条评论</div>
              </div>
            </cell-box>
         </group>
        <div class="comments-list">
             <div v-if="commenList.length == 0" class="nolist">暂无评论</div>
             <div class="comment" v-for="(item,index) in commenList" :key="index">
                 <div class="comment-avator">
                     <!-- <figure class="comment-avator-figure">
                         <img :src="item.icon"  alt="">
                    </figure> -->
                    <div class="comment-avator-figure" :style="{backgroundImage:`url(${item.icon})`}"></div>
                 </div>
                 <div class="comment-content">
                    <div class="comment-author">
                        <div class="name">{{item.nickName}}</div>
                        <div class="zan-box" @click="checkSource">
                            <div class="zan" ></div>
                            <div class="num">{{item.fabulousNum}}</div>
                        </div>
                    </div>
                    <div class="comment-txt">
                           {{item.content}}
                    </div>
                    <div class="comment-time">
                        <div class="time">{{item.createDate}}</div>
                        <div class="reply" @click="checkSource">回复</div>
                    </div>
                 </div>
             </div>
             <!-- <div class="comment">
                 <div class="comment-avator">
                     <img src="http://fs.meiduduo.com/shop4/shop/icon//1548471989561.jpg" alt="">
                 </div>
                 <div class="comment-content">
                    <div class="comment-author">
                        <div class="name">匿名用户</div>
                        <div class="num">15</div>
                    </div>
                    <div class="comment-txt">
                            用清水稀释后的白醋水可以用于洗脸。白醋本身有抑菌、
                    美白、软化角质的作用，每天坚持用白醋洗脸可以让面
                    部肌肤白白嫩嫩
                    </div>
                    <div class="comment-time">
                        <div class="time">20分钟前</div>
                        <div class="reply">回复</div>
                    </div>
                 </div>
             </div> -->
        </div>
        <div class="lineView"></div>
     <!-- 相关视频 -->
     <div class="video-list-box">
        <div class="video-list-title">相关视频</div>
        <div v-if="relevantList.length == 0" class="nolist" style="text-align:center;padding-top:20px">
            <figure class="nolist-figure" style="backgroundImage:url('http://img.meiduduo.com/images/nodata.png')">
                <!-- <img class="nodataimg" src="http://img.meiduduo.com/images/nodata.png" alt=""> -->
            </figure>

        </div>
        <div class="video-list">

            <div class="video-item" v-for="(item,index) in relevantList" :key="index" @click="checkSource">
                 <div class="item-box">
                     <figure class="play-figure">
                        <!-- <img class="play" src="http://img.meiduduo.com/images/info/play.png" alt=""> -->
                    </figure>
                    <figure class="cover-figure">
                       <img class="cover" :src="item.cover" alt="">
                    </figure>
                 </div>
                 <div class="item-con">
                    <div class="item-title">
                        {{item.title}}
                    </div>
                    <div class="bottom-box">
                        <div class="inner">
                            <figure class="inner-figure" :style="{backgroundImage:`url(${item.authorIcon})`}">
                                <!-- <img class="avator" :src="item.authorIcon" alt=""> -->
                            </figure>
                            <div class="name">{{item.authorName}}</div>
                        </div>
                        <div class="inner2">
                            <div class="like-figure">
                                <!-- <img class="like" src="http://img.meiduduo.com/images/info/nolike.png" alt=""> -->
                            </div>
                            <div class="num">{{item.favouriteNum}}</div>
                        </div>
                    </div>

                 </div>
            </div>
            <!-- <div class="video-item">
                 <div class="item-box">
                     <img class="play" src="http://img.meiduduo.com/images/info/play.png" alt="">
                     <img class="cover" src="http://fs.meiduduo.com/shop4/SHOP/other/1548316781452.jpg" alt="">
                 </div>
                 <div class="item-title">
                     今天给大家推荐一款瘦脸面膜 韩国AVAJAR美法韩国AVAJAR美法.韩国AVAJAR美法.韩国AVAJAR美法.
                 </div>
                <div class="bottom-box">
                    <div class="inner">
                        <img class="avator" src="http://fs.meiduduo.com/shop4/shop/icon//1548471989561.jpg" alt="">
                        <div class="name">阿拉蕾</div>
                    </div>
                    <div class="inner">
                        <img class="like" src="http://img.meiduduo.com/images/info/nolike.png" alt="">
                        <div class="num">3042</div>
                    </div>
                </div>
            </div> -->
        </div>
     </div>
    </div>
    </div>
 </div>
</template>

<script>
// import VueAliplayer from 'vue-aliplayer'
import { Cell,Group,CellBox  } from 'vux'
import { getVideoInfo , getCommenList , getRelevantVideo } from "../api/pageApi.js";
import { mapState, mapMutations } from "vuex";

 export default {

   data () {
     return {
         video:{
        //    authorIcon:"http://fs.meiduduo.com/shop4/shop/icon//1548471989561.jpg",
        //    videoUrl:"http://fs.meiduduo.com/shop4/shop/video/1548472186192.mp4",
        //    cover:"http://fs.meiduduo.com/shop4/SHOP/other/1548472180664.jpg",
           authorIcon:"",
           videoUrl:"",
           cover:""
         },
         videoUrl:"",
         videoHeight:'',
         scrollTop:0,
         showVideo:false,
         id:'',
         total:0,
         commenList:[],
         relevantList: [],
         playerOptions:{
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
                type: "video/mp4",
                src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "/static/images/author.jpg",
            controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
            }
         }
     }
   },
   computed: {
      ...mapState(["shareInfo"])
   },
   methods:{
     getVideoInfo(){
         getVideoInfo({
             id:this.id
         }).then(res=>{
             console.log('视频',res);
             if(res.code == 1){
                this.video = res.data
                // this.$set(this.video,'cover',res.data.cover)
                //  this.$set(this.video,'videoUrl',res.data.videoUrl)
                // this.$set(this,'videoUrl',res.data.videoUrl)
             }
         })
     },
     getCommenList() {
      getCommenList({
          contentId:this.id,
          commentType:9,
          pageNum:1,
          pageSize:10
        })
        .then(res => {
          console.log("评论列表:", res);
          if (res.code == "1") {
              this.total = res.data.total
              this.commenList = res.data.data ? res.data.data : [];
          }
        });
    },
     getRelevantVideo() {
      getRelevantVideo({
          columnId:this.video.columnId
        })
        .then(res => {
          console.log('相关视频:',res);
          if (res.code == "1") {
            let ret =  res.data.data ? res.data.data : []
            ret.forEach(element => {
              if(element.id!=this.video.id){
                  this.relevantList.push(element)
              }
            })
          }
        });
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
          window.location.href = `http://img.meiduduo.com/h5/download.html?path=videodetail&share=0&id=${
            self.$route.query.id
          }`;
        }
        // return false;
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
    },
    playVideo(){
        this.$refs.video.play()
        this.showVideo = true
    },
    handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(scrollTop>this.scrollTop && scrollTop < this.videoHeight){
            this.$refs.videoBox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
            this.scrollTop = this.videoHeight
        }else if(scrollTop<this.scrollTop && scrollTop < this.videoHeight){
            this.$refs.videoContainer.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
            this.scrollTop = scrollTop
        }
    }
   },
   mounted(){
      this.id = this.$route.query.id;
      this.shared = this.$route.query.share
      this.getVideoInfo()
      this.getCommenList()
      this.getRelevantVideo()
      this.$nextTick(()=>{
        //   this.videoHeight = document.body.clientHeight

        //   this.$set(this,'videoUrl',this.video.videoUrl)
          this.$set(this.video,'cover',this.video.cover)
      })
   },
   components: {
        Cell,Group,CellBox
   }
 }
</script>

