// 配置页面信息
// export const SET_PAGE_INFO = (state, data) => {
//   console.log(data);
// };

// const mutations = {
//   saveUserId(state, change) {
//     state.userInfo.custId = change
//   },
//   saveToken(state, change) {
//     state.userInfo.token = change
//   },
//   saveNowUserInfo (state, change) {
//     state.nowUserInfo.userId = change
//   }
// }

export const saveNowUserInfo = (state, change) => {
  state.nowUserInfo.userId = change
}
// export default mutations
