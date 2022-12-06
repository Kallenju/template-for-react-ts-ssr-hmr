// eslint-disable-next-line no-undef
const { NODE_ENV, BROWSERSLIST_ENV } = process.env;

let params = {
  presets: [
    [
      '@babel/preset-env',
      {
        browserslistEnv: BROWSERSLIST_ENV,
        useBuiltIns: 'usage',
        corejs: { version: '3.26', proposals: true },
      },
    ],
    [
      '@babel/preset-react',
      {
        development: NODE_ENV === 'development',
      },
    ],
    ['@babel/preset-typescript'],
  ],

  plugins: NODE_ENV === 'development' ? ['react-refresh/babel'] : [],

  exclude: [/node_modules/],
};

if (NODE_ENV === 'test') {
  params = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  };
}

// eslint-disable-next-line no-undef
module.exports = params;
