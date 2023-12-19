/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        darkRed: "#4d0000"
      }
    },
  },
  plugins: [],
}

