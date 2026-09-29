/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/**/*.{js,jsx}", // learningLog.js 등 데이터 파일의 Tailwind 클래스 문자열 수집
  ],
   theme: {
    extend: {
      colors: {
        // 라이트 관제 대시보드 팔레트 (옵션 C)
        pageBg:  '#F4F6F9', // 페이지 배경
        panel:   '#FFFFFF', // 패널 배경
        line:    '#E3E8EF', // 보더/디바이더
        ink:     '#1C2430', // 본문 잉크
        inkMuted:'#64748B', // 보조 텍스트
        accent:  { DEFAULT: '#1D4ED8', dark: '#6C8CFF' }, // 포인트 블루
        // 상태 색 (상태 칩 전용)
        ok:   { DEFAULT: '#15803D', soft: '#DCFCE7' },
        warn: { DEFAULT: '#92400E', soft: '#FEF3C7' },
        info: { DEFAULT: '#1D4ED8', soft: '#E0EAFB' },
        // 다크 팔레트 (웜 뉴트럴 다크 그레이)
        darkTheme:  '#191B1E', // 배경
        darkSurface: '#22252A', // 카드/패널 배경
        darkText:   '#E8EAED', // 기본 텍스트
        darkMuted:  '#9AA3AF', // 보조 텍스트
        darkBorder: '#33373E', // 보더/디바이더
        darkFocus:  '#6C8CFF', // 포커스/하이라이트
        darkHover:  '#2A2E34', // 호버 배경
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