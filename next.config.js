/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bilder.buecher.de',
      },
    ],
  },
};

module.exports = nextConfig;
