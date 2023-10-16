import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'

function makeClient() {
  return createClient({
    url: `${process.env.HACKERSHEET_API_ENDPOINT}`,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      headers: {
        Authorization: `bearer ${process.env.HACKERSHEET_API_ACCESS_KEY}`,
      },
      next: {
        revalidate: 60,
      },
    },
  })
}

export const { getClient } = registerUrql(makeClient)
