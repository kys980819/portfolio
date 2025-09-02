"use client";
import { createContext, useContext, useMemo, useState, useRef, useEffect } from "react";

const ChatbotContext = createContext(null);

export function ChatbotProvider({ children }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const value = useMemo(() => ({ messages, setMessages, listRef }), [messages]);
  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error("useChatbot must be used within ChatbotProvider");
  return ctx;
}


