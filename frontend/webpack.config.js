const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "compiled"),
    clean: true,
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js",
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "compiled"),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
};
