/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens:{
      '2xl': {'min': '1921'}
    }
  },
  plugins: [require("daisyui")],
};
