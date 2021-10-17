const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const Dotenv = require("dotenv-webpack");

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
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              indentedSyntax: true,
            },
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: process.env.APP_NAME,
    }),
    new Dotenv({
      path: "./.env",
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
      "@": path.resolve(__dirname, "src"),
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
