'use strict';

var path    = require('path');
var webpack = require('webpack');

module.exports = {
	entry: "./src/entry.js",
	output: {
		path: "/build/",
		filename: "bundle.js"
	},
	node: {
			fs: 'empty'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				include: path.join(__dirname, 'node_modules', 'pixi.js'),
				loader: 'json',
			},
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader'
			},
			{
				test: /\.css$/, 
				loader: "style-loader!css-loader"

			},
		],

	},
	devServer: {
	    contentBase: "./src",
	},


};