/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eu-west-2.graphassets.com',
        pathname: '/**',
      },
    ],
  },
  // The sitemap and robots will be generated automatically by Next.js
  // as per files app/sitemap.ts and app/robots.ts
}
module.exports = nextConfig