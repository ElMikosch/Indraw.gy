/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens:{
        '3xl': "2000px"
      }
    },
  },
  plugins: [require("daisyui")],
};
