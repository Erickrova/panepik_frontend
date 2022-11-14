/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html','./src/**/*.{jsx,js,css,ts,tsx}'],
  theme: {
    extend: {
    
    },
    fontFamily: {
      'roboto':['Roboto', 'sans-serif'],
      'montserrat':['Montserrat', 'sans-serif']
    }
  },
  plugins: [],
}
