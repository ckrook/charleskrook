/** @type {import('next').NextConfig} */
const nextConfig = {
    // whitelist image
    images: {
        domains: ['placehold.co'],
    },
    env: {
        NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    },
};

export default nextConfig;
