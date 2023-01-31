/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { colors: { disabled: "text-neutral-500" } },
    fontFamily: { poppins: ["Poppins"] },
  },
  plugins: [],
}
