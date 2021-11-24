const colors = require('tailwindcss/colors');

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
          100: '#38a7eb',
          200: '#2990cf',
          500: '#1595e5',
          600: '#0884d1',
          700: '#0972b3',
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
};
