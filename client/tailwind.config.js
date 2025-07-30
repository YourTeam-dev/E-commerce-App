/ @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src//*.{js,jsx,ts,tsx}", // Tells Tailwind to scan all React component files
  ],
  theme: {
    extend: {}, // You can extend Tailwind's default theme here
  },
  plugins: [], // Add plugins here if needed
}