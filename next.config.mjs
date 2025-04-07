/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // Vercel deployment config
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Allow running on Replit
  webpack: (config) => {
    // Adjust Webpack config as needed
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;