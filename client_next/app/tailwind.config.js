/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./srcs/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss,sass}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'steam-logo': "url('/steam-logo.png')",
      }
    },
  },
  plugins: [],
}

