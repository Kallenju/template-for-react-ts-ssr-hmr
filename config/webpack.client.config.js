/* eslint-disable no-undef */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { NODE_ENV } = process.env;
const MODULE_CODE_REGEXP = /\.[tj]sx?$/;
const MODULE_STYLES_REGEXP = /\.module\.styl$/;
const GLOBAL_STYLES_REGEXP = /\.global\.styl$/;

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/client/index.tsx'),
    'webpack-hot-middleware/client?path=//localhost:3001/static/__webpack_hmr',
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '//localhost:3001/static',
  },

  module: {
    rules: [
      {
        test: MODULE_CODE_REGEXP,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: MODULE_STYLES_REGEXP,
        exclude: GLOBAL_STYLES_REGEXP,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'string-replace-loader',
            options: {
              search: /@supports\s\(selector:\sfocus-visible\)/g,
              replace: '@supports selector(:focus-visible)',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
      {
        test: GLOBAL_STYLES_REGEXP,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  devtool: NODE_ENV === 'development' ? 'eval' : false,

  plugins:
    NODE_ENV === 'development'
      ? [
          new CleanWebpackPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new ReactRefreshPlugin({
            overlay: {
              sockIntegration: 'whm',
            },
          }),
          new ForkTsCheckerWebpackPlugin({ typescript: { mode: 'write-dts' } }),
        ]
      : [],

  mode: NODE_ENV === 'development' ? 'development' : 'production',
};
