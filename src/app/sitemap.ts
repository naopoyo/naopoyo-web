import { MetadataRoute } from 'next'

import { baseUrl } from '@/constants'
import { client } from '@/lib/hackersheet'

type Route = {
  url: string
  lastModified: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ['', 'docs', 'about', 'tags', 'tools/random-emoji'].map((route) => ({
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
