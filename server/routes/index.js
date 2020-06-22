/* eslint-disable no-unused-vars */


const KoaRouter = require('koa-router');
const GithubFilesRouter = require('./githubFiles');


/**
 *
 * @param {KoaRouter} router
 */
module.exports = (router) => {
  [
    GithubFilesRouter
  ].forEach((routerFn) => {
    routerFn(router);
  });
};
