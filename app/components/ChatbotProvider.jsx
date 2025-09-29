"use client";
import { createContext, useContext, useMemo, useState, useRef, useEffect } from "react";

const ChatbotContext = createContext(null);

export function ChatbotProvider({ children }) {
  // === 중앙 집중식 상태 관리 ===
  const [messages, setMessages] = useState([
    { role: "assistant", content: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // === Refs ===
  const listRef = useRef(null);
  const panelRef = useRef(null);

  // === 자동 스크롤 관리 ===
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  // === 키보드 이벤트 관리 ===
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // === API 호출 로직 ===
  const sendMessage = async (messageInput) => {
    const trimmed = messageInput.trim();
    if (!trimmed) return;

    setIsLoading(true);
    
    // 1) 사용자 메시지 화면에 추가
    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      // 2) Flask로 전송
      const res = await fetch("http://127.0.0.1:5000/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      // 3) 응답 JSON 파싱
      const data = await res.json();
      console.log("서버에서 받은 응답 전체:", data);
      console.log("서버가 보낸 메시지:", data.response);

      // 4) 성공/실패에 따라 보이는 메시지
      const text =
        res.ok && data?.ok
          ? data.response
          : (data?.error || "요청 처리 중 오류가 발생했습니다.");

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (err) {
      // 네트워크/서버 다운 등
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "서버에 연결할 수 없습니다." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // === UI 제어 함수들 ===
  const toggleChat = () => setIsOpen((prev) => !prev);
  const closeChat = () => setIsOpen(false);
  const openChat = () => setIsOpen(true);
  
  const handleInputChange = (value) => setInput(value);
  const clearInput = () => setInput("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
  };

  // === Context Value ===
  const value = useMemo(() => ({
    // 상태
    messages,
    isOpen,
    input,
    isLoading,
    
    // Refs
    listRef,
    panelRef,
    
    // 함수들
    sendMessage,
    toggleChat,
    closeChat,
    openChat,
    handleInputChange,
    clearInput,
    handleSubmit,
    
    // 직접 상태 변경 (필요시)
    setMessages,
    setIsOpen,
    setInput,
  }), [messages, isOpen, input, isLoading]);

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error("useChatbot must be used within ChatbotProvider");
  return ctx;
}


