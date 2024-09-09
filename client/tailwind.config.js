/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px'
      }
    },
  },
  plugins: [],
}

