import { cache } from 'react'

import { HACKERSHEET_API_ACCESS_KEY, HACKERSHEET_API_ENDPOINT } from '@/constants'

import { createClient } from './client/create-client'
import makeWebsiteQuery from './make-website-query'

const client = cache(() =>
  createClient({
    url: HACKERSHEET_API_ENDPOINT,
    accessKey: HACKERSHEET_API_ACCESS_KEY,
  })
)()

export { client, makeWebsiteQuery }
