/* eslint-disable brace-style */


import ajax from '../../../util/ajax';


const githubFileAPI = 'https://api.github.com/repos/Minecraft-Origin/Minecraft-Origin/contents';


/**
 * 获取 Minecraft-Origin 仓库下的文件或文件夹信息
 * @param {string} path 文件或路径地址
 */
export default async function getGitHubFile(path) {
  /** 请求的文件路径 */
  let url = `${githubFileAPI}/${path}`;
  /** 当前函数返回的结果 */
  let result = '';

  if (process.env.NODE_ENV === 'production') {
    url += `?_=${+(new Date())}`;
  }

  /** 返回的文件信息 */
  const data = await ajax(url);

  // 如果返回的是数组, 说明读取的是文件列表
  if (Array.isArray(data)) {
    result = data;
  }
  // 如果文件是通过 base64 返回的, 则进行解码
  else if (data.encoding === 'base64') {
    result = decodeURIComponent(escape(atob(data.content)));
  }

  return result;
}
