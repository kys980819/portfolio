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
        icon: assets.web_icon,
        title: '포트폴리오 사이트 (AI 챗봇 포함)',
        description: '이력서·자소서 기반으로 대화하는 AI 챗봇이 포함된 개인 포트폴리오 웹사이트',
        period: '2025.09 ~ 2025.10 (지속 개선 중)',
        techStack: ['Next.js', 'React', 'MongoDB', 'OpenAI API', 'Vercel', 'AWS EC2'],
        highlights: [
            'GPT-4.1 기반 AI 챗봇 구현 (MongoDB로 대화 저장)',
            '텔레그램 알림 연동',
            'GitHub Actions CI/CD + 커스텀 도메인·HTTPS',
        ],
        troubleshooting: 'Flask 백엔드 → Next.js API 라우트로 마이그레이션하여 프론트·백엔드를 단일 프로젝트로 통합. 배포 구조 단순화와 콜드스타트 제거 달성.',
        link: 'https://kysportfolio.site'
    },
    {
        icon: assets.code_icon,
        title: '악성코드 분석 실습',
        description: '정적·동적 분석 도구를 활용한 악성코드 샘플 분석 실습',
        period: '2025.10 ~ 진행 중',
        techStack: ['VirusTotal', '정적 분석', '동적 분석'],
        highlights: [
            '실제 악성코드 샘플 1개 분석 완료',
            '분석 흐름(수집→정적→동적→보고) 체득',
            '학습 내용 벨로그에 발행',
        ],
        troubleshooting: '',
        link: 'https://velog.io/@kys980819'
    }
];

export const infoList = [
    {
        icon: Target,
        title: '끝까지 해내는 실행력',
        description: '기획부터 배포까지 독학으로 완성'
    },
    {
        icon: ClipboardCheck,
        title: '절차와 기준 중심',
        description: '매뉴얼 기반 업무 1년 수행'
    },
    {
        icon: TrendingUp,
        title: '꾸준한 학습 태도',
        description: '자격증·실습 병행 중'
    }
];
