import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as mutations from './mutations';
// import * as getters from './getters';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: {},
    userInfo: { // app中用户信息
      custId: 1098,
      token: ''
    },
    // httpUrl: "http://api.meiduduo.com/",
    // httpUrl: 'https://s.meiduduo.com/',
    httpUrl: 'http://192.168.1.200:8200/',
    shareInfo: {
      iosScheme: 'dspeidou://main',
      androidScheme: 'dspeidou://main',
      iosDownload: 'itms-apps://itunes.apple.com/app/id1269398285?mt=8',
      androidDownload: 'http://pgyer.com/YY2M'
    },
    nowUserInfo: { // 分享后当前登录用户信息
      userId: null,
      areaId: null
    },
    nowDocterFoucs: false, // 当前查看的医生是否已关注
    nowDoctorDetail: { //  当前查看的医生详细信息
      name: '',
      icon: '',
      id: null
    },
    iswrite: false // 资讯详情输入框展示
  },
  // getters,
  // actions,
  // mutations
  mutations: {
    saveUserId(state, change) {
      state.userInfo.custId = change
    },
    saveToken(state, change) {
      state.userInfo.token = change
    },
    saveNowUserInfo(state, change) {
      state.nowUserInfo.userId = change
    },
    saveNowUserCityId(state, change) {
      state.nowUserInfo.areaId = change
    },
    updateDoctorFoucs(state, change) {
      state.nowDocterFoucs = change
    },
    updateDoctorDetail(state, change) {
      state.nowDoctorDetail = change
    },
    saveWriteState(state, change) {
      state.iswrite = change
    }
  }
});
