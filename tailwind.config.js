/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkCyan: "#31c3bd",
        lightCyan: "#65e9e4",
        darkOrange: "#f2b137",
        lightOrange: "#ffc860",
        darkBlack: "#1a2a33",
        lightBlack: "#1f3641",
        offGrey: "#a8b7c9",
        offWhite: "#dbe8ed",
      },
    },
  },
  plugins: [],
};
