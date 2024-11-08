/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      josefin: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
