/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
