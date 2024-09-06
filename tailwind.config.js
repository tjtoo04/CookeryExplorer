import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "node_modules/flowbite-qwik/**/*.{cjs,mjs}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  screens: {
    xs: "0px",
    sm: "640px",
    // => @media (min-width: 640px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "1024px",
    // => @media (min-width: 1024px) { ... }

    xl: "1280px",
    // => @media (min-width: 1280px) { ... }

    "2xl": "1536px",
    // => @media (min-width: 1536px) { ... }
  },
  plugins: [flowbitePlugin],
  theme: {
    extend: {
      colors: {
        "sage-green": "#597445",
        "sage-shadow": "#658147",
        "primary-font": "#ccd5ae",
        "light-green": "#E7F0DC",
      },
      animation: {
        "from-left": "slideFromLeft 0.2s 1",
        "from-right": "slideFromRight 0.2s 1",
      },
      keyframes: {
        slideFromLeft: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideFromRight: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
};
