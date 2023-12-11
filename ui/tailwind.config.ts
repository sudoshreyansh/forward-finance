import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'background': '#101018',
      'background2': '#1E1E2D',
      'primary': '#6966FF',
      'secondary': '#303045',
      'border': '#363a45',
      'tradebg': '#131722',
      'customGreen': '#089981',
      'customRed': '#f23645'
    },
  },
  plugins: [],
}
export default config
