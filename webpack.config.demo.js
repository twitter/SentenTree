var webpack = require('webpack');
var path = require('path');

// Detect environment
var isProduction = process.env.NODE_ENV === 'production';

// Create config
var config = {
  entry: {
    'demo/dist/main.js': './demo/src/main.js'
  },
  output: {
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
          presets: ['react', 'es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ]
  },

  plugins: [],

  devtool: isProduction ? undefined : 'eval'
};

if (isProduction) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      report: 'min',
      compress: true,
      preserveComments: false,
      mangle: true
    })
  );
}

module.exports = config;
