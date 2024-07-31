import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { 'min': '350px', 'max': '600px' }, // Custom breakpoint for extra small screens
      },
    },
  },
  plugins: [import("flowbite/plugin")],
});
