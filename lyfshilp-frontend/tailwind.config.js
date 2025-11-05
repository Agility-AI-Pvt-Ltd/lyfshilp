// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      keyframes: {
        scrollRightToLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // 💨 Faster speed (adjust 20s → speed, lower = faster)
        scrollRightToLeft: "scrollRightToLeft 20s linear infinite",
        scrollLoop: "scrollRightToLeft 40s linear infinite",
      },
    },
  },
  plugins: [],
};
