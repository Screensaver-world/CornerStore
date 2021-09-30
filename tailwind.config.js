const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#242424",
        main: "#121212",
        "text-base": "white",
        "primary-start": "#FCA963",
        "primary-stop": "#FD4857",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
