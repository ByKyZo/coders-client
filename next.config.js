module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // webpack(config, options) {
  //   const fileLoaderRule = config.module.rules.find(
  //     (rule) => rule.test && rule.test.test('.svg')
  //   );
  //   fileLoaderRule.exclude = /\.svg$/;

  //   config.module.rules.push({
  //     loader: '@svgr/webpack',
  //     options: {
  //       prettier: false,
  //       svgo: true,
  //       svgoConfig: {
  //         plugins: [{ removeViewBox: false }],
  //       },
  //       titleProp: true,
  //     },
  //     test: /\.svg$/,
  //   });

  //   return config;
  // },

  //   return config;
  // },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });

  //   return config;
  // },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.react\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });

  //   //  config.module.rules.push({
  //   //    test: /\.(png|jpg|jpeg|gif|webp|ico|bmp|.svg)$/i,
  //   //    exclude: [
  //   //      /\.react\.svg$/,
  //   //    ],
  //   //    use: ["next-image-loader"]
  //   //  });

  //   const imageLoaderRule = config.module.rules.find(
  //     (rule) => rule.loader == 'next-image-loader'
  //   );
  //   imageLoaderRule.exclude = /\.react\.svg$/;

  //   return config;
  // },
  // webpack(config, options) {
  //   const fileLoaderRule = config.module.rules.find(
  //     (rule) => rule.test && rule.test.test('.svg')
  //   );
  //   fileLoaderRule.exclude = /\.svg$/;

  //   config.module.rules.push({
  //     loader: '@svgr/webpack',
  //     options: {
  //       prettier: false,
  //       svgo: true,
  //       svgoConfig: {
  //         plugins: [{ removeViewBox: false }],
  //       },
  //       titleProp: true,
  //     },
  //     test: /\.svg$/,
  //   });

  //   return config;
  // },
};

// module.exports = (phase, { defaultConfig }) => {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ['@svgr/webpack'],
//     })

//     return config
//   }
//   // /**
//   //  * @type {import('next').NextConfig}
//   //  */
//   // const nextConfig = {
//   //   env: {
//   //     API_URL: 'https://jsonplaceholder.typicode.com',
//   //     // API_URL: '/api',
//   //   },
//   //   reactStrictMode: true,
//   // };
//   // return nextConfig;
// };
