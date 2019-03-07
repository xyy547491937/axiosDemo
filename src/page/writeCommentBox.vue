<template>
  <div class="commentbor" ref="commentbor" :style="status?`bottom:${defaultHeight}px`: ''">
    <div class="input-box">
      <div class="comment-input" :class="!iswrite ? 'default-input' : ''">
        <input @click.stop="touchInput" :autofocus="iswrite" @blur="blurInput" v-model="content" :placeholder="iswrite ? '' : '亲，说两句...'" />
      </div>
      <span v-if="iswrite" class="send-btn" @click.stop="commentSave">发布</span>
    </div>
    <!-- <div class="footer" v-if="writeItem&&writeItem.write1 && !status" @click="sendStatusMth">
    <img src="http://img.meiduduo.com/images/info/footer_comment.png" alt="">评论
    </div>-->
    <!-- <div @click="sendStatusMth" class="write-comment" v-if="writeItem&&writeItem.write2 && !status">
      <input
        :disabled="true"
        name="input"
        placeholder="亲，说两句..."
        v-model="content"
        @focus="sendStatusMth"
      >
    </div>
    <div class="writeComment1" v-show="status">
      <div class="input"> -->
        <!-- :focus="true" -->
        <!-- autofocus="autofocus" -->
        <!-- <input
          name="input1"
          autofocus="autofocus"
          :cursor-spacing="50"
          v-model="content"
          ref="inputCon"
          @focus="getInput"
          id="writeInput"
        >
      </div>
      <span class="send" @click="commentSave">发布</span> -->
    </div>
  </div>
</template>

<script>
import { http } from "../api/pageApi.js";
import { mapMutations, mapState } from 'vuex';
const dataArr = [];
export default {
  data() {
    return {
      status: false,
      add: false,
      content: "",
      show6: false,
      defaultHeight: 0,
      activeHeight: 0,
      isDefault: true,
      placeholderText: '亲，说两句...',
      isBack: false
    };
  },
  props: ["writeItem"],
  created() {
    this.status = false;
    this.add = false;
  },
  watch: {
    "writeItem.sendStatus": {
      handler(val) {
        // console.log('wuwuwuw')
        // console.log(val)
        // this.isBack = true
        // this.status = val;
        // this.isDefault = !val
        // if (this.isDefault) {
        //   this.placeholderText = '亲，说两句...'
        // } else {
        //   this.placeholderText = ''
        // }
      }
    }
  },
  computed: {
    ...mapState(['iswrite'])
  },
  methods: {
    ...mapMutations(['saveWriteState']),
    touchInput (event) {
      console.log(event)
      event.target.focus()
      this.saveWriteState(true)
      // this.$emit('showInput')
      // this.isDefault = false
      // this.placeholderText = ''
    },
    blurInput () {
      this.saveWriteState(false)
      // this.placeholderText = '亲，说两句...'
      // if (this.isBack) {
      //   this.$emit("blurInput", true)
      //   this.isBack = false
      // } else {
      //   this.isDefault = true
      // this.placeholderText = '亲，说两句...'
      // }

    },
    getInput() {
      console.log("聚焦了");
      // setTimeout(() => {
      //   this.defaultHeight = 0
      //   document.getElementsByTagName('body')[0].scrollTop = 300
      // }, 500);

      // $("#hhhh").on("click", function() {
      //   var target = this;
      //   // 使用定时器是为了让输入框上滑时更加自然
      //   setTimeout(function() {
      //     // target.scrollIntoView(true);
      //     alert(1);
      //     target.scrollIntoViewIfNeeded(true); // 推荐使用
      //   }, 100);
      // });
    },
    sendStatusMth() {
      this.$emit('showInput')
      this.add = true;
      this.status = true
      this.$nextTick(() => {
        // this.status = true;
        let a = document.getElementById('writeInput')
        console.log(a)
        a.focus()
      });
    },
    // 保存评论
    commentSave() {
      if (!this.writeItem.custId) {
        this.$emit("sendStatusM", this.status);
        return false;
      }
      if (this.content.length > 0) {
        var commentType = "",
          commentId = 0,
          criticId = "";
          console.log(this.add,this.writeItem.sendStatus)
        if (this.add) {
          commentType = this.writeItem.commentType;
          commentId = 0;
          criticId = "";
        }
        if (this.writeItem.sendStatus) {
          commentType = 11;
          commentId = this.writeItem.commentId;
          criticId = this.writeItem.criticId;
        }
        var option = {
          id: "", // id，新增时为空，修改时必输
          contentId: this.writeItem.contentId,
          custId: this.writeItem.custId,
          criticId: this.writeItem.criticId,
          content: this.content,
          commentId: commentId,
          commentType: commentType
        };
        http("comment/save", option).then(res => {
          if (res.code == 1) {
            // wx.showToast({
            //   title: "等待审核",
            //   icon: "success",
            //   duration: 2000
            // });
            this.$vux.toast.show({
              text: "提交成功",
              type: "success"
            });
            this.add = false;
            this.status = false;
            this.content = "";
            setTimeout(() => {
              this.$emit("send");
              this.$emit("sendStatusM", this.status);
            }, 2000);
          }
        });
      } else {
        this.$vux.toast.text("请输入内容", "middle");
      }
    }
  }
};
</script>
<style scoped lang="less">
/* .footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 88px;
        text-align: center;
        line-height: 88px;
        background: #f1f1f1;
        font-size: 28px;
        color: #555;
        z-index: 101;
    }
    .footer img{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-right: 10px;
    } */
