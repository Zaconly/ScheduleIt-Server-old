const path = require("path")
const nodeExternals = require("webpack-node-externals")
const webpack = require("webpack")
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env")
})

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /.ts/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  externals: [nodeExternals()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env":
        process.env.NODE_ENV === "production"
          ? JSON.stringify(process.env)
          : JSON.stringify(dotenv.parsed)
    })
  ]
}
