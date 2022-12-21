/* eslint-disable no-undef */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, `../.${process.env.DOTENV}.env`),
});

const { NODE_ENV = 'production' } = process.env;

const webpackNodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const MODULE_CODE_REGEXP = /\.[tj]sx?$/;
const STYLES_REGEXP = /.styl$/;

const basePlugins = [];

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
          ...basePlugins,
          new ReactRefreshPlugin({
            overlay: {
              sockIntegration: 'whm',
            },
          }),
          new webpack.HotModuleReplacementPlugin(),
        ]
      : [...basePlugins],

  externals: [webpackNodeExternals()],

  target: 'node',

  externalsPresets: { node: true },

  mode: NODE_ENV === 'development' ? 'development' : 'production',

  optimization: {
    minimize: false,
  },
};
