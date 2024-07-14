/* eslint-disable */
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'public-content.hackersheet.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'hackersheet.test',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
