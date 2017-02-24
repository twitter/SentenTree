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
  externals: [{
    'd3': true,
    'd3kit': {
      amd: 'd3kit',
      commonjs: 'd3kit',
      commonjs2: 'd3kit',
      root: 'd3Kit',
    },
    'heap': true,
    'lodash': {
      amd: 'lodash',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      root: '_',
    },
    'webcola/WebCola/cola.js': {
      amd: 'webcola/WebCola/cola.js',
      commonjs: 'webcola/WebCola/cola.js',
      commonjs2: 'webcola/WebCola/cola.js',
      root: 'cola',
    },
  }],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ]
  },

  plugins: [],

  devtool: isProduction ? undefined : 'eval'
};

module.exports = config;
