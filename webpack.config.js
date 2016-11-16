'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    main: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/dev-server",
      './main'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js'
  },

  devtool: NODE_ENV == 'development' ? 'source-map' : null,


  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolveLoaders: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }]
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: path.resolve(__dirname, 'public'),
    hot: true
  }
};