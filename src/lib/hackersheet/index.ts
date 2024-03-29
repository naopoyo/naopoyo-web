import { cache } from 'react'

import { HACKERSHEET_API_ACCESS_KEY, HACKERSHEET_API_ENDPOINT } from '@/constants'

import { createClient } from './create-client'
import makeWebsiteQuery from './make-website-query'

const makeClient = cache(() =>
  createClient({
    url: HACKERSHEET_API_ENDPOINT,
    accessKey: HACKERSHEET_API_ACCESS_KEY,
  })
)

const client = makeClient()

export { client, makeWebsiteQuery }
