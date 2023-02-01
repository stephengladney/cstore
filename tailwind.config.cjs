/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: { fadein: "fade-in 0.25s ease-in" },
      colors: { disabled: "text-neutral-500", valero: "#2a6f8a" },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
    },
    fontFamily: { poppins: ["Poppins"] },
  },
  plugins: [],
}
