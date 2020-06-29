module.exports = {
  apps: [
    {
      // 应用程序的脚本路径
      script: 'main.js',
      // 集群模式
      instances: 'max',
      // 监听改动
      watch: ['main.js', 'server'],
      // 忽略监听的文件夹
      ignore_watch: ['node_modules']
    }
  ]
};
