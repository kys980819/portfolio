"use client";

import { useEffect, useRef, useState } from "react";
import { useChatbot } from "./ChatbotProvider";

export default function Chatbot({ mode = "floating" }) {
	const [isOpen, setIsOpen] = useState(mode === "inline");
	const { messages, setMessages, listRef } = useChatbot();
	const [input, setInput] = useState("");
	const panelRef = useRef(null);

	useEffect(() => {
		if (!listRef?.current) return;
		listRef.current.scrollTop = listRef.current.scrollHeight;
	}, [messages, isOpen]);

	useEffect(() => {
		function onKeyDown(e) {
			if (e.key === "Escape") setIsOpen(false);
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	function toggle() {
		if (mode === "inline") return;
		setIsOpen((v) => !v);
	}

async function handleSubmit(e) {
  e.preventDefault();
  const trimmed = input.trim();
  if (!trimmed) return;

  // 1) 사용자 메시지 화면에 추가
  const userMsg = { role: "user", content: trimmed };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  try {
    // 2) Flask로 전송 (기본형 fetch)
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
        ? data.response // ex) "Message received: 안녕"
        : (data?.error || "요청 처리 중 오류가 발생했습니다.");

    setMessages((prev) => [...prev, { role: "assistant", content: text }]);
  } catch (err) {
    // 네트워크/서버 다운 등
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "서버에 연결할 수 없습니다." },
    ]);
  }
}

	return (
		<div aria-live="polite">
			{mode === "floating" && (
				<button
					onClick={toggle}
					aria-expanded={isOpen}
					aria-controls="chatbot-panel"
					title={isOpen ? "닫기" : "챗봇 열기"}
					className="fixed right-4 bottom-4 z-50 rounded-full bg-black text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black w-14 h-14 flex items-center justify-center"
				>
					<span className="sr-only">Chatbot</span>
					{/* 간단한 말풍선 아이콘 */}
					<svg
						width="26"
						height="26"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20 2H4a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
							fill="currentColor"
						/>
					</svg>
				</button>
			)}

			{isOpen && (
				<div
					id="chatbot-panel"
					ref={panelRef}
					className={
						mode === "floating"
							? "fixed right-4 bottom-20 z-50 w-[320px] sm:w-[380px] max-h-[70vh] flex flex-col bg-gray-50 text-gray-900 border border-gray-300 rounded-xl shadow-2xl overflow-hidden"
							: "w-full max-w-3xl mx-auto my-6 h-[70vh] flex flex-col bg-gray-50 text-gray-900 border border-gray-300 rounded-xl shadow-lg overflow-hidden"
					}
					role="dialog"
					aria-label="채팅 상담"
				>
					<header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
						<div className="font-semibold">도움이 필요하신가요?</div>
						{mode === "floating" && (
							<button
								onClick={() => setIsOpen(false)}
								className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
								title="닫기"
							>
								<span className="sr-only">닫기</span>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
								</svg>
							</button>
						)}
					</header>

					<ul ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
						{messages.map((m, i) => (
							<li key={i} className={m.role === "assistant" ? "text-left" : "text-right"}>
								<span
									className={
										"inline-block px-3 py-2 rounded-lg leading-relaxed " +
										(m.role === "assistant"
											? "bg-gray-100 text-gray-900"
											: "bg-black text-white")
									}
								>
									{m.content}
								</span>
							</li>)
						)}
					</ul>

					<form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-gray-50">
						<label htmlFor="chatbot-input" className="sr-only">메시지 입력</label>
						<div className="flex items-center gap-2">
							<input
								id="chatbot-input"
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="메시지를 입력하세요..."
								className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
							/>
							<button
								type="submit"
								className="rounded-md bg-black text-white px-3 py-2 text-sm hover:opacity-90 disabled:opacity-50"
								disabled={!input.trim()}
							>
								전송
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}


