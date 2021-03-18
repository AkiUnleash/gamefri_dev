const path = require('path');
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MODE = 'development';
const imageRoot = '/';

module.exports = {
	mode: MODE,
	entry: path.resolve(__dirname, 'src/index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		// publicPath: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 3000,
		open: true,
		historyApiFallback: true, // without no routing
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: [/\.css$/, /\.scss$/],
				exclude: /node_modules/,
				loader: [MiniCssExtractPlugin.loader, 'css-loader?modules', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							esModule: false,
							name: "images/[name]-[hash].[ext]",
							publicPath: imageRoot,
						},
					},
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
						},
					},
				],
			},
			{
				test: [/\.tsx?$/, /\.js$/],
				loader: ['ts-loader'],
			},
		],
	},
	plugins: [
		new BabelMinifyPlugin(),
		new HtmlWebpackPlugin({
			publicPath: 'dist',
			filename: 'index.html',
			template: 'src/html/index.html',
		}),
		new MiniCssExtractPlugin({
			publicPath: 'dist',
			filename: '[name]-[hash].css',
		}),
	],
}
