const webpack = require('webpack')
const path = require('path')
const env = require('./utils/env')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const uglify = env.NODE_ENV === 'development' ? n => n : new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
})

module.exports = {
  entry: {
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    contentScripts: path.join(__dirname, 'src', 'js', 'content-scripts.js'),
    tind3rContentScript: path.join(__dirname, 'src', 'js', 'tind3r-content-script.js'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.png$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(env) }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    uglify,
    new WriteFilePlugin()
  ],
  excludeEntriesToHotReload: ['contentScripts', 'accountKit']
}
