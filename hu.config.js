const PluginVue = require('rollup-plugin-vue');

const HU_RUNNING_COMMAND = process.env.HU_RUNNING_COMMAND;


module.exports = {

  mode: HU_RUNNING_COMMAND === 'build',

  inputDir: '',
  outputDir: '',

  browserslist: [
    'last 2 Chrome versions'
  ],

  plugins: () => [
    PluginVue()
  ],

  replace: {
    'process.env.NODE_ENV': JSON.stringify(HU_RUNNING_COMMAND === 'build' ? 'production' : 'development')
  },

  banner: '/* eslint-disable */\n\n',

  pluginOptions: {
    banner: {
      isComment: false
    }
  },

  pipe: [
    {
      input: 'src/index.js',
      output: 'client/static/index.js'
    }
  ]
};
