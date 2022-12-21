/* eslint-disable no-undef */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, `../.${process.env.DOTENV}.env`),
});

const { DEV_SERVER_PORT = 3000, HMR_SERVER_PORT = 3001 } = process.env;

const express = require('express');
const webpack = require('webpack');
const [
  webpackClientConfig,
  webpackServerConfig,
] = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const nodemon = require('nodemon');
const cors = require('cors');

const hmrServer = express();

const clientCompiler = webpack(webpackClientConfig);

const allowedOrigins = [
  `http://localhost:${DEV_SERVER_PORT}`,
  `http://localhost:${HMR_SERVER_PORT}`,
];

hmrServer.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const message =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

hmrServer.use(
  webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    writeToDisk: true,
    stats: 'errors-only',
  })
);

hmrServer.use(
  webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
  })
);

hmrServer.listen(HMR_SERVER_PORT, () => {
  console.log(
    `\nHMR Server successfully started on http://localhost:${HMR_SERVER_PORT}\n`
  );
});

const serverCompiler = webpack(webpackServerConfig);

serverCompiler.run((err) => {
  if (err) {
    console.log(`\nCompilation with server config was failed: ${err}\n`);
  }

  serverCompiler.watch({}, (err) => {
    if (err) {
      console.log(`\nCompilation with server config was failed: ${err}\n`);
    }
    console.log('\nCompilation with server config was successful\n');
  });

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ],
  });

  console.log(
    `\n!!!Server!!!\nServer started on port http://localhost:${DEV_SERVER_PORT}\n!!!Server!!!`
  );
});
