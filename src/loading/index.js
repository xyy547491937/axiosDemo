export default {
  install(Vue) {
    let tpl;
    // 弹出框
    Vue.prototype.loading = () => {
      var loading = Vue.extend(require('./src/loading.vue').default);
      tpl = new loading().$mount().$el; // 创建实例，挂载到文档以后的地方
      document.body.appendChild(tpl);
      return tpl
    }
    Vue.mixin({
      methods: {
        hideLoading: function () {
          document.body.removeChild(tpl);
          console.log('执行了这个方法')
        }
      }
    })
  }
}
