const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  devtool: "none",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
       {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
       {test: /\.css$/i, loader: ["style-loader","css-loader"]},
       {test: /\.s[ac]ss$/i, loader: ["style-loader", "css-loader", "sass-loader"]}
    ]
  },
  
  devServer: {
    historyApiFallback: true,
  },

  plugins: [
     new HtmlWebpackPlugin({
       template: "./public/index.html",
     }),
  ]
}