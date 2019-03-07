import wx from 'weixin-js-sdk';

function wxShare (obj) {
  console.log('进入');
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: obj.appId, // 必填，公众号的唯一标识
    timestamp: obj.timestamp, // 必填，生成签名的时间戳
    nonceStr: obj.nonceStr, // 必填，生成签名的随机串
    signature: obj.signature, // 必填，签名
    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
  });
  wx.ready(function () {
    console.log('reday')
    wx.checkJsApi({
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
      success: function (res) {
        console.log('检验微信分享接口', res);
      }
    });
    wx.onMenuShareTimeline({ // 分享到朋友圈
      title: obj.title, // 分享标题
      link: obj.link, // 分享链接
      imgUrl: obj.imgUrl, // 分享图标
      success: function (res) {
        console.log('分享到朋友圈 success', res);
      },
      trigger: function (res) {
        console.log('分享到朋友圈 trigger', res);
      },
      fail: function (res) {
        console.log('分享到朋友圈 fail', res);
      }
    });
    wx.onMenuShareAppMessage({ // 分享给朋友
      title: obj.title, // 分享标题
      desc: obj.desc, // 分享描述
      link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: obj.imgUrl, // 分享图标
      type: obj.type, // 分享类型,music、video或link，不填默认为link
      dataUrl: obj.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
      success: function (res) {
        console.log('分享给朋友 success', res);
      }
    });
  });
  wx.error(function (err) {
    console.log(err);
  });
}

export default wxShare;
