const webpackClientConfig = require('./config/webpack.client.config.js');
const webpackServerConfig = require('./config/webpack.server.config.js');

module.exports = [webpackClientConfig, webpackServerConfig];
