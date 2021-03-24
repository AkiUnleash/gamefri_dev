const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MODE = "development";
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: MODE,
  devtool: 'inline-source-map',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  plugins: [
    // .envを使用するプラグイン
    new Dotenv(),
  ]
});