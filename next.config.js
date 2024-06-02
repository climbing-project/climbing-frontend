/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
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
      {
        source: "/manage/edit",
        destination: "/manage",
        permanent: true,
      },
      {
        source: "/manage/comments",
        destination: "/manage",
        permanent: true,
      },
      {
        source: "/manage/chat",
        destination: "/manage",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "ec2-13-125-164-197.ap-northeast-2.compute.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
