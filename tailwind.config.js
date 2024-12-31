module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Ensures Tailwind scans all your React files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('daisyui'),  
  ],
}
