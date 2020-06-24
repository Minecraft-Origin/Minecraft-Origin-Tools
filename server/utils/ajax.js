/* eslint-disable dot-notation */


const Url = require('url');
const Axios = require('axios');


const axios = Axios.create();
const defaultOptions = {
  method: 'get',
  timeout: 0
};


// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const headers = config.headers || (config.headers = {});

    headers['Accept-Encoding'] = headers['Accept-Encoding'] || 'gzip, deflate, br';
    headers['Accept-Language'] = headers['Accept-Language'] || 'zh-CN,zh;q=0.9';
    headers['Cache-Control'] = headers['Cache-Control'] || 'no-cache';
    headers['Connection'] = headers['Connection'] || 'keep-alive';
    headers['Host'] = headers['Host'] || Url.parse(config.url).host;
    headers['Pragma'] = headers['Pragma'] || 'no-cache';
    headers['Sec-Fetch-Dest'] = headers['Sec-Fetch-Dest'] || 'document';
    headers['Sec-Fetch-Mode'] = headers['Sec-Fetch-Mode'] || 'navigate';
    headers['Sec-Fetch-Site'] = headers['Sec-Fetch-Site'] || 'none';
    headers['Sec-Fetch-User'] = headers['Sec-Fetch-User'] || '?1';
    headers['Upgrade-Insecure-Requests'] = headers['Upgrade-Insecure-Requests'] || '1';
    headers['User-Agent'] = headers['User-Agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);


module.exports = (url, params, options) => {
  // 对 URL 进行编码
  url = encodeURI(url);
  // 获取最终 options
  options = Object.assign({}, defaultOptions, options);

  // 发起请求
  return axios({
    url,
    params,
    method: options.method,
    timeout: options.timeout
  });
};
