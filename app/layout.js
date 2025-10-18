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
  description: "윤성의 개발 포트폴리오 웹사이트입니다.",
  keywords: ["윤성", "KYS", "포트폴리오", "Next.js", "클라우드", "AI","정보보안","클라우드 보안"],
  openGraph: {
    title: "KYS Portfolio",
    description: "Next.js 기반의 포트폴리오 웹사이트",
    url: "https://kysportfolio.site",
    siteName: "KYS Portfolio",
    images: [
      {
        url: "/thumbnail.png", // public 폴더 안 이미지
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
