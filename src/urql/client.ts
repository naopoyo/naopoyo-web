import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'

const makeClient = () => {
  return createClient({
    url: `${process.env.HACKERSHEET_API_ENDPOINT}`,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      headers: {
        Authorization: `bearer ${process.env.HACKERSHEET_API_ACCESS_KEY}`,
      },
    },
  })
}

export const { getClient } = registerUrql(makeClient)
