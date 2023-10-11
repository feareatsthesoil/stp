import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        smMobileY: { raw: "(max-height: 600px)" },
        navMobileX: { raw: "(min-width: 368px) and (max-width: 409px)" },
        smMobileX: { raw: "(max-width: 375px)" },
        mdMobileX: { raw: "(max-width: 570px)" },
        smMuiMobileX: { raw: "(max-width: 599px)" },
        footerMobileX: { raw: "(max-width: 780px)" },
        catCol2: { raw: "(min-width: 1000px)" },
        catCol3: { raw: "(min-width: 1400px)" },
        catCol4: { raw: "(min-width: 2000px)" },
        catCol5: { raw: "(min-width: 2600px)" },
        catCol6: { raw: "(min-width: 3200px)" },
        catCol7: { raw: "(min-width: 3800px)" },
        catCol8: { raw: "(min-width: 4400px)" },
        catCol9: { raw: "(min-width: 5000px)" },
        catCol10: { raw: "(min-width: 5600px)" },
        catCol11: { raw: "(min-width: 6200px)" },
        catCol12: { raw: "(min-width: 6800px)" },
      },
    },
  },
  plugins: [],
}
export default config
