require('dotenv').config({ path: '.env.development.local' })

import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: {
    [`${process.env.HACKERSHEET_API_ENDPOINT}`]: {
      headers: {
        Authorization: `Bearer ${process.env.HACKERSHEET_API_ACCESS_KEY}`,
      },
    },
  },
}

export default config
