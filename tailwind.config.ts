import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        smMobileY: { raw: "(max-height: 600px)" },
        navMobileX: { raw: "(min-width: 368px) and (max-width: 409px)" },
        smMobileX: { raw: "(max-width: 375px)" },
        chromeMinX: { raw: "(max-width: 512px)"},
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
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      height: {
        calcFoundation: "calc(100svh - 7.05rem)",
        calcFoundation2: "calc(100svh - 5.75rem)",
        calcFoundation3: "calc(20svh - 5.75rem)",
      },
    },
  },
  plugins: [],
};
export default config;
