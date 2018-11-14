const path = require('path');

module.exports = {
  // entry: './src/index.ts',
  entry: './src/index.js',
  output: {
    library: 'UIDesigner',
    libraryTarget: 'umd',
    // globalObject: `(typeof self !== 'undefined' ? self : this)`, // 为了解决UMD标准的全局对象，同时兼容浏览器和node环境的问题，参见：https://github.com/webpack/webpack/issues/6642
    globalObject: `(typeof window !== 'undefined' ? window : global)`, // 上面的方案在Module系统里会有问题，这是我自己研究的方案
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:[
              [
                '@babel/preset-env',
                {
                  "targets": {
                    // "browsers": ["last 2 versions", "safari >= 7","ie >= 8"],
                    "node": "current"
                  }
                }
              ]
          ],
          // presets: ['@babel/preset-env'],
          plugins:[
            [
              "@babel/plugin-transform-runtime",
              {
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
              }
            ],
            '@babel/plugin-proposal-class-properties'
          ]
          }
        }
      }
    ]
  }
  // resolve: {
  //   // Add '.ts' and '.tsx' as a resolvable extension.
  //   extensions: [".ts", ".tsx", ".js"]
  // },
  // module: {
  //   rules: [
  //         // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
  //         { 
  //           test: /\.tsx?$/, 
  //           exclude: /(node_modules|bower_components)/,
  //           use:{
  //             loader: "ts-loader" 
  //           }
  //         }
  //     ]
  // }
};