/** @type {import('next').NextConfig} */
module.exports = {
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    onDemandEntries: {
      maxInactiveAge: 59000,
      pagesBufferLength: 5,
    },
    devIndicators: {
      buildActivityPosition: 'bottom-right',
      buildActivity: true,
    },
    experimental: {
      runtime: 'edge',
    },
  }