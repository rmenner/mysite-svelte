/** @type {import('tailwindcss').Config}*/
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ["Lato", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        rocket: "rocket 4s ease infinite",
        "rocket-wiggle": "rocket-wiggle 1s ease infinite",
      },
      keyframes: {
        rocket: {
          "0%": { transform: "translateY(0px)" },
          "25%": { transform: "translateY(-15px)" },
          "50%": { transform: "translateY(-5px)" },
          "75%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "rocket-wiggle": {
          "0%": { transform: "translateY(1px) rotate(-3deg)" },
          "25%": { transform: "translateY(-8px)" },
          "50%": { transform: "translateY(-2px) rotate(3deg)" },
          "75%": { transform: "translateY(-8px)" },
          "100%": { transform: "translateY(0px) rotate(-3deg)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            ul: {
              "list-style": "none",
              position: "relative",
              "margin-top": "1.5em",
              "margin-left": "1em",
              "padding-top": "0",
              "padding-left": "1.2em",
              "border-left":
                "2px solid rgb(13 148 136 / var(--tw-text-opacity))",
            },
            "ul li": {
              "line-height": "1.3em",
              margin: "1em 0",
            },
          },
        },
      },
    },
  },

  plugins: [forms, typography],
};

module.exports = config;
