/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fadein-fast": "fade-in 0.1s ease-in",
        fadein: "fade-in 0.25s ease-in",
        "fadein-1s": "fade-in 1s ease",
      },
      colors: {
        disabled: "text-neutral-500",
        valero: "#2a6f8a",
        littles: "#b5121b",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
    },
    fontFamily: { poppins: ["Poppins"] },
  },
  plugins: [],
}
