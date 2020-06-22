const { dirname, resolve } = require('path');
const { copySync } = require('fs-extra');
const PluginVue = require('rollup-plugin-vue');

const HU_RUNNING_COMMAND = process.env.HU_RUNNING_COMMAND;


// 拷贝 Vue 到静态资源文件夹
{
  const vueDirname = dirname(require.resolve('vue'));
  const vuePath = resolve(vueDirname, 'vue.min.js');

  copySync(
    vuePath,
    resolve(__dirname, 'client/static/lib/vue.min.js')
  );
}


module.exports = {

  mode: HU_RUNNING_COMMAND === 'build',

  inputDir: '',
  outputDir: '',

  banner: '/* eslint-disable */\n\n',

  replace: {
    'process.env.NODE_ENV': JSON.stringify(HU_RUNNING_COMMAND === 'build' ? 'production' : 'development')
  },

  externals: {
    vue: 'Vue'
  },

  plugins: () => [
    PluginVue()
  ],

  pluginOptions: {
    banner: {
      isComment: false
    }
  },

  browserslist: [
    'last 2 Chrome versions'
  ],

  pipe: [
    {
      input: 'src/index.js',
      output: 'client/index/index.js'
    }
  ]
};
