/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oruritest.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/bubu/*",
      },
    ],
  },
};

module.exports = nextConfig;
