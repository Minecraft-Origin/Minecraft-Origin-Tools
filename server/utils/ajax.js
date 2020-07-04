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

    Object.entries({
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': Url.parse(config.url).host,
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
    }).forEach(([header, value]) => {
      headers[headers] = headers[headers] || value;
    });

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
