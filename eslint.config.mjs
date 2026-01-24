import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintConfigPrettier from 'eslint-config-prettier'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '**/node_modules/**',
    '**/.next/**',
    '**/out/**',
    '**/build/**',
    '**/next-env.d.ts',
    '**/*.config.*',
    '**/*.mjs',
    '**/coverage/**',
  ]),
  eslintConfigPrettier,
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/no-unknown-classes': [
        'error',
        { ignore: ['adsbygoogle', 'auto-phrase'] },
      ],
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/globals.css',
        // 定数変数をlint対象に含める
        variables: [
          [
            '^.*_CLASS$',
            [
              {
                match: 'strings',
              },
            ],
          ],
        ],
      },
    },
  },
  {
    files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
])

export default eslintConfig
