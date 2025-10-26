/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@wtdo/shared'],
  env: {
    AUTH_PROVIDER: process.env.AUTH_PROVIDER || 'nextauth',
  },
};

module.exports = nextConfig;

