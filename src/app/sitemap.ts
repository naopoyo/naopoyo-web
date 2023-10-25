import { MetadataRoute } from 'next'

import { getDocuments } from '@/lib/hackersheet'

type Route = {
  url: string
  lastModified: string
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ['', '/abount', '/tags'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const docsPromise = getDocuments().then(({ documents }) =>
    documents.map((doc) => ({
      url: `${baseUrl}/docs/${doc.slug}`,
      lastModified: doc.modifiedAt,
    }))
  )

  let fetchedRoutes: Route[] = []

  try {
    fetchedRoutes = (await Promise.all([docsPromise])).flat()
  } catch (error) {
    throw JSON.stringify(error, null, 2)
  }

  return [...routesMap, ...fetchedRoutes]
}
