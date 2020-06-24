/* eslint-disable no-unused-vars */


const KoaRouter = require('koa-router');
const atob = require('atob');
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

/**
 * 获取 README.md 的内容
 */
async function GetReadme() {
  try {
    return decodeURIComponent(escape(atob((await ajax('https://api.github.com/repos/Zhang-Wei-666/Minecraft-Origin/contents/README.md')).content)));
  } catch (error) {
    return GetReadme();
  }
}
