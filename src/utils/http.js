import axios from 'axios';

// const BASE_URL = 'https://192.168.1.200/shop4/';
const BASE_URL = 'https://s.meiduduo.com/shop4/';
// const BASE_URL = 'http://api.meiduduo.com/shop4/';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
http.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, (error) => {
  // 对响应错误做点什么
  console.log(error.response.status);
  return Promise.reject(error);
});

export default http;
