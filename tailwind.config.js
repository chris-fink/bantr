/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#2563eb',
        'secondary' : '#dc2626',
        'neutral' : '#9ca3af'
      }
    },
  },
  plugins: [],
}
