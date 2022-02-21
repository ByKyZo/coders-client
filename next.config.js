module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    env: {
      API_URL: 'https://jsonplaceholder.typicode.com',
      // API_URL: '/api',
    },
    reactStrictMode: true,
  };
  return nextConfig;
};
