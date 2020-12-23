const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
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
       template: "./public/index.html"
     })
  ]
}