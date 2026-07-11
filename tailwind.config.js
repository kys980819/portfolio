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
        // 스위스 그리드 팔레트 (옵션 B)
        ink:    '#111111', // 라이트 본문·보더
        sub:    '#555555', // 라이트 보조 텍스트
        accent: '#1F3BE0', // 코발트 블루 (유일한 포인트 컬러)
        darkTheme:  '#111111', // 다크 배경
        darkSurface: '#161616', // 다크 패널 배경
        darkText:   '#F5F5F5', // 다크 기본 텍스트
        darkSub:    '#A3A3A3', // 다크 보조 텍스트
        darkBorder: '#F5F5F5', // 다크 보더 (스위스: 보더가 곧 디자인)
        darkFocus:  '#5C6FFF', // 다크 포인트 (코발트 밝힘)
        darkHover:  '#1F1F1F', // 다크 호버 배경
      },
      fontFamily: {
        Outfit: ['var(--font-outfit)', 'sans-serif'],
        Ovo:    ['var(--font-ovo)', 'serif'],
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))',
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
};