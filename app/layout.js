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
  title: "Portfolio-KYS",
  description: "",
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
