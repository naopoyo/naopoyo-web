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
          bg: '#1D2127',
          bg2: '#17223B',
          bg3: '#263859',
          text: '#AEB8C3',
          accent: '#FF6768',
        },
      },
    },
  },
  plugins: [],
}
export default config
