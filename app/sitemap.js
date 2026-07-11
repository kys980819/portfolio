import { caseStudySlugs } from '@/assets/caseStudies';

export default function sitemap() {
    // 배포 도메인: 환경변수 없으면 하드코딩 값 사용
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kysportfolio.site';

    return [
      { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }, // 홈 페이지
      ...caseStudySlugs.map((slug) => ({
        url: `${baseUrl}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })), // 프로젝트 케이스 스터디 상세 페이지
    ];
  }