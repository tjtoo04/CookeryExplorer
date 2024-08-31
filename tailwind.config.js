/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "sage-green": "#597445",
        "sage-shadow": "#658147",
        "primary-font": "#ccd5ae",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
