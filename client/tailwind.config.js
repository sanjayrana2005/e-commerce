/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{html,js,s,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "primary-200":"#ffbf00",
        "primary-100":"#ffc929",
        "secondary-200":"#00b050",
        "secondary-100":"#0b1a78"
      },
      screens:{
        XL1444: '1440px'
      }
    },
  },
  plugins: [],
}

