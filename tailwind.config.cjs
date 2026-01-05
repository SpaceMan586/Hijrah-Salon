/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        salon: {
          light: '#FFF3F3',
          pink: '#FAACD7',
        }
      },
      backgroundImage: {
        'salon-gradient': 'linear-gradient(to bottom, #FFF3F3, #FAACD7)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}