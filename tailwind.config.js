/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
console.log(colors)

module.exports = {
  content: ['./src/**/*.{ts,tsx,less,css}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

