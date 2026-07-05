import { Target, ClipboardCheck, TrendingUp } from 'lucide-react';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import git from './git.png';
import cursor from './cursor.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import profile_kys_img from './profile_kys_img.png';

export const assets = {
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    git,
    cursor,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    profile_kys_img
};

export const serviceData = [
    {
        icon: assets.code_icon,
        title: 'Snort IDS 탐지 환경 구축 + 악성코드 분석 (CEaN.exe / 정보탈취형)',
        description: 'VMware 격리 환경에 Snort 기반 IDS를 직접 구축하고, 정보탈취형 악성코드를 분석해 IOC 기반 탐지 룰을 작성·검증한 메인 프로젝트',
        period: '2026.05.13 ~ 2026.06.05',
        techStack: ['Snort', 'VMware', 'BASE', 'MalwareBazaar', 'Wireshark', 'Process Monitor'],
        highlights: [
            'VMware 격리 환경에 Snort 2.9.2.3 + BASE + MySQL 기반 IDS 탐지 환경 직접 구축 (Windows 미러링 제약을 단일 VM 구조로 재설계, 버전 호환성을 다운그레이드로 해결)',
            '"C2 통신·평문 통신" 두 기준을 직접 세워 MalwareBazaar에서 반복 검증으로 검체(정보탈취형) 선별',
            '기초·정적·동적·네트워크 분석으로 자격증명 수집→평문 SMTP 유출(전송 완료 응답까지)→Run 키 지속성을 실증, 파일·레지스트리·네트워크 IOC 도출 (코드·메모리 단위는 분석 범위 외)',
            'IOC 기반 Snort 룰 작성·BASE 검증',
        ],
        troubleshooting: '탐지 누락 원인을 트래픽→인터페이스→룰 문법→패킷 처리 순으로 좁혀 체크섬 오프로드 문제로 규명, -k none 옵션으로 해결.',
        link: '',
        attachments: [
            { label: 'Snort IDS 탐지 프로젝트 보고서', href: '/reports/snort-ids-report.pdf' },
            { label: '악성코드 분석 보고서 — CEaN.exe (AgentTesla)', href: '/reports/malware-report-cean-agenttesla.pdf' },
        ]
    },
    {
        icon: assets.web_icon,
        title: '포트폴리오 사이트 (AI 챗봇 포함)',
        description: '이력서·자소서 기반으로 대화하는 AI 챗봇이 포함된 개인 포트폴리오 웹사이트',
        period: '지속 개선 중',
        techStack: ['Next.js', 'React', 'MongoDB', 'OpenAI API', 'Vercel', 'AWS EC2'],
        highlights: [
            'gpt-5-mini 기반 AI 챗봇 구현 (MongoDB로 대화 저장)',
            '텔레그램 알림 연동',
            'GitHub Actions CI/CD + 커스텀 도메인·HTTPS',
            'CVE-2025-55182(React Server Components 원격 코드 실행 취약점) 공개 시 영향 버전을 확인해 패치 버전(Next.js 15.5.7)으로 즉시 재배포',
            'Vercel 공급망 침해(서드파티 AI 도구 OAuth 토큰 탈취로 고객 환경변수 노출) 사고 발생 시 영향 가능성을 판단해 환경변수·API 키(OpenAI·MongoDB 등) 전수 교체',
            'Claude Code 기반 보안 점검: /api/sendMessage 요청 속도 제한(rate limit) 적용, 의존성 취약점 정리, /api/health 정보 노출 축소',
        ],
        troubleshooting: 'Flask 백엔드 → Next.js API 라우트로 마이그레이션하여 프론트·백엔드를 단일 프로젝트로 통합. 배포 구조 단순화와 콜드스타트 제거 달성.',
        link: 'https://kysportfolio.site'
    },
    {
        icon: assets.code_icon,
        title: '악성코드 분석 실습 (bton02·dgrep.exe)',
        description: 'VM 격리 환경에서 기초·정적·동적·네트워크 분석 절차를 정립하고 두 검체에 동일하게 적용한 분석 실습',
        techStack: ['VirusTotal', '정적 분석', '동적 분석', 'Snort'],
        highlights: [
            'VM 격리 환경에서 기초·정적·동적·네트워크로 이어지는 분석 절차를 직접 정립, 도구별 분석 노트 양식 설계',
            'bton02 — 트로이목마·다운로더 유형(VirusTotal 기준) 분석',
            'dgrep.exe — 트로이목마·백도어 유형, 이중 패킹(UPX + SVK-Protector) 해제, 자기복제·rundll32 페이로드 로드·Run 키 지속성 규명, C2 통신이 전송 시도 단계임을 판별',
            '네트워크 IOC 기반 Snort 룰 3종(IP / URL content / DNS) 작성',
        ],
        troubleshooting: '',
        link: 'https://velog.io/@kys980819',
        attachments: [
            { label: '악성코드 분석 보고서 — dgrep.exe', href: '/reports/malware-report-dgrep.pdf' },
        ]
    }
];

export const infoList = [
    {
        icon: Target,
        title: '스스로 만드는 구조',
        description: '시설보안 매뉴얼을 자기 방식으로 재정리했고, 악성코드 분석에는 노트 템플릿 13종을 직접 설계해 사용합니다'
    },
    {
        icon: ClipboardCheck,
        title: '꾸준히 쌓아가는 기록',
        description: 'IT 학습 초기부터 개념 정리와 실습 과정을 기술 블로그에 축적해오고 있습니다'
    },
    {
        icon: TrendingUp,
        title: '끝까지 해내는 실행력',
        description: '포트폴리오 사이트를 기획·설계·배포까지 혼자 완성했고, 현재도 운영하며 개선해나가고 있습니다'
    }
];
