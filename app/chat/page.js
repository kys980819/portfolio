'use client'
import Chatbot from "../components/Chatbot";

export default function ChatPage() {
  return (
    <main className="min-h-[calc(100vh-120px)] px-[6%] py-10">
      <h1 className="text-3xl font-semibold mb-4">챗봇</h1>
      <p className="text-gray-600 mb-6 dark:text-gray-300">대화형 도움말 페이지입니다.</p>
      <Chatbot mode="inline" />
    </main>
  );
}


