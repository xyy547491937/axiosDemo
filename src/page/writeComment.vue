<template>
  <div class="commentbor">
    <div :class="focus?'writeComment1':'write-comment'" @click.stop="sendStatusMth">
    <!-- <div :class="focus?'writeComment1':'write-comment'" @click.stop="sendStatusMth"> -->
      <input
        id="inputHtml"
        name="input1"
        v-focus="{val:focus}"
        type="text"
        :placeholder="placeholder"
        v-model="content"
        @blur="blurmth"
        @keydown="commentSave"
      >
      <!-- <input
        id="inputHtml"
        name="input1"
        :placeholder="placeholder"
        v-model="content"
        @blur="blurmth"
        :autofocus="focus"
        @click.stop="sendStatusMth"
        @keyup.enter.native="commentSave"
        @keypress="keypressF"
      > -->
      <span v-show="focus" class="send" @click.stop="commentSave(true)">发布</span>
    </div>
    <!-- <div @click="sendStatusMth" class="write-comment" v-if="writeItem&&writeItem.write2 &&!focus">
      <input disabled="true" name="input" placeholder="亲，说两句..." @click="sendStatusMth">
    </div>
    <div v-show="focus" class="writeComment1" :style="{bottom:rHeight+'px'}">
      <input
        name="input1"
        :placeholder="placeholder"
        v-model="content"
        @blur="blurmth"
        :autofocus="focus"
        @focus="focusMth"
        @keyup.enter="commentSave"
      >
      <span class="send" @click="commentSave">发布</span>
    </div>-->
  </div>
