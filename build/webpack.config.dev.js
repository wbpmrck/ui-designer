
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base');

const webpackConfig = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'ui-designer.js',
  },
  devtool: 'cheap-module-eval-source-map'
});
module.exports =webpackConfig;