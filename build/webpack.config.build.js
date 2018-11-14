
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base');

const webpackConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'ui-designer.min.js',
  },
  devtool: 'cheap-module-source-map'
});
module.exports =webpackConfig;