const PluginVue = require('rollup-plugin-vue');


module.exports = {

  inputDir: '',
  outputDir: '',
  browserslist: [
    'last 2 Chrome versions'
  ],
  plugins: () => [
    PluginVue()
  ],

  pipe: [
    {
      input: 'src/index.js',
      output: 'client/static/index.js'
    }
  ]
};
