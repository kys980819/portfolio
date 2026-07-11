import { Outfit, Ovo } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Chatbot from "./components/Chatbot";
import { ChatbotProvider } from "./components/ChatbotProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});
const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ovo",
});

export const metadata = {
  metadataBase: new URL('https://kysportfolio.site'),
  title: {
    default: "KYS Portfolio",
    template: "%s | KYS Portfolio",
  },
  description:
    "정보보안 담당자를 목표로 하는 김윤성의 포트폴리오. IDS 탐지 환경 구축, 악성코드 분석·탐지 룰 작성부터 서비스 직접 개발·배포까지, 정보보안을 기반으로 DevSecOps를 지향합니다.",
  keywords: [
    "김윤성",
    "정보보안",
    "포트폴리오",
    "IDS",
    "Snort",
    "탐지 룰",
    "악성코드 분석",
    "DevSecOps",
    "보안관제",
    "SOC",
    "네트워크 보안",
    "IT 운영",
    "신입 보안 엔지니어",
  ],
  openGraph: {
    title: "KYS Portfolio",
    description: "정보보안 담당자를 목표로, DevSecOps를 지향하는 김윤성의 포트폴리오",
    url: "https://kysportfolio.site",
    siteName: "KYS Portfolio",
    images: [
      {
        url: "/Thumbnail.png", // public 폴더 안 이미지
        width: 1200,
        height: 630,
        alt: "KYS Portfolio 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "김윤성",
  url: "https://kysportfolio.site",
  description: metadata.description,
  sameAs: [
    "https://github.com/kys980819",
    "https://velog.io/@kys980819",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script id="theme-init" strategy="beforeInteractive">
          {`
          (function() {
            try {
              var stored = localStorage.getItem('theme');
              var systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              var shouldUseDark = stored === 'dark' || (!stored && systemPrefersDark);
              var root = document.documentElement;
              if (shouldUseDark) root.classList.add('dark'); else root.classList.remove('dark');
            } catch (e) {}
          })();
          `}
        </Script>
      </head>
      <body className={`${outfit.variable} ${ovo.variable} 
      antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-darkText`}>
        <ChatbotProvider>
          {children}
          <Chatbot />
        </ChatbotProvider>
        <Analytics />
      </body>
    </html>
  );
}
