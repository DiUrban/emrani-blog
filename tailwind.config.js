/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('@tailwindcss/line-clamp')],
  theme: {
    extend: {
      screens: {
        xs: '319px', // min-width
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(260,80%,30%)',
          100: 'hsl(260,15%,90%)',
          200: 'hsl(260,30%,85%)',
          300: 'hsl(260,30%,55%)',
          400: 'hsl(260,35%,50%)',
          500: 'hsl(260,60%,45%)',
          600: 'hsl(260,65%,40%)',
          700: 'hsl(260,70%,35%)',
          800: 'hsl(260,75%,30%)',
          900: 'hsl(260,80%,25%)',
          1000: 'hsl(260,90%,5%)',
        },
      },
    },
  },
  plugins: [],
}
