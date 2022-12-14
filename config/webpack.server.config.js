/* eslint-disable no-undef */
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { NODE_ENV } = process.env;

const MODULE_CODE_REGEXP = /\.[tj]sx?$/;
const STYLES_REGEXP = /.styl$/;

module.exports = {
  entry: path.resolve(__dirname, '../src/server/server.tsx'),

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
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
        test: STYLES_REGEXP,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportOnlyLocals: true,
              },
            },
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

  plugins:
    NODE_ENV === 'development'
      ? [
          new webpack.HotModuleReplacementPlugin(),
          new ReactRefreshPlugin({
            overlay: {
              sockIntegration: 'whm',
            },
          }),
        ]
      : [],

  externals: [webpackNodeExternals()],

  target: 'node',

  externalsPresets: { node: true },

  mode: NODE_ENV === 'development' ? 'development' : 'production',

  optimization: {
    minimize: false,
  },
};
