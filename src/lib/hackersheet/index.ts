import { createClient } from '@hackersheet/core'
import { cache } from 'react'

import { HACKERSHEET_API_ACCESS_KEY, HACKERSHEET_API_ENDPOINT } from '@/constants'

import makeWebsiteQuery from './utils/make-website-query'

const client = cache(() =>
  createClient({
    url: HACKERSHEET_API_ENDPOINT,
    accessKey: HACKERSHEET_API_ACCESS_KEY,
  })
)()

export { client, makeWebsiteQuery }
export { DocumentContent } from './components/document-content'
export * from '@hackersheet/core'
