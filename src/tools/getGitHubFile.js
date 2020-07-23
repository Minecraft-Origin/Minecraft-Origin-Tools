/* eslint-disable brace-style */


import ajax from '../lib/ajax';


const githubFileAPI = 'https://api.github.com/repos/Zhang-Wei-666/Minecraft-Origin/contents';


export default async function getGitHubFile(path) {
  /** 后台返回的文件信息 */
  const data = await ajax(`${githubFileAPI}/${path}?_=${+(new Date())}`);
  /** 返回的结果 */
  let result = '';

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
