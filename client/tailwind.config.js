const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#00bcd4',
        secondary: '#ff9800',
        accent: {
          100: '#c9edff',
          200: '#ade4ff',
          500: '#15a5d6',
          600: '#1EBAEF',
          700: '#0e95c2',
        },
        'warm-gray': colors.warmGray,
        teal: colors.teal,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
