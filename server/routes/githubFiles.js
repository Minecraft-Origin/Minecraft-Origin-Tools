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
    try {
      ctx.body = await ajax('https://raw.githubusercontent.com/Zhang-Wei-666/Minecraft-Origin/极限/README.md');
    } catch (error) {
      ctx.body = {};
    }
  });
};
