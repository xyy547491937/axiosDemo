// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import App from "./App";
import router from "./router";
import store from "./store";
import MD5 from "js-md5";
// import clipboard from 'clipboard'
// import VConsole from 'vconsole'
// import loading from "@/loading"
// Vue.use(loading)
//引入剪切板
import clipboard from "clipboard";
// import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

import {
  Flexbox,
  FlexboxItem,
  AlertPlugin,
  ToastPlugin
} from "vux";
import {
  AjaxPlugin
} from "vux";

// var Vconsole = new VConsole()
Vue.use(AjaxPlugin);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.component("flexbox", Flexbox);
Vue.component("flexbox-item", FlexboxItem);
//vux组件na
// import  { ToastPlugin } from 'vux'
// Vue.use(ToastPlugin)

Vue.prototype.changeJump = function (path, query) {
  //changeData是函数名
  this.$router.push({
    path: path,
    query: query
  });
};
Vue.prototype.MD5 = MD5;
Vue.prototype.clipboard = clipboard;
/* eslint-disable no-new */
new Vue({
  el: "#app-box",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
