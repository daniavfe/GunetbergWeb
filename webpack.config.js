const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: "development",
	entry: "./src/views/index.tsx",
	plugins: [
		new Dotenv({path:"env/.env.development"}),
		new CopyPlugin({
			patterns: [
			  { from: "static"},
			],
		  }),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader"
				]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "build"),
		publicPath: "/"
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, "build")
		},
		compress: true,
		port: 3000,
		historyApiFallback: true
	}
};
