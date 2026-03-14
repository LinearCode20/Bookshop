/** @type {import('next-sitemap').IConfig} */
const BASE_URL = process.env.BASE_URL ?? "https://www.letmegiveyouthegame.com";

module.exports = {
  siteUrl: BASE_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,

  exclude: [
    "/auth/*",
    "/custom-action",
    "/login",
  ],

  additionalPaths: async (config) => [
    await config.transform(config, "/book"),
  ],
};