* {
  touch-action: pan-y;
}
.commentbor {
  width: 100%;
  height: 90px;
  overflow: hidden;
  border-top: 1px solid #f3f3f3;
  border-bottom: 1px solid #fff;
  position: fixed;
  bottom: 0;
  background: #fff;
  box-sizing: border-box;
  z-index: 999;
}
.write-comment {
  width: 702px;
  box-sizing: border-box;
  height: 60px;
  margin: 14px auto;
  border-radius: 200px;
  padding-left: 80px;
  font-size: 32px;
  color: #333;
  background: #f1f1f1 url("http://img.meiduduo.com/images/info/information_write_icon.png")
    no-repeat 30px center;
  background-size: 32px 32px;
  input[placeholder], [placeholder], *[placeholder] {
    color:#333333!important;
  }
}
.write-comment input {
  box-sizing: border-box;
  display: inline-block;
  width: 96%;
  height: 60px;
  border: none;
  line-height: 60px;
  // padding-right: 80px;
  border-radius: 14px;
  background-color: #f1f1f1;
  // background: #f1f1f1 url("http://img.meiduduo.com/images/face.png") no-repeat
  //   560px center;
  // background-size: 36px;
}
/* 样式 */

.writeComment1 {
  width: 100%;
  height: 88px;
  /* margin: 13px auto; */
  /* height: 85px; */
  padding: 14px 20px;
  font-size: 24px;
  color: #555;
  background: #fff;
  box-sizing: border-box;
  padding-right: 0;
}

.writeComment1 .send {
  float: left;
  width: 15%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #53a6dc;
  float: left;
  font-size: 26px;
}

.writeComment1 .input {
  float: left;
  width: 85%;
  height: 60px;
  line-height: 60px;
  border-radius: 20px;
  background: #f1f1f1;
  padding-left: 30px;
  box-sizing: border-box;
  border: none;
  input {
    width: 76%;
    background: #f1f1f1;
    border: none;
    height: 60px;
    outline: none;
  }
}
.input-box {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  .comment-input {
    flex: 1;
    -webkit-flex: 1;
    background-color: #f5f5f5;
    box-sizing: border-box;
    padding: 0 20px;
    height: 60px;
    border-radius: 30px;
    > input {
      width: 100%;
      font-size: 26px;
      border: 0;
      height: 100%;
      background-color: transparent;
      color: #333;
      &::-webkit-input-placeholder {
        color: #333;
      }
    }
  }
  .default-input {
    padding-left: 70px;
    background: #f1f1f1 url("http://img.meiduduo.com/images/info/information_write_icon.png") no-repeat 30px center;
    background-size: 32px 32px;
  }
  .send-btn {
    font-size: 26px;
    color: #53a6dc;
    width: 80px;
    text-align: right;
  }
}
</style>
