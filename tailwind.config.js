/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xl: { max: '1279px' },
      lg: { max: '1110px' },
      md: { max: '1010px' },
      sm: { max: '600px' }
    },
    extend: {
      colors: {
        mainBgColor: '#E1D4C9',
        secondareBgColor: '#665F55'
      }
    }
  },
  plugins: []
}
