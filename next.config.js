const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const buildWorkers = Number(process.env.NEXT_BUILD_WORKERS ?? 4);

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
  experimental: {
    cpus: Number.isInteger(buildWorkers) && buildWorkers > 0 ? buildWorkers : 4,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 20,
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
