import type { NextConfig } from 'next'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  logLevel: 'info',
})

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/docs/:slug.md',
          destination: '/docs/raw/:slug',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
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
