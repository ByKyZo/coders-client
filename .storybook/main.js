const path = require('path');

// ? 1 - npx sb init (installer storybook)
// ? 2 - installer la version ^10 de sass loader (pour importer l'index.scss)
// ? 3 - Mettre en place les absolute path
// ? 4 - L'addon router pour next.js

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    // ? Permet de faire fonctionner l'absolute path
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@redux': path.resolve(__dirname, '../src/redux'),
      '@helpers': path.resolve(__dirname, '../src/helpers'),
      '@graphql': path.resolve(__dirname, '../src/graphql'),
      '@types': path.resolve(__dirname, '../src/types'),
      '@lib': path.resolve(__dirname, '../src/lib'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@hoc': path.resolve(__dirname, '../src/hoc'),
    };
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@': path.resolve(__dirname, '../'),
    // };

    // ? Permet d'importer le fichier index.scss
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
