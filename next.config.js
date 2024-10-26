/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/post/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer({ ...nextConfig });
