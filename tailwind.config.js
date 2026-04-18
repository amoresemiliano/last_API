/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vegen: {
          dark: '#0a0a0a',
          card: '#161616',
          green: '#22c55e',
        }
      }
    },
  },
  plugins: [],
}
