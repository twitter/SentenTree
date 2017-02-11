var webpack = require('webpack');
var path = require('path');

// Detect environment
var isProduction = process.env.NODE_ENV === 'production';

// Create config
var config = {
  entry: {
    'dist/sententree.js': './src/main.js'
  },
  output: {
    library: 'SentenTree',
    libraryTarget: 'umd',
    path: __dirname,
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ]
  },

  plugins: [],

  devtool: isProduction ? undefined : 'eval'
};

module.exports = config;
