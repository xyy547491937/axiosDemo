<template>
  <div ref="wrapper" class="doctor-said" :class="{'no-data-style': cardList.length == 0 && noData}">
    <div class="doctor-said-list-box">
    <p style="height:80px"></p>

      <doctor-said-card v-for="(item, index) of cardList" :key="index" class="box-margin-bottom" :cardData="item"></doctor-said-card>
      <div>
        <load-more v-if="loading" class="doctor-said-list-load-more" :show-loading="true" tip="正在加载"></load-more>
      </div>
    </div>
    <div class="doctor-said-title">
      <!-- <span @click="goBack" class="title-back-icon iconfont icon-fanhui"></span> -->
      <span @click="goBack" class="title-back-icon"></span>
      <span>医生说说</span>
    </div>
    <div>
      <loading :show="show1" text="加载中..."></loading>
    </div>
    <div v-if="isLoadOver">
      <load-more :show-loading="false" tip="没有更多了哦" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>
<script>
import { LoadMore, Loading } from 'vux'
import BScroll from 'better-scroll'
import doctorSaidCard from '../components/doctorSaidCard'
import { mapMutations, mapState } from 'vuex'
import { queryDoctorSaid } from '../api/pageApi.js'
export default {
  data () {
    return {
      cardList: [],
      loading: false, // 加载数据
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
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      scroll: null,
      pageNumber: 1,
      pageSize: 10,
      show1: false,
      isLoadOver: false,
      noData: false,
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  components: {
    'doctor-said-card': doctorSaidCard,
    LoadMore,
    Loading,
    // VueBetterScroll
  },
  created () {
    // this.updateDoctorFoucs(false) // 每次进入列表页先初始化foucs
    if (this.$route.query.isRefresh) { // 是否重新加载数据

    }
    this.queryDoctorSaidData(this.pageNumber, this.pageSize)
  },
  mounted () {
    this.$nextTick(() => {
      this.touchF()
    })
  },
  computed: {
    ...mapState(['nowDoctorDetail'])
  },
  watch: {
    $route (to, from) {
      if (to.path == '/doctorSaid' && from.path == '/doctorDetailApp') {
        this.pageNumber = 1
        this.isLoadOver = false
        this.queryDoctorSaidData(this.pageNumber, this.pageSize)
      }
    }
  },
  methods: {
    ...mapMutations(['updateDoctorFoucs']),
    touchF () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          scrollY: true,
          pullUpLoad: {
            threshold: -30
          },
          pullDownRefresh: {
            threshold: 30,
            stop: 20
          }
        })
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载')
          this.pageNumber++
          this.queryDoctorSaidData(this.pageNumber, this.pageSize)
          this.scroll.finishPullUp()
        })
        this.scroll.on('pullingDown', () => {
          console.log('下拉刷新')
          this.pageNumber = 1
          this.isLoadOver = false
          this.noData = false
          this.queryDoctorSaidData(this.pageNumber, this.pageSize)
          this.scroll.finishPullDown()
        })
      } else {
        this.scroll.refresh()
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    refresh () { // 下拉刷新

    },
    loadMoreData () { // 上拉加载

    },
    queryDoctorSaidData (pageNum, pageSize) {
      if (this.isLoadOver) {
        return
      }
      if (pageNum == 1) {
        this.show1 = true
      } else {
        this.loading = true
      }
      queryDoctorSaid({
        pageNum,
        pageSize,
        serviceId: this.nowDoctorDetail.id,
      }).then(res => {
        if (res.code == 1) {
          console.log('返回数据啦！')
          this.loading = false
          this.show1 = false
          if (pageNum == 1) {
            this.cardList = res.data.data
          } else {
            this.cardList.push(res.data.data)
          }
          if (pageNum >= res.data.pages && this.cardList.length > 3) {
            this.isLoadOver = true
          } else {
            this.isLoadOver = false
          }
          if (this.cardList.length == 0) {
            this.noData = true
          } else {
            this.noData = false
          }
          this.$nextTick(() => {
            this.touchF()
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.doctor-said {
  height: 100%;
  background: #f5f5f5;
  box-sizing: border-box;
  overflow: auto;
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
      width: 18px;
      height: 34px;
      background-image: url('http://img.meiduduo.com/images/xyy/back_icon_lsy.png');
      background-size: 18px 34px;
      background-repeat: no-repeat;
      // transform: translateY(-50%);
    }
  }
}
.doctor-said-list-box {
  // margin-top: 100px;
}
.box-margin-bottom {
  margin-bottom: 20px;
}
.doctor-said-main {
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 0;
}
.doctor-said-list {
  height: 100%;
  overflow: hidden;
  .doctor-said-list-box {
    // height: 100%;
    // overflow: hidden;
  }
}
.wrapper {
  height: 100%;
  overflow: hidden;
}
.no-data-style {
  background-image: url('http://img.meiduduo.com/images/nodata.png');
  background-position: center;
  background-size: 220px 270px;
  background-repeat: no-repeat;
}
</style>
<style>
.doctor-said-list-load-more {
  margin: 0 auto !important;
  padding: 10px 0 20px;
}
</style>
