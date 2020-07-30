import ajax from '../../../util/ajax';
import delay from '../../../util/delay';


/**
 * 获取最新模组信息
 * @param {string} href 模组主页
 */
export default async function getModLatestInfo(href) {
  const checkHref = href.replace('www.curseforge.com', 'api.cfwidget.com');
  const modData = await ajax(checkHref);

  if (modData.error === 'in_queue') {
    await delay(1000);
    return getModLatestInfo(href);
  }
  return modData;
}
