<template>
  <div class="c">
    <!-- 评价 -->
    <div class="details-comments box-margin-bottom">
      <div class="details-comments-main box-border-bottom">
        <div class="details-commtens-header box-border-bottom">
          <div class="doctor-info flex-r">
            <p>项目评价（450）</p>
            <!-- <img src="http://img.meiduduo.com/images/shop/call.png" alt> -->
            <span class="iconfont icon-Right" style="color:#999;font-size:14px;s"></span>
          </div>
          <div class="commtens-info">
            <span>效果4.9</span>
            <span>环境4.8</span>
            <span>专业4.9</span>
            <span>服务5.0</span>
          </div>
        </div>
        <div class="details-commten-item common-box-style">
          <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
          <div>
            <p class="user-info">
              <span>匿名用户22231</span>
              <span>
                <!-- <img src="http://img.meiduduo.com/images/shop/call.png" alt> -->
                <span class="iconfont icon-zan" style="color:#999"></span>
                <span>15</span>
              </span>
            </p>
            <p class="commten-content">用清水稀释后的白醋水可以用于洗脸。白醋本身有抑菌、美白、软化角质的作用，每天坚持用白醋洗脸可以让面部肌肤白白嫩嫩</p>
            <p class="commten-other">20分钟前 浏览3204</p>
            <div class="commten-imgs">
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
              <img src="http://fs.meiduduo.com/shop/SHOP/other/1543457448154.png" alt>
            </div>
            <div class="commten-review">
              <p>机构回复：</p>
              <p>谢谢亲亲的好评！</p>
            </div>
          </div>
        </div>
      </div>
      <p class="details-commtens-btn vux-1px-t">
        <span>查看全部评价</span>
        <!-- <img src="http://img.meiduduo.com/images/shop/call.png" alt> -->
        <span class="iconfont icon-Right" style="color:#ff4691;font-size:14px;"></span>
      </p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.flex-r {
  display: flex;
  flex-direction: row;
}
.details-comments {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 24px;
  color: #333;
  .details-comments-main {
    width: 100%;
    box-sizing: border-box;
    padding: 23px 33px 0 31px;
    .details-commtens-header {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 47px;
      .doctor-info {
        justify-content: space-between;
        padding-top: 0;
        padding-bottom: 32px;
      }
      .commtens-info {
        > span {
          color: #666;
          padding: 0 23px 0 27px;
          height: 44px;
          border-radius: 22px;
          line-height: 44px;
          background-color: #f1f1f1;
          margin-right: 18px;
          display: inline-block;
          margin-bottom: 33px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .details-commtens-btn {
    font-size: 24px;
    color: #ff4691;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 26px 0 31px 0;
    > img {
      display: inline-block;
      width: 14px;
      height: 19px;
    }
  }
}
.doctor-info {
  font-size: 24px;
  color: #666;
  width: 100%;
  box-sizing: border-box;
  padding-top: 29px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  > img {
    display: inline-block;
    width: 14px;
    height: 19px;
  }
}

.details-commten-item {
  margin-bottom: 38px;
  > img {
    display: inline-block;
    width: 66px;
    height: 66px;
    border-radius: 100%;
    margin-right: 20px;
  }
  > div {
    .user-info {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      align-items: center;
      -webkit-align-items: center;
      margin-bottom: 34px;
      > span:first-child {
        color: #3f6ba6;
        font-size: 26px;
        font-weight: bold;
      }
      > span:last-child {
        display: inline-flex;
        display: -webkit-inline-flex;
        align-items: center;
        -webkit-align-items: center;
        > img {
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-right: 8px;
        }
      }
    }
    .commten-content {
      color: #333;
      margin-bottom: 19px;
    }
    .commten-other {
      font-size: 22px;
      color: #999;
    }
    .commten-imgs {
      margin-top: 22px;
      > img {
        display: inline-block;
        width: 186px;
        height: 186px;
        border-radius: 10px;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .commten-review {
      margin-top: 24px;
      background-color: #f1f1f1;
      font-size: 24px;
      color: #666;
      width: 100%;
      box-sizing: border-box;
      padding: 22px;
      border-radius: 10px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: -20px;
        display: block;
        border: 12px solid #f1f1f1;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
      }
    }
  }
}

.common-box-style {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  align-items: flex-start;
  -webkit-align-items: flex-start;
  > div {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
  }
}
</style>
