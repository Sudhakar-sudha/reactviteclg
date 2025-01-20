// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",  // Ensures Tailwind scans all your React files
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     // require('daisyui'),  
//   ],
// }


module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s infinite",
        "fade-in": "fade-in 2s ease-in-out forwards",
        "spin-slow": "spin 12s linear infinite",
        "spin-reverse": "spin-reverse 15s linear infinite",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
      },
      keyframes: {
          float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            textShadow: "0 0 10px #ffffff, 0 0 20px #4f46e5, 0 0 30px #4f46e5",
          },
          "50%": {
            textShadow: "0 0 20px #ffffff, 0 0 30px #4f46e5, 0 0 50px #4f46e5",
          },
        },
      },
    },
  },
  plugins: [],
};


module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
