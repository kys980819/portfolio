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
        // 딥 네이비 팔레트 (옵션 A)
        darkTheme:  '#0B1220', // 배경
        darkSurface: '#111827', // 카드/패널 배경
        darkText:   '#E5E7EB', // 기본 텍스트
        darkBorder: '#2A3441', // 보더/디바이더
        darkFocus:  '#60A5FA', // 포커스/하이라이트
        darkHover:  '#1F2937', // 호버 배경
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