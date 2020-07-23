const Koa = require('koa');
const KoaStatic = require('koa-static');
const chalk = require('chalk');

const app = new Koa();

// 静态目录文件夹
app.use(
  KoaStatic('./client')
);

// 启动服务端
app.listen(666, undefined, undefined, () => {
  console.log('[ Minecraft-Origin-Tools ] 服务端启动成功 !');
  console.log(`[ Minecraft-Origin-Tools ] ${chalk.green('http://localhost:666')}`);
});
