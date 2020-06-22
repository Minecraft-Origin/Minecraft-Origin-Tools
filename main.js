const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStatic = require('koa-static');
const chalk = require('chalk');
const routes = require('./server/routes');

const app = new Koa();
const router = new KoaRouter();

// 注册路由
routes(router);

// 静态目录文件夹
app.use(
  KoaStatic('./client')
);

// 启动路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务端
app.listen(666, undefined, undefined, () => {
  console.log('[ Minecraft-Origin-Tools ] 服务端启动成功 !');
  console.log(`[ Minecraft-Origin-Tools ] ${chalk.green('http://localhost:666')}`);
});
