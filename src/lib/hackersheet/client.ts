import { createClient } from '@hackersheet/core'
import { cache } from 'react'

import { HACKERSHEET_API_ACCESS_KEY, HACKERSHEET_API_ENDPOINT } from '@/constants'

const client = cache(() => {
  // const urqlClient = _createUrqlClient({
  //   url: HACKERSHEET_API_ENDPOINT,
  //   exchanges: [cacheExchange, fetchExchange],
  //   fetchOptions: {
  //     headers: {
  //       Authorization: `bearer ${HACKERSHEET_API_ACCESS_KEY}`,
  //     },
  //     cache: 'default',
  //     next: { revalidate: 60 },
  //   },
  //   preferGetMethod: false,
  // })

  return createClient({
    url: HACKERSHEET_API_ENDPOINT,
    accessKey: HACKERSHEET_API_ACCESS_KEY,
    // urqlClient: urqlClient,
  })
})()

export { client }
