/* eslint-disable no-unused-vars */


const KoaRouter = require('koa-router');


/**
 *
 * @param {KoaRouter} router
 */
module.exports = (router) => {
  // https://cdn.jsdelivr.net/gh/Zhang-Wei-666/Minecraft-Origin/README.md
  router.get('/README.md', async (ctx) => {
    ctx.body = 'README.md';
  });
};
