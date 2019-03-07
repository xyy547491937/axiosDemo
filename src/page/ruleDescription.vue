<template>
  <div class="rule-description">
    <h2>规则说明</h2>
    <div v-if="content" v-html="content"></div>
    <!-- <p>1、您可以在本活动中拆红包、并发动好友帮您拆红包，每个红包对应一定的金额，金额累计达到100元，您就可以获得全部红包，并提现；如果在活动结束时没有达到15元，那么就无法获得获得红包。</p>
    <p>2、红包金额随机，也会有一定概率出现空红包。</p>
    <p>3、您每期活动最多能帮助1个人拆红包（不包括自己）。</p>
    <p>4、每个好友每次活动最多帮您拆一次红包。</p>
    <p>5、任务周期为1周，每周一00:00，会将之前一周的红包清空，并开启新一周的活动。</p>
    <p>6、红包为感谢用户给平台的代言费，有关活动最终解释权归平台所有。</p> -->
  </div>
</template>
<script>
import { rule } from '../api/pageApi.js'
export default {
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.queryRule()
  },
  methods: {
    queryRule () {
      rule({
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 1) {
          this.content = res.data.activityDesc.replace(/\n|\r\n/g,'<br/>')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.rule-description {
  background: #FFD4BF;
  min-height: 100%;
  box-sizing: border-box;
  padding: 47px;
  > h2 {
    font-size: 34px;
    color: #333;
    font-weight: 500;
    margin-bottom: 36px;
  }
  > p {
    font-size: 24px;
    color: #333;
    line-height: 42px;
  }
  > div {
    font-size: 24px;
    color: #333;
    line-height: 42px;
  }
}
</style>
