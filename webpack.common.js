const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
    clean: true,
    // publicPath: '/dist/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3030,
    open: true,
    historyApiFallback: true, // without no routing
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)/,
        use: [
          "style-loader",
          {
            loader: "css-loader?modules",
            options: { url: true, sourceMap: true, importLoaders: 2, },
          },
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: [["autoprefixer", { grid: true }],], }, },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true, },
          },
        ],
      },
      { test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/, type: "asset/inline", },
      { test: /\.tsx?$/, use: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  target: ["web", "es5"],
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '',
      filename: 'index.html',
      template: 'src/html/index.html',
    }),
    // .envを使用するプラグイン
    new Dotenv(),
  ]
};