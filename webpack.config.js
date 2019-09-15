const path = require("path");

module.exports = {
  mode: "development", //production
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/static/",
    filename: "bundle.js"
  },
  devServer: {
    disableHostCheck: true,
    hot: true,
    publicPath: "/static/",
    proxy: {
      "/blog": "http://localhost:8081",
      "/static": "http://localhost:8081"
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react"],
          plugins: [
            "transform-class-properties",
            "transform-object-rest-spread"
          ]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "less-loader",
            options: { javascriptEnabled: true }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|jpg|png)/,
        use: ["file-loader"]
      }
    ]
  }
};
