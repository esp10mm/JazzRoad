const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');

const vendors = [
  'immutable',
  'react-router',
  'sockjs-client',
  'tone'
];

module.exports = {
  entry: {
    vendor: vendors,
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
    library: '[name]_[chunkhash]',
  },
  plugins: [
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              ['es2015', { loose: true, modules: false }]
            ]
          }
        },
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
    }),
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js",
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: true,
      minimize: true,
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ]
};

