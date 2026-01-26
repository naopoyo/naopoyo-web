import { createClient } from '@hackersheet/core'
import { cache } from 'react'

import { HACKERSHEET_API_ACCESS_KEY, HACKERSHEET_API_ENDPOINT } from '@/constants'

/**
 * Hackersheet API クライアントを初期化します。
 *
 * React の cache() 関数を使用することで、リクエスト単位でのメモ化を実現し、
 * 同一リクエスト内での重複初期化を避けます。
 *
 * @internal
 */
const createCachedClient = cache(() => {
  // const urqlClient = _createUrqlClient({
  //   url: HACKERSHEET_API_ENDPOINT,
  //   exchanges: [cacheExchange, fetchExchange],
  //   fetchOptions: {
  //     headers: {
  //       Authorization: `bearer ${HACKERSHEET_API_ACCESS_KEY}`,
  //     },
  //     next: { revalidate: 60 },
  //   },
  //   preferGetMethod: false,
  // })

  return createClient({
    url: HACKERSHEET_API_ENDPOINT,
    accessKey: HACKERSHEET_API_ACCESS_KEY,
    // urqlClient: urqlClient,
  })
})

/**
 * Hackersheet API クライアントのシングルトンインスタンス
 */
const client = createCachedClient()

export { client }
