const path = require('path')

module.exports = {
  stories: [
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-apollo-client',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    const appSrc = path.resolve(__dirname, '../src');

    config.resolve.alias = {
      ...config.resolve.alias,
      '@assets': `${appSrc}/assets/`,
      '@components': `${appSrc}/components/`,
      '@types': `${appSrc}/types/`,
      '@i18n': `${appSrc}/i18n/`,
    };

    return config
  },
}
