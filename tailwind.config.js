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
        // 포인트 색 — 시안 1색 (다크/라이트 각각 대비 확보)
        accent:     '#22D3EE', // 밝은 시안 (다크 배경·보더·강조)
        accentDark: '#0E7490', // 진한 시안 (라이트 배경 위 텍스트 대비 4.5:1)
        accentAmber: '#F59E0B', // 보조 앰버 (태그 소량)

        // 라이트 UI
        lightBg:     '#F8FAFC',
        lightSurface:'#FFFFFF',
        lightBorder: '#E2E8F0',
        lightInk:    '#0F172A',
        lightHover:  '#F1F5F9',

        // 다크 UI — 애널리스트 콘솔 팔레트
        darkTheme:  '#0A0E14', // 배경
        darkSurface:'#101623', // 카드/패널 배경
        darkText:   '#CBD5E1', // 기본 텍스트
        darkBorder: '#1E293B', // 보더/디바이더
        darkFocus:  '#22D3EE', // 포커스/하이라이트
        darkHover:  '#161E2A', // 호버 배경
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'panel': '0 1px 2px rgba(0,0,0,0.04)',
        'accent': '0 0 0 1px rgba(34,211,238,0.4), 0 8px 30px rgba(34,211,238,0.08)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        revealUp: 'revealUp 0.6s ease-out both',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))',
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
};
