const Axios = require('axios');


const axios = Axios.create();
const defaultOptions = {
  method: 'get',
  timeout: 0
};


// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/**
 * 发起 Ajax 请求
 * @param {string} url 需要请求的地址
 * @param {{}} params 需要携带的参数
 * @param {{}} options 其他选项
 */
module.exports = function ajax(url, params, options) {
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
