import { cache } from 'react'

import { hackersheetApiAccessKey, hackersheetApiEndpoint } from '@/constants'

import { createClient } from './create-client'

const makeClient = cache(() =>
  createClient({
    url: hackersheetApiEndpoint,
    accessKey: hackersheetApiAccessKey,
  })
)

const client = makeClient()

export { client }
