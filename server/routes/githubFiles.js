/* eslint-disable no-unused-vars */


const KoaRouter = require('koa-router');
const ajax = require('../utils/ajax');


/**
 *
 * @param {KoaRouter} router
 */
module.exports = (router) => {
  //
  router.get('/README.md', async (ctx) => {
    ctx.body = await GetReadme();
  });
};

// 获取 README.md 的内容
async function GetReadme() {
  // minecraft-origin-tools
  // m29qtnhNxa8P36Dcmn
  try {
    return await ajax('https://raw.githubusercontent.com/Zhang-Wei-666/Minecraft-Origin/极限/README.md');
  } catch (error) {
    return GetReadme();
  }
}
