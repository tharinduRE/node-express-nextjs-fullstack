/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins:{
    preflight: false
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  important:'#__next'
}