</template>
<script>
import { http } from "../api/pageApi.js";
const dataArr = [];
export default {
  data() {
    return {
      status: false,
      add: false,
      content: "",
      contents: "",
      rHeight: "",
      focus: false,
      placeholder: "亲，说两句..."
    };
  },
  props: ["writeItem"],
  onLoad() {
    this.status = false;
    this.add = false;
    console.log(this.writeItem);
  },

directives: {
       focus: {
        update(el, binding, vnode,oldVnode) {
         console.log(el)
         console.log(binding)
         console.log(vnode,888888888)
         console.log(oldVnode,99999999)
         if(binding.oldValue.val != binding.value.val){
           if(binding.value.val){
             el.focus();
             vnode.context['_data'].focus = true
             console.log("聚焦成功")
           } else {
             el.blur();
             vnode.context['_data'].focus = false
             console.log("失去焦点成功")
           }
         }
        }
       }
    },
  watch: {
    "writeItem.sendStatus": {
      handler(val) {
        console.log(val, 1);
        this.$set(this, "status", val);
        this.status = val;
      }
    },
    "writeItem.focus": {
      handler(val) {
        console.log(val, 6);
        this.$set(this, "focus", val);
        // if (val) {
        //   document.getElementById("inputHtml").focus();
        // } else {
        //   document.getElementById("inputHtml").blur();
        // }
      }
    },
    "writeItem.place": {
      handler(val) {
        console.log(val);
        this.$set(this, "placeholder", val);
        if (val.indexOf('回复') > -1) {
          this.content = ''
        }
      }
    }
  },
  methods: {
    keypressF(event) {
      console.log(event.keyCode);
      // event.preventDefault()
      console.log("监听键盘事件");
      console.log(event.target.value);
    },
    // focusMth(event) {
    //   this.content = "";
    //   // var { value, height } = event.mp.detail;
    //   // this.rHeight = 3.75;
    //   this.$set(this, "focus", true);
    // },
    blurmth() {
      console.log("失去焦点");
      // this.add = false
      // this.status = false
      // this.content = ''
      var a = this.content;
      this.contents = a;
      this.rHeight = 'bottom:0px;';
      if (this.content) { // 如果input中有内容则不改变样式
        return
      }
      setTimeout(() => {
        this.$emit("blurChange");
        this.focus = false;
        // this.add = true;
        this.content = "";
      }, 0);
    },
    sendStatusMth(event) {
      console.log(event,'点击事件')
      this.$emit("showInput");
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.toLogin(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.toLogin.postMessage(null);
      this.rHeight = "top:"+event.y/2+"px;"
      }
      console.log(document.body.clientHeight)
      console.log(window.screen.height)
      console.log(window.screen.availHeight)
      document.getElementById("inputHtml").focus();
        this.$set(this,'focus',true)
      if (this.placeholder.indexOf("回复") == -1) {
        this.add = true;
        this.status = false;
        console.log(this.focus);
        this.$emit("sendStatusM1", true);
        // this.focus = true;
        // this.rHeight = 0;
        this.content = "";
      } else {
        console.log(this.placeholder.indexOf("回复"), "回复");
        this.add = false;
        this.status = true;
      }
    },
    // 保存评论
    commentSave(event) {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.toLogin(null);
      }
      if (isiOS) {
        window.webkit.messageHandlers.toLogin.postMessage(null);
      }
      var custId = "";
      if (isAndroid) {
        custId = window.android.getUserId();
      }
      console.log(this.writeItem.custId, custId, "asd");
      if ((isAndroid && !custId) || !this.writeItem.custId) {
        // if (!this.writeItem.custId) {
        // console.log(this.writeItem.custId,custId, "as");
        this.$emit("sendStatusM", this.status);
        return false;
      }
      console.log(
        this.content,
        this.content1 != "",
        this.content.length > 0,
        666
      );
      console.log(event,'键盘点击事件')
      console.log(this.content,this.contents,'内容获取')
      var ctn = this.contents.length>0?this.contents.replace(/(^\s*)|(\s*$)/g, ""):this.content.replace(/(^\s*)|(\s*$)/g, "")
      console.log(ctn,'处理之后的内容')
      if (event!=true&&event.keyCode!=13 ) {
        return
      }
      if (ctn != "" && ctn.length > 0) {
        if ((event&&event.keyCode==13)|| event==true) {
          var commentType = "",
          commentId = 0,
          criticId = "";
          console.log(this.add, this.status);
          if (this.writeItem.commentText == "add") {
            commentType = this.writeItem.commentType;
            commentId = 0;
            criticId = "";
          }
          console.log(this.writeItem);
          if (this.writeItem.commentText == "reply") {
            commentType = 11;
            commentId = this.writeItem.commentId;
            criticId = this.writeItem.criticId;
          }
          var option = {
            id: "", // id，新增时为空，修改时必输
            contentId: this.writeItem.contentId,
            custId: this.writeItem.custId == "" ? custId : this.writeItem.custId,
            criticId: this.writeItem.criticId,
            content: ctn,
            commentId: commentId,
            commentType: commentType
          };
          http("/comment/save", option).then(res => {
            if (res.code == 1) {
              this.content = "";
              this.$vux.toast.show({
                text: "提交成功",
                type: "success"
              });
              this.$emit("blurChange");
              setTimeout(() => {
                this.add = false;
                this.status = false;
                // if (!this.focus) {
                this.$emit("send");
                // }
                // this.$emit('send')
                this.$emit("sendStatusM");
              }, 2000);
            }
          });
        }
      } else {
        this.$vux.toast.text("请输入内容", "middle");
      }
    }
  }
};
</script>
<style scoped>
.commentbor {
  width: 100%;
  height: 90px;
  overflow: hidden;
  border-top: 1px solid #f3f3f3;
  border-bottom: 1px solid #fff;
  position: absolute;
  bottom: 0;
  background: #fff;
  box-sizing: border-box;
  z-index: 100;
}
.write-comment {
  width: 702px;
  box-sizing: border-box;
  height: 60px;
  margin: 14px auto;
  border-radius: 200px;
  padding-left: 80px;
  font-size: 24px;
  color: #333;
  background: #f1f1f1
    url("http://img.meiduduo.com/images/info/information_write_icon.png")
    no-repeat 30px center;
  background-size: 32px 32px;
}
.write-comment input {
  box-sizing: border-box;
  display: inline-block;
  width: 96%;
  height: 60px;
  /* line-height: 60px; */
  color: #333;
  border-radius: 14px;
  background: transparent;
}
input {
  border: 0;
}
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
.writeComment1 input {
  float: left;
  width: 85%;
  height: 60px;
  /* line-height: 60px; */
  border-radius: 20px;
  background: #f1f1f1;
  padding-left: 30px;
  box-sizing: border-box;
}
input[placeholder],
[placeholder],
*[placeholder] {
  color: #333333 !important;
}
input::-webkit-input-placeholder {
  color: #333;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	 -webkit-transition-delay: 99999s;
	-webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
</style>
