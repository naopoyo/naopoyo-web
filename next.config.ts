import type { NextConfig } from 'next'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  logLevel: 'info',
})

const nextConfig: NextConfig = {
  transpilePackages: ['@hackersheet/next-document-content-components'],
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

export default withBundleAnalyzer(nextConfig)
