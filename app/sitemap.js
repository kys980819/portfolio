export default function sitemap() {
    // 배포 도메인: 환경변수 없으면 하드코딩 값 사용
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kysportfolio.site';
  
    return [
      { url: `${baseUrl}/`, lastModified: new Date() }, // 홈 페이지
    ];
  }