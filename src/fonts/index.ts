import { Source_Code_Pro } from 'next/font/google'

import GoogleFontLinks from './google-font-links'

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

export { GoogleFontLinks, sourceCodePro }
