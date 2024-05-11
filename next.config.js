/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
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
      {
        source: "/admin/edit",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/admin/manage",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/admin/chat",
        destination: "/admin",
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
