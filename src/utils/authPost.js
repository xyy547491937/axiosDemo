/*
 * @Author: Gavin
 * @Date: 2018-07-26 11:04:16
 * @Last Modified by: buer
 * @Last Modified time: 2018-12-04 11:28:10
 * @Describe: 头部请求加入token
 */
import http from './http';

const post = (data) => {
  console.log(data);
  // const info = JSON.parse(localStorage.getItem('info'));
  // data.method = 'POST';
  data.headers = {
    // 'x-access-token': info.token,
    // 'secret': info.secret,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  };
  data.data.token = '293cc25c2e66fb3bfff27e8c4803f2bd';
  data.data = JSON.stringify(data.data);
  return http(data);
};

export default post;
