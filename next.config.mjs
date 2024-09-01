/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite qualquer hostname
      },
      {
        protocol: 'http',
        hostname: '**', // Permite qualquer hostname com protocolo HTTP
      },
    ],
  },
};

export default nextConfig;
