/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'edge',
    serverComponents: true,
    reactRoot: 'concurrent',
  },
};

module.exports = nextConfig;
