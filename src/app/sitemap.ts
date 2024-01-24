import { MetadataRoute } from 'next'

import { client } from '@/lib/hackersheet'

type Route = {
  url: string
  lastModified: string
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
  : 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ['', 'abount', 'tags', 'tools/random-emoji'].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString(),
  }))

  const docsPromise = client.getDocuments().then(({ documents }) =>
    documents
      .filter((doc) => !doc.draft)
      .map((doc) => ({
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
