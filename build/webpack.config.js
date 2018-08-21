const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'cheap-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
          // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
          { 
            test: /\.tsx?$/, 
            exclude: /(node_modules|bower_components)/,
            use:{
              loader: "ts-loader" 
            }
          }
      ]
  }
};