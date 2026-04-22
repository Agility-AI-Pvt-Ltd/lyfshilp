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
        // ✨ Added for "Coming Soon"
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fxFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -2%) scale(1.04)" },
        },
        fxGlowPulse: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
        fxFadeInUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fxTick: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        scrollRightToLeft: "scrollRightToLeft 20s linear infinite",
        scrollLoop: "scrollRightToLeft 40s linear infinite",
        // ✨ Added new fade-in animation
        fadeIn: "fadeIn 1.2s ease-out forwards",
        fxFloat: "fxFloat 22s ease-in-out infinite",
        fxGlowPulse: "fxGlowPulse 6s ease-in-out infinite",
        fxFadeInUp: "fxFadeInUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        fxTick: "fxTick 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
