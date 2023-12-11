const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  plugin: [
    new htmlWebpackPlugin({
      title: "Battleship",
      filename: "index.html",
    }),
  ],
};
