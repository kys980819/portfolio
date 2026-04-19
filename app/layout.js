import { Outfit, Ovo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Chatbot from "./components/Chatbot";
import { ChatbotProvider } from "./components/ChatbotProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});
const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ovo",
});

export const metadata = {
  title: {
    default: "KYS Portfolio",
    template: "%s | KYS Portfolio",
  },
  description:
    "보안관제·IT 운영을 준비하는 김윤성의 포트폴리오입니다. 시설보안 경력과 꾸준한 IT 학습을 기반으로 보안 엔지니어를 목표합니다.",
  keywords: [
    "김윤성",
    "보안관제",
    "SOC",
    "정보보안",
    "포트폴리오",
    "시설보안",
    "악성코드 분석",
    "네트워크 보안",
    "IT 운영",
    "신입 보안 엔지니어",
  ],
  openGraph: {
    title: "KYS Portfolio",
    description: "보안관제·IT 운영을 준비하는 김윤성의 포트폴리오",
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

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
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
      antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}>
        <ChatbotProvider>
          {children}
          <Chatbot />
        </ChatbotProvider>
      </body>
    </html>
  );
}
