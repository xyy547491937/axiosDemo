import axios from "axios";
import MD5 from "js-md5";
const BASE_URL = "http://192.168.1.200:8200/shop4/";
// const BASE_URL = 'http://192.168.1.14:8200/shop4/'; // 调试
// const BASE_URL = "https://s.meiduduo.com/shop4/";

// const BASE_URL = "http://api.meiduduo.com/shop4/";
axios.defaults.responseType = "json";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

axios.defaults.transformRequest = [
  function (params) {
    // TODO: secret start
    let paramsArr = [];
    params['terminalType'] = 'shop4';
    paramsArr = JSON.parse(JSON.stringify(params));
    paramsArr.timestamp = (Date.parse(new Date()) + '').substr(0, 10);
    let keyArr = [];
    let secret = '';
    for (let key in paramsArr) {
      keyArr.push(key);
    }
    keyArr = keyArr.sort();
    let urlPath = '';
    keyArr.forEach(function (key) {
      // secret += paramsArr[key];
      if (paramsArr[key] != null && String.trim(paramsArr[key]) != '') {
        urlPath += key + '=' + paramsArr[key] + '&';
        secret += paramsArr[key];
      }
    });
    secret = MD5(secret);
    secret = MD5('deshangwang' + secret + 'meirenhui');
    urlPath += 'secret=' + secret;
    return urlPath;
    // TODO: secret end

    // let ret = "";
    // for (let it in params) {
    //   ret +=
    //     encodeURIComponent(it) + "=" + encodeURIComponent(params[it]) + "&";
    // }
    // return ret;
  }
];

const fetch = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

fetch.interceptors.request.use(
  function (config) {
    config.headers.req_type = "ajax";
    // config.data.token = '293cc25c2e66fb3bfff27e8c4803f2bd';
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default fetch;
