<template>
  <div class="doc-list-p">
    <!-- 机构详情下的医生列表 -->
    <!-- editor xyy -->
    <div class="doctor-list flex-c">
      <div class="flex-r d-case border">
        <div class="doctor-img">
          <span :style="{backgroundImage: `url(${v.icon})`}"></span>
        </div>
        <div class="flex-r clo">
          <div class="flex-c">
            <P class="doctor-name">
              <span>{{v.personalName}}</span>
              <span class="co">{{v.technicalName}}</span>
              <span class="co">从业{{v.workingSeniority}}</span>
            </P>
            <p>{{v.organName}}</p>
            <p>距离 {{v.distance?v.distance.toFixed(2)+'km':'目标太远'}}</p>

            <!--  -->
          </div>
          <div class="case">{{v.caseNum}}个案例</div>
        </div>

        <!--  -->
      </div>
      <div class="b-case">
        <p
          class="flex-r"
          style="justify-content: space-between;"
          v-for="d in v.commodityList"
          :key="d"
          v-if="v.commodityList.length>0"
          @click.stop="prodectDetail(d)"
        >
          <span style="color:#ff4691" class="price">￥{{d.rulePrice}}</span>
          <span class="server-list">
            [{{d.commName}}]
            {{d.remark}}
          </span>
          <span class="appointment">{{d.buyNum}}人预约</span>
        </p>
        <!-- <p class="flex-r"> <span style="color:#ff4691" class="price"> ￥30</span> <span class="server-list"> [注射微整]
        多点定位 注射微整...</span> <span class="appointment"> 116人预约</span></p>-->
      </div>
    </div>
    <!-- nodata -->
    <div class="noData" v-if="doctorers.length<=0">
      <!-- 暂无数据 -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["doctorers"],
  data() {
    return { v: {} };
  },
  created() {
    this.v = this.doctorers;
  },
  mounted() {
    console.log(this.v);
  },
  methods: {
    prodectDetail(val) {
      let params = {
        commId: val.id,
        commName: val.commName,
        remark: val.remark,
        commImg: val.commImg
      };
      const navigatorInfo = navigator.userAgent;
      const isAndroid =
        navigatorInfo.indexOf("Android") > -1 ||
        navigatorInfo.indexOf("Adr") > -1; //android终端
      const isiOS = !!navigatorInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.hotProjectDetail(JSON.stringify(params));
      }
      if (isiOS) {
        window.webkit.messageHandlers.hotProjectDetail.postMessage(params);
      }
    }
  }
};
</script>
<style scoped lang="less">
.flex-r {
  display: flex;
  flex-direction: row;
}

.flex-c {
  display: flex;
  flex-direction: column;
}
.content-item {
  //   padding-left: 0.2rem * 100;
  //   padding-right: 0.2rem * 100;
}
.doctor-list {
  font-size: 14px * 2;
  color: #666;
  line-height: 25px * 2;
  //   margin-bottom: 0.2rem * 100;
}

.doc-list-p {
  //   margin-bottom: 0.2rem * 100;
  margin-bottom: 10px;
  padding: 15px 15px * 2;
  background-color: #fff;
}

.doc-list-p::after {
  display: table;
  content: "";
}
.doctor-img {
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  > span {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 100px;
    background-size: 100px 100px;
    background-repeat: no-repeat;
  }
}

.border {
  border-bottom: 1px solid #e8e8e8;
}
.d-case {
  width: 100%;
  padding: 15px 0;
  padding-bottom: 20px;
  justify-content: space-between;
}
.b-case {
  padding: 15px 0;
  padding-top: 20px;
  > p {
    margin-bottom: 10px;
  }
}
.doctor-img img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: block;
}

.doctor-name span:first-child {
  color: #333;
  font-size: 15px * 2;
  font-weight: bold;
}

.co {
  margin-left: 10px;
}

.clo {
  justify-content: space-between;
  width: 80%;
}

.case {
  // width: 25%;
  text-align: right;
  color: #ff4691;
  /* font-size: 16px*2; */
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.server-list {
  display: inline-block;
  width: 50%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  font-size: 26px;
}

.appointment {
  display: inline-block;
  width: 25%;
  text-align: right;
}

.price {
  color: #ff4691;
  font-weight: bold;
  display: block;
  // width: 25%;
  text-align: right;
  margin-right: 30px;
}
</style>
