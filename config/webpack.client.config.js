/* eslint-disable no-undef */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, `../.${process.env.DOTENV}.env`),
});

const { NODE_ENV = 'production' } = process.env;

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const MODULE_CODE_REGEXP = /\.[tj]sx?$/;
const MODULE_STYLES_REGEXP = /\.module\.styl$/;
const GLOBAL_STYLES_REGEXP = /\.global\.styl$/;
const ALL_IMAGES_REGEXP = /\.(png|svg|jpe?g|gif|ico)$/i;
const TOWEBP_IMAGES_REGEXP = /\.(jpe?g|png)$/i;

const basePlugins = [
  new AssetsPlugin({
    path: path.resolve(__dirname, '../dist'),
    fullPath: false,
    filename: 'assetsMap.json',
    prettyPrint: NODE_ENV === 'development',
    includeAllFileTypes: false,
    fileTypes: ['css', 'js'],
    processOutput(assets) {
      const output = JSON.stringify(assets);

      return output;
    },
  }),
  new MiniCssExtractPlugin({
    filename:
      NODE_ENV === 'development' ? 'main.css' : 'main.[contenthash].css',
    chunkFilename:
      NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
  }),
  new ImageMinimizerPlugin({
    deleteOriginalAssets: false,
    test: TOWEBP_IMAGES_REGEXP,
    minimizer: {
      implementation: ImageMinimizerPlugin.sharpMinify,
      options: {
        encodeOptions: {
          jpeg: {
            quality: 75,
            effort: 9,
          },
          png: {
            quality: 75,
            effort: 9,
          },
        },
      },
    },
    generator: [
      {
        type: 'import',
        preset: 'webp',
        implementation: ImageMinimizerPlugin.sharpGenerate,
        options: {
          encodeOptions: {
            webp: {
              quality: 80,
              effort: 6,
            },
          },
        },
      },
      {
        type: 'asset',
        implementation: ImageMinimizerPlugin.sharpGenerate,
        options: {
          encodeOptions: {
            webp: {
              quality: 80,
              effort: 6,
            },
          },
        },
      },
    ],
  }),
  new CopyPlugin({
    patterns: [{ from: path.resolve(__dirname, '../src/static') }],
  }),
];

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/client/index.tsx'),
    'webpack-hot-middleware/client?path=//localhost:3001/static/__webpack_hmr',
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename:
      NODE_ENV === 'development' ? 'client.js' : 'client.[contenthash].js',
    publicPath: 'http://localhost:3001/static',
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: true,
            },
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: true,
            },
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
        test: ALL_IMAGES_REGEXP,
        include: [path.resolve(__dirname, './src/assets/images')],
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  devtool: NODE_ENV === 'development' ? 'eval-source-map' : false,

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
          new ForkTsCheckerWebpackPlugin({ typescript: { mode: 'write-dts' } }),
          new CleanWebpackPlugin(),
        ]
      : basePlugins,

  mode: NODE_ENV === 'development' ? 'development' : 'production',
};
