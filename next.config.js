/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ['m.media-amazon.com'],
  },
};

module.exports = nextConfig;
