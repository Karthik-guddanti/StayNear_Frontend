/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          from: "#4f46e5", // Indigo 600
          to: "#9333ea",  // Purple 600
        },
        accent: {
          from: "#06b6d4", // Cyan 500
          to: "#3b82f6",  // Blue 500
        }
      },
    },
  },
  plugins: [],
};