const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFileWebpackPlugin = require("write-file-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');
const HappyPack = require('happypack');
const pkg = require("./package.json");

module.exports = {
  entry: {
    app: './src/index.js'
  },
  // devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'public',
    compress: true,
  },
  resolve: {
    alias: {
      app: path.join(__dirname, 'app')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        }),
        exclude: /(leaflet.css$|semantic.css$|leaflet.draw.css$|pikaday.css$|rc-slider.css$|font-awesome.css$)/
      },
      {
        test: /(semantic.css$|font-awesome.css$)/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-raw-loader'
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'happypack/loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'icons-loader'
      }
    ]
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
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js",
    }),
    new webpack.DefinePlugin({
      'process.env': {
        DEBUG: `"${process.env.DEBUG || 'dev:*,log:*,error:*'}"`,
        NODE_ENV: `"${process.env.NODE_ENV || 'development'}"`
      },
    }),
    new HtmlWebpackPlugin({
      title: 'TA Media DSP',
      hash: true,
      template: "src/index.dev.ejs",
      chunks: ["app"]
    }),
    // new CopyWebpackPlugin([{ from: "./assets", to: "." }]),
    new BundleAnalyzerPlugin({
      analyzerPort: 8989,
    }),
    new WriteFileWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json'),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    fs: 'empty'
  }
};

