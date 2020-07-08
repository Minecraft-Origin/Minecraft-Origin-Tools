import ajax from '../lib/ajax';


const githubFileAPI = 'https://api.github.com/repos/Zhang-Wei-666/Minecraft-Origin/contents';


export default async function getGitHubFile(path) {
  /** 后台返回的文件信息 */
  const data = await ajax(`${githubFileAPI}/${path}`);
  /** 返回的结果 */
  let result = '';

  // 如果文件是通过 base64 返回的, 则进行解码
  if (data.encoding === 'base64') {
    result = decodeURIComponent(escape(atob(data.content)));
  }

  return result;
}
