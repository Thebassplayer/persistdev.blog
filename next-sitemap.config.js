/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.persistdev.blog/",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
