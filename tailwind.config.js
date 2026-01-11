/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cream: '#fcfbf9',
        brand: {
          black: '#171717',
          dark: '#262626',
          accent: '#171717',
          muted: '#737373',
          light: '#a3a3a3',
          border: 'rgba(0, 0, 0, 0.1)'
        }
      },
      animation: {
        pulse: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
