const { dirname, resolve, basename } = require('path');
const { copySync } = require('fs-extra');
const PluginVue = require('rollup-plugin-vue');

const HU_RUNNING_COMMAND = process.env.HU_RUNNING_COMMAND;


// 拷贝类库到静态资源文件夹
[
  resolve(dirname(require.resolve('vue')), 'vue.min.js'),
  resolve(dirname(require.resolve('axios')), 'dist/axios.min.js'),
  resolve(dirname(require.resolve('ant-design-vue')), '../dist/antd.min.js')
].forEach((from) => {
  copySync(from, resolve(
    __dirname, 'client/static/lib', basename(from)
  ));
});


module.exports = {

  mode: HU_RUNNING_COMMAND === 'build',

  inputDir: '',
  outputDir: '',

  banner: '/* eslint-disable */\n\n',

  replace: {
    'process.env.NODE_ENV': JSON.stringify(HU_RUNNING_COMMAND === 'build' ? 'production' : 'development')
  },

  externals: {
    vue: 'Vue',
    'ant-design-vue': 'antd',
    axios: 'axios'
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
