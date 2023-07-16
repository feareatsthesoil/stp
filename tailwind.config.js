/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      screens: {
        smMobileY: { raw: "(max-height: 600px)" },
        smMobileX: { raw: "(max-width: 375px)" },
      },
    },
  },
  plugins: [],
};
