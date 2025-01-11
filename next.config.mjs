/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Allow placeholder image domain
      },
    ],
    dangerouslyAllowSVG: true // Allow SVG support
  },
};

export default nextConfig;
