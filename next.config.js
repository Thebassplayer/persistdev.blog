const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  turbopack: {
    root: __dirname,
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

module.exports = withMDX({ ...nextConfig });
