<template>
  <div class="fight_group">
    <div class="tabs">
      <Tab :current="current" active-color="#FF4691" bar-active-color="#FF4691" custom-bar-width="50%" color="#f759ab" @change="handleChange">
          <TabItem key="tab1" selected>正在热拼</TabItem>
          <TabItem key="tab2">即将开始</TabItem>
      </Tab>
    </div>
    <div v-if="current == 'tab1'" class="group_list">
      <img class="img" :src="banners[0]" mode="aspectFit">
      <div v-if="list.length > 0" class="content">
        <projectCard v-for="(item, index) of list" :key="index" :data="item"></projectCard>
      </div>
      <load-over v-if="isOver && list.length > 0"></load-over>
      <div id="nolist" v-if="list.length < 1">
      <div class="noData-mode"></div>
      </div>
    </div>
    <div v-if="current == 'tab2'" class="group_list">
      <img class="img" :src="banners[1]">
      <div v-if="list.length > 0" class="content">
        <projectCard v-for="(item, index) of list" :key="index" :data="item"></projectCard>
      </div>
      <load-over v-if="isOver && list.length > 0"></load-over>
      <div id="nolist" v-if="list.length < 1">
      <div class="noData-mode"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import projectCard from './project_card'
import loadOver from "./loadOver";
import {
 pintuan
} from "../api/pageApi.js";
export default {
  data() {
    return {
      current: "tab1",
      list: [],
      pageNum: 1, // 页数
      pageSize: 10, // 每页条数
      isOver: false, // 是否加载完毕
      banners: [
        'http://img.meiduduo.com/images/shop/pt.png?' + Math.random() / 9999,
        'http://img.meiduduo.com/images/shop/banner1.png?' + Math.random() / 9999
      ], // 拼团banner图
    };
  },
  components: {
    projectCard,
    "load-over": loadOver,
    Tab, 
    TabItem
  },
  mounted() {
    this.query(1)
  },
  onShow() {
    this.isOver = false;
    this.pageNum = 1
    this.list = [];
    if (this.current == "tab1") {
      this.query(1);
    }
    if (this.current == "tab2") {
      this.query(0);
    }
  },
  onUnload() {
    this.isOver = false;
    this.list = [];
    this.pageNum = 1;
  },
  onReachBottom() {
    this.lower();
  },
  onPullDownRefresh () {
    this.pageNum = 1
    this.isOver = false
    this.list = []
    if (this.current == "tab1") {
      this.query(1);
    }
    if (this.current == "tab2") {
      this.query(0);
    }
  },
  methods: {
    handleChange(val) {
      this.current = val.target.key;
      this.isOver = false;
      this.list = [];
      this.pageNum = 1;
      if (this.current == "tab1") {
        this.query(1);
      }
      if (this.current == "tab2") {
        this.query(0);
      }
    },
    lower() {
      if (this.isOver) {
        // 如果数据加载完毕，不再触发请求
        return;
      }
      if (this.current == "tab1") {
        this.query(1);
      }
      if (this.current == "tab2") {
        this.query(0);
      }
    },
    query(val) {
      var params = {
        onState: val,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      pintuan(params).then(res => {
          this.dealData(res);
      });
    },
    dealData(res) {
      if (res.code === 1 && res.data.data !== null) {
        if (
          this.pageNum >= res.data.pages ||
          res.data.data.length < this.pageSize
        ) {
          this.isOver = true;
        } else {
          this.pageNum++;
        }
        this.list = this.list.concat(res.data.data);
      }
    }
  }
};
</script>

<style scoped>
.fight_group {
  min-height: 100%;
  background: #f5f5f5;
}
.img {
  width: 100%;
  height: 2.1rem;
}
.isOver {
  font-size: 22px;
  color: #d9d9d9;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 17px 0;
}
.tabs {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.no_data {
  width: 100%;
  height: 400rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #d9d9d9;
  text-align: center;
}
.group_list {
  margin-top: 90rpx;
}
.content {
  background: #fff;
}
</style>
