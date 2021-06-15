const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
 output: {
   path: `${__dirname}/public`,
   filename: 'bundle.js'
 },
 devServer: {
   port: 8080,
   watchContentBase: true
 },
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
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
       use: [
         'url-loader'
       ]
     }
   ]
 },
 plugins: [
   new MiniCssExtractPlugin({ filename: "style.css" })
 ],
 optimization: {
   minimize: true,
   minimizer: [
     new TerserPlugin({ extractComments: false })
   ],
 }
};
