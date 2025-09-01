/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    extend: {
      colors: {
        lightHover: '#fcf4ff',
        darkHover:  '#2a004a',
        darkTheme:  '#11001F',
      },
      fontFamily: {
        Outfit: ['var(--font-outfit)', 'sans-serif'],
        Ovo:    ['var(--font-ovo)', 'serif'],
      },
      boxShadow: {
        'black' : '4px 4px #000',
        'white' : '4px 4px #fff',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))',
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
};