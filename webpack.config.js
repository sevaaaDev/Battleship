const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = "production";
process.env.NODE_ENV = mode;
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: mode,
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  // devtool: "inline-source-map",
  devServer: {
    watchFiles: ["dist/**/*"],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "src/view/template.html",
    }),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
