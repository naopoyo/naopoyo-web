import plugin from 'tailwindcss/plugin'

import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        app: {
          // https://colorhunt.co/palette/17223b2638596b778dff6768
          bg: '#10151c',
          bg2: '#17223B',
          bg3: '#263859',
          text: '#CCCCCC',
          accent: '#FF6768',
          link: '#96d0ff',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.grid-template-rows-subgrid': {
          'grid-template-rows': 'subgrid',
        },
      })
    }),
  ],
}
export default config
