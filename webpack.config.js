const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'index.bundle.js',
    assetModuleFilename: "assets/[hash][ext][query]"
  },
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 8080,
    static: [{
      watch: true
    }]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(mp3|wav)$/,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};
