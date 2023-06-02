/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{ts,tsx,less,css}'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
    boxShadow: {
      1: 'var(--box-shadow-1)',
      2: 'var(--box-shadow-2)',
      3: 'var(--box-shadow-3)',
      4: 'var(--box-shadow-4)',
    },
    textColor: (theme) => ({
      ...theme('colors'),
      'color-1': 'var(--text-color-1)',
      'color-2': 'var(--text-color-2)',
      'color-3': 'var(--text-color-3)',
      'color-4': 'var(--text-color-4)',
      'primary-1': 'var(--primary-1)',
      'primary-2': 'var(--primary-2)',
      'primary-3': 'var(--primary-3)',
      'primary-4': 'var(--primary-4)',
      'white-1': 'var(--white-1)',
      'white-2': 'var(--white-2)',
      'color-warning': 'var(--o50)',
    }),
    borderColor: (theme) => ({
      ...theme('colors'),
      1: 'var(--border-color-1)',
      2: 'var(--border-color-2)',
      3: 'var(--border-color-3)',
      4: 'var(--border-color-4)',
      tint: 'var(--line-tint)',
      deep: 'var(--line-deep)',
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      1: 'var(--bg-1)',
      2: 'var(--bg-2)',
      3: 'var(--bg-3)',
      4: 'var(--bg-4)',
      5: 'var(--bg-5)',
      transparent: 'transparent',
      'fill-1': 'var(--fill-1)',
      'fill-2': 'var(--fill-2)',
      'fill-3': 'var(--fill-3)',
      'fill-4': 'var(--fill-4)',
    }),
    fontSize: {
      xs: ['12px', '18px'],
      sm: ['14px', '22px'],
      base: ['16px', '24px'],
      lg: ['18px', '26px'],
      xl: ['20px', '28px'],
    },
  },
  plugins: [],
  important: true,
}

