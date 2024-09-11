/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'headless.loc',
          },
        ],
      },
};

export default nextConfig;
