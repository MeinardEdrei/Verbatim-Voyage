/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Allow placeholder image domain
      },
      {
        protocol: 'https',
        hostname: 'github.com', // Allow placeholder image domain
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Allow placeholder image domain
      },
    ],
    dangerouslyAllowSVG: true // Allow SVG support
  },
};

export default nextConfig;
