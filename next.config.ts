import type { NextConfig } from 'next'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  logLevel: 'info',
})

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ]
  },
  transpilePackages: [
    '@hackersheet/next-document-content-components',
    '@hackersheet/next-document-content-kifu',
  ],
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
