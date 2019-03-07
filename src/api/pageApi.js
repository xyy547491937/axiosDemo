// import post from '@/utils/authPost';
import fetch from '@/utils/fetch';
import authFetch from '@/utils/authFetch';

// 获取页面信息
// export const getPageConfig = () => {
//   return post({
//     url: '/api/v1/p/page'
//   });
// };

export const queryDoctorDetail = (params = {}) => {
  return fetch({
    url: 'servicePersonal/queryOneByPk',
    method: 'post',
    data: params
  });
};

export const queryServicePersonal = (params = {}) => {
  return fetch({
    url: 'servicePersonal/getEvaluateInfo',
    method: 'post',
    data: params
  })
}

export const queryStar = (params = {}) => {
  return fetch({
    url: 'servicePersonal/getEvaluationById',
    method: 'post',
    data: params
  })
}

export const queryExampleList = (params = {}) => { // 医生案例
  return fetch({
    url: 'diaryBook/list4PageForDiaryBook',
    method: 'post',
    data: params
  })
}

export const queryHotList = (params = {}) => { // 热卖列表
  return fetch({
    url: 'commodity/commodityList',
    method: 'post',
    data: params
  })
}

export const toAttention = (params = {}) => { // 关注
  return fetch({
    url: 'focusRecord/save',
    method: 'post',
    data: params
  })
}

export const queryGroupCommidity = (params = {}) => {
  return fetch({
    url: 'commodity/queryOneGroupCommidityByPk',
    method: 'post',
    data: params
  })
}

export const queryJoinList = (params = {}) => {
  return fetch({
    url: 'groupOrder/listJoinVersion4',
    method: 'post',
    data: params
  })
}

export const queryInviteDetail = (params = {}) => {
  return fetch({
    url: 'groupOrder/inviteJoin',
    method: 'post',
    data: params
  })
}

export const queryFightGroupList = (params = {}) => {
  return fetch({
    url: 'fightGroup/list4PageGroup',
    method: 'post',
    data: params
  })
}

export const queryActivityByCustId = (params = {}) => {
  return fetch({
    url: 'redPacketActivity/queryActivityByCustId',
    method: 'post',
    data: params
  })
}

export const openEnvelopeList = (params = {}) => {
  return fetch({
    url: 'packetInviteRecord/openedEnvelopeRecordList4Page',
    method: 'post',
    data: params
  })
}

export const queryMenchanismList = (params = {}) => { //机构主页服务列表
  return fetch({
    url: 'organ/queryOneByPk',
    method: 'post',
    data: params
  })
}

export const queryMenchanismDocList = (params = {}) => { //机构主页医生列表
  return fetch({
    url: 'servicePersonal/getServicePersonalList',
    method: 'post',
    data: params
  })
}

export const http = (url, params = {}) => {
  return fetch({
    url: url,
    method: 'post',
    data: params
  })
}

export const texting = (params = {}) => { // 发送验证码
  return fetch({
    url: 'register/getVerifyCode',
    method: 'post',
    data: params
  })
}

export const login = (params = {}) => { // 登录
  return authFetch({
    url: 'auth/login',
    method: 'post',
    data: params
  })
}

export const dismantleEnvelope = (params = {}) => { // 小程序-帮好友拆红包接口
  return fetch({
    url: 'packetInviteRecord/dismantleEnvelope',
    method: 'post',
    data: params
  })
}

export const checkJoin = (params = {}) => { // 检测被邀请人是否已下单成功
  return fetch({
    url: 'groupOrder/inviteJoinSuccess',
    method: 'post',
    data: params
  })
}

export const pushOrder = (params = {}) => { // 提交拼团订单
  return fetch({
    url: 'groupOrder/saveGroupOrder',
    method: 'post',
    data: params
  })
}

export const pintuan = (params = {}) => { //拼团列表
  return fetch({
    url: 'fightGroup/list4PageGroupVersion4',
    method: 'post',
    data: params
  })
}

export const register = (params = {}) => { // 注册
  return fetch({
    url: 'register/save',
    method: 'post',
    data: params
  })
}

export const rule = (params = {}) => { // 请求规则说明
  return fetch({
    url: 'redPacketActivity/queryOneByPk',
    method: 'post',
    data: params
  })
}

export const queryAreaIdByCityName = (params = {}) => { // 获取城市id
  return fetch({
    url: 'common/getCityId',
    method: 'post',
    data: params
  })
}

export const queryDoctorSaid = (params = {}) => { // 请求医生说说列表（分页）
  return fetch({
    url: 'tops/list4Page',
    method: 'post',
    data: params
  })
}

export const queryLike = (params = {}) => { // 点赞/取消点赞
  return fetch({
    url: 'customerRecord/save',
    method: 'post',
    data: params
  })
}

export const querySignature = (params = {}) => { // h5分享获取签名
  return fetch({
    url: 'jscode2Session/getJsapiSignature',
    method: 'post',
    data: params
  })
}

export const getVideoInfo = (params = {}) => { // 视频详情
  return fetch({
    url: 'smallVideo/queryOneByPkAndUserId',
    method: 'post',
    data: params
  })
}

export const getCommenList = (params = {}) => { // 评论列表
  return fetch({
    url: 'comment/list4Page',
    method: 'post',
    data: params
  })
}

export const getRelevantVideo = (params = {}) => { // 相关视频
  return fetch({
    url: 'smallVideo/list4PageForApp',
    method: 'post',
    data: params
  })
}

export const infoDisplayForApp = (params = {}) => { // APP-邀请好友活动信息展示
  return fetch({
    url: 'virtualInvite/infoDisplayForApp',
    method: 'post',
    data: params
  })
}

export const queryInviteCode = (params = {}) => { // APP-点击邀请好友，生成邀请码
  return fetch({
    url: 'shareTask/getInvitationCode',
    method: 'post',
    data: params
  })
}
