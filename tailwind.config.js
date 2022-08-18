/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        silkscreen: ["Silkscreen", "sans-serif"],
        advent: ["Advent Pro", "sans-serif"],
        changa: ["Changa", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        quantico: ["Quantico", "sans-serif"],
        rubik: ["Rubik Mono One", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp", "cursive")],
};
