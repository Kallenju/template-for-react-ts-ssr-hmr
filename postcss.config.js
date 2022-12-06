/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mergeRules = require('postcss-merge-rules');

const { NODE_ENV, BROWSERSLIST_ENV } = process.env;

const params = {
  plugins: [
    cssnano({
      plugins: [mergeRules],
    }),
    autoprefixer({ env: BROWSERSLIST_ENV }),
  ],
};

if (NODE_ENV === 'production') {
  params.plugins = [
    ...params.plugins,
    ...[
      cssnano({
        preset: 'default',
      }),
    ],
  ];
}

module.exports = params;
