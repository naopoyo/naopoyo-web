import { cacheExchange, createClient, fetchExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'

function makeClient() {
  return createClient({
    url: makeUrl(),
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      headers: {
        Authorization: `bearer ${process.env.HACKERSHEET_API_ACCESS_KEY}`,
      },
      next: {
        revalidate: 300,
      },
    },
  })
}

function makeUrl() {
  const timestamp = Date.now()
  const cacheRefreshInterval = 5 * 60 * 1000
  const roundedTimeStamp = Math.floor(timestamp / cacheRefreshInterval) * cacheRefreshInterval

  return `${process.env.HACKERSHEET_API_ENDPOINT}?${roundedTimeStamp}`
}

export const { getClient } = registerUrql(makeClient)
