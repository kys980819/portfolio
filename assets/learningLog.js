// 섹션 상단 메타 정보 (헤드라인 수치 바에 사용)
export const learningLogMeta = {
  totalSeries: 5,
  totalPosts: 73,
  period: '2025.09 ~ 현재',
}

// 카테고리별 스타일 (Tailwind 클래스)
// 스위스 그리드 규칙: 포인트 컬러는 코발트 하나 — 카테고리 구분은 색이 아니라 라벨 텍스트로
export const categoryStyles = {
  Security: {
    badge: 'border border-accent text-accent dark:border-darkFocus dark:text-darkFocus',
    accent: 'hover:border-accent dark:hover:border-darkFocus',
  },
  Certification: {
    badge: 'border border-ink text-ink dark:border-darkText dark:text-darkText',
    accent: 'hover:border-accent dark:hover:border-darkFocus',
  },
  'Hands-on': {
    badge: 'border border-ink text-ink dark:border-darkText dark:text-darkText',
    accent: 'hover:border-accent dark:hover:border-darkFocus',
  },
  Foundation: {
    badge: 'border border-ink text-ink dark:border-darkText dark:text-darkText',
    accent: 'hover:border-accent dark:hover:border-darkFocus',
  },
}

// 벨로그 시리즈 데이터
// 배열 순서가 그대로 화면 노출 순서가 됨 (좌→우, 위→아래)
// 채용담당자 시선 동선을 고려해 보안 시리즈를 상단에 배치
// 카드에 postCount / lastUpdated 를 노출하지 않는 디자인 결정에 따라 해당 필드는 제거
export const learningLogSeries = [
  {
    id: 'malware-analysis',
    category: 'Security',
    title: '악성코드 분석 실습',
    description: '악성코드 분석의 개념과 도구를 익히고 샘플 분석을 기록합니다.',
    url: 'https://velog.io/@kys980819/series/%EC%95%85%EC%84%B1%EC%BD%94%EB%93%9C-%EB%B6%84%EC%84%9D',
  },
  {
    id: 'network-security',
    category: 'Security',
    title: '네트워크·보안 기초',
    description: 'OSI·TCP/IP부터 방화벽·IDS/IPS·보안관제까지 체계적으로 학습한 기록입니다.',
    url: 'https://velog.io/@kys980819/series/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88-%EA%B3%B5%EB%B6%80',
  },
  {
    id: 'certification',
    category: 'Certification',
    title: '정보처리기사 (필기 합격)',
    description: '5개 과목 학습 내용 정리와 필기 합격 후기입니다.',
    url: 'https://velog.io/@kys980819/series/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC',
  },
  {
    id: 'portfolio-build',
    category: 'Hands-on',
    title: '포트폴리오 구축 기록',
    description: '이 사이트를 Next.js·AWS·CI/CD로 직접 구축한 22편의 실습 일지입니다.',
    url: 'https://velog.io/@kys980819/series/IT-%EB%8F%84%EC%A0%84-%EB%B0%8F-%EA%B8%B0%EB%A1%9D%EC%8B%A4%EC%8A%B5',
  },
  {
    id: 'web-cs-concepts',
    category: 'Foundation',
    title: '웹·CS 개념 정리',
    description: 'HTTP·DB·클라우드·Git·인증 등 웹 개발·운영에 필요한 개념 30편입니다.',
    url: 'https://velog.io/@kys980819/series/IT-%ED%95%99%EC%8A%B5-%EB%B0%8F-%EC%A0%95%EB%A6%AC%EA%B0%9C%EB%85%90',
  },
]

// 벨로그 메인 URL (섹션 하단 '모든 글 보기' CTA에서 사용)
export const velogMainUrl = 'https://velog.io/@kys980819'
