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
    filename: '[name].js',
    library: '[name]'
  },

  devtool: NODE_ENV == 'development' ? 'source-map' : null,


  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],

  resolveLoaders: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file?name=fonts/[name].[ext]"
    }, {
      test: /bootstrap\/dist\/js\/umd\//,
      loader: 'imports?jQuery=jquery'
    }]
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: path.resolve(__dirname, 'public'),
    hot: true
  }
};