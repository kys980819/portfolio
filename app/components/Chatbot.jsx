"use client";

import { useChatbot } from "./ChatbotProvider";

export default function Chatbot({ mode = "floating" }) {
	const { 
		messages, 
		isOpen, 
		input, 
		isLoading,
		listRef, 
		panelRef,
		toggleChat, 
		closeChat, 
		handleInputChange, 
		handleSubmit 
	} = useChatbot();

	// 인라인 모드일 때는 항상 열려있음
	const isChatOpen = mode === "inline" ? true : isOpen;

	return (
		<div aria-live="polite">
			{mode === "floating" && (
				<button
					onClick={toggleChat}
					aria-expanded={isOpen}
					aria-controls="chatbot-panel"
					title={isOpen ? "닫기" : "챗봇 열기"}
					className="fixed right-4 bottom-4 z-50 rounded-full bg-black text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black w-14 h-14 flex items-center justify-center dark:bg-white dark:text-black dark:focus:ring-white"
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

			{isChatOpen && (
				<div
					id="chatbot-panel"
					ref={panelRef}
					className={
						mode === "floating"
							? "fixed right-4 bottom-20 z-50 w-[320px] sm:w-[380px] max-h-[70vh] flex flex-col bg-gray-50 text-gray-900 border border-gray-300 rounded-xl shadow-2xl overflow-hidden dark:bg-darkSurface dark:text-darkText dark:border-darkBorder"
							: "w-full max-w-3xl mx-auto my-6 h-[70vh] flex flex-col bg-gray-50 text-gray-900 border border-gray-300 rounded-xl shadow-lg overflow-hidden dark:bg-darkSurface dark:text-darkText dark:border-darkBorder"
					}
					role="dialog"
					aria-label="채팅 상담"
				>
					<header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 dark:bg-transparent dark:border-darkBorder">
						<div className="font-semibold">도움이 필요하신가요?</div>
						{mode === "floating" && (
							<button
								onClick={closeChat}
								className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:hover:bg-white/10 dark:focus:ring-darkFocus"
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
											? "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white"
											: "bg-black text-white dark:bg-white dark:text-black")
									}
								>
									{m.content}
								</span>
							</li>)
						)}
					</ul>

					<form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-gray-50 dark:bg-transparent dark:border-darkBorder">
						<label htmlFor="chatbot-input" className="sr-only">메시지 입력</label>
						<div className="flex items-center gap-2">
							<input
								id="chatbot-input"
								type="text"
								value={input}
								onChange={(e) => handleInputChange(e.target.value)}
								placeholder="메시지를 입력하세요..."
								className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:bg-transparent dark:text-darkText dark:placeholder-white/50 dark:border-darkBorder dark:focus:ring-darkFocus"
								disabled={isLoading}
							/>
							<button
								type="submit"
								className="rounded-md bg-black text-white px-3 py-2 text-sm hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black hover:opacity-90"
								disabled={!input.trim() || isLoading}
							>
								{isLoading ? "전송중..." : "전송"}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}


