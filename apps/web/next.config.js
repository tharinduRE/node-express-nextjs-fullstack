const { withSentryConfig } = require("@sentry/nextjs");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// module.exports = withSentryConfig(
//   module.exports,
//   { silent: true },
//   {
//     hideSourcemaps: true,
//     disableServerWebpackPlugin: false,
//     disableClientWebpackPlugin: false,
//   }
// );
