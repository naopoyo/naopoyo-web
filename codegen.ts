require('dotenv').config({ path: '.env.development.local' })

import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: {
    [`${process.env.HACKERSHEET_API_ENDPOINT}`]: {
      headers: {
        Authorization: `Bearer ${process.env.HACKERSHEET_API_ACCESS_KEY}`,
      },
    },
  },
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/lib/hackersheet/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
      plugins: [],
    },
  },
  hooks: { afterAllFileWrite: ['pnpx prettier --write', 'pnpx eslint --fix'] },
}

export default config
