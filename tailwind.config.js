/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
console.log(colors)

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx,js,jsx}"],
  content: ['./src/**/*.{ts,tsx,less,css}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

