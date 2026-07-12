"use client";

import { useRef, useEffect } from "react";
import { useChatbot } from "./ChatbotProvider";

// 빈 대화창에서 첫 질문을 유도하는 추천 질문 칩
const SUGGESTED_QUESTIONS = [
	"김윤성님은 어떤 사람인가요?",
	"어떤 프로젝트를 해봤나요?",
	"트러블슈팅 경험이 궁금해요",
];

export default function Chatbot({ mode = "floating" }) {
	const {
		messages,
		isOpen,
		input,
		isLoading,
		toggleChat,
		closeChat,
		handleInputChange,
		handleSubmit,
		sendMessage,
		hasSavedHistory,
		isBannerDismissed,
		dismissBanner,
		resetConversation
	} = useChatbot();

	// 인라인 모드일 때는 항상 열려있음
	const isChatOpen = mode === "inline" ? true : isOpen;

	// 인스턴스별 로컬 ref — 플로팅/인라인 두 창이 독립적으로 스크롤되도록
	const listRef = useRef(null);
	const panelRef = useRef(null);

	// 자동 스크롤: 메시지 추가·복원 시, 그리고 (플로팅) 창을 열 때 맨 아래로
	useEffect(() => {
		if (!isChatOpen || !listRef.current) return;
		listRef.current.scrollTop = listRef.current.scrollHeight;
	}, [messages, isLoading, isChatOpen]);

	const panelId = mode === "floating" ? "chatbot-panel-floating" : "chatbot-panel-inline";

	return (
		<div aria-live="polite">
			{mode === "floating" && (
				<button
					onClick={toggleChat}
					aria-expanded={isOpen}
					aria-controls="chatbot-panel-floating"
					aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
					title={isOpen ? "닫기" : "챗봇 열기"}
					className="fixed right-4 bottom-4 z-50 rounded-full bg-accent text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent w-14 h-14 flex items-center justify-center dark:bg-accent-dark dark:text-darkTheme dark:focus:ring-accent-dark"
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
					id={panelId}
					ref={panelRef}
					className={
						mode === "floating"
							? "fixed right-4 bottom-20 z-50 w-[340px] sm:w-[460px] lg:w-[560px] h-[520px] sm:h-[620px] max-h-[80vh] flex flex-col bg-panel text-ink border border-line rounded-lg shadow-2xl overflow-hidden dark:bg-darkSurface dark:text-darkText dark:border-darkBorder"
							: "w-full max-w-3xl mx-auto my-6 h-[70vh] flex flex-col bg-panel text-ink border border-line rounded-lg shadow-lg overflow-hidden dark:bg-darkSurface dark:text-darkText dark:border-darkBorder"
					}
					role="dialog"
					aria-label="채팅 상담"
				>
					<header className="flex items-center justify-between px-4 py-3 border-b border-line bg-panel dark:bg-transparent dark:border-darkBorder">
						<div className="font-semibold">도움이 필요하신가요?</div>
						{mode === "floating" && (
						<button
							onClick={closeChat}
							className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:hover:bg-white/10 dark:focus:ring-darkFocus"
							aria-label="챗봇 닫기"
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
											? "bg-pageBg text-ink dark:bg-white/10 dark:text-darkText"
											: "bg-accent text-white dark:bg-accent-dark dark:text-darkTheme")
									}
								>
									{m.content}
								</span>
							</li>)
						)}
						{isLoading && (
							<li className="text-left">
								<span className="inline-block px-3 py-2 rounded-lg leading-relaxed bg-pageBg text-ink dark:bg-white/10 dark:text-darkText">
									<span className="inline-flex gap-1 align-middle" aria-live="polite" aria-label="응답 생성 중">
										<span className="loading-dot animation-delay-0">•</span>
										<span className="loading-dot animation-delay-200">•</span>
										<span className="loading-dot animation-delay-400">•</span>
									</span>
								</span>
							</li>
						)}
					</ul>

					{/* 빈 대화창(인사만 있음)일 때 첫 질문을 유도하는 추천 질문 칩 */}
					{messages.length <= 1 && !isLoading && (
						<div className="px-4 pb-2 flex flex-wrap gap-2 justify-center">
							{SUGGESTED_QUESTIONS.map((q) => (
								<button
									key={q}
									onClick={() => sendMessage(q)}
									className="rounded-md border border-line bg-panel px-3 py-1 text-xs text-ink shadow-sm hover:bg-pageBg dark:border-darkBorder dark:bg-darkTheme dark:text-darkText dark:hover:bg-white/10"
								>
									{q}
								</button>
							))}
						</div>
					)}

					{/* 인풋 바로 위: 이전 대화 복원 안내 배너 (페이지 로드 시 복원된 경우에만, X로 이번 방문 동안 숨김 가능) */}
					{hasSavedHistory && !isBannerDismissed && (
						<div className="px-4 pb-2 text-center">
							<div className="inline-flex items-center gap-2 rounded-md border border-line bg-panel dark:bg-darkTheme dark:border-darkBorder shadow px-3 py-1 text-sm">
								<span className="text-ink dark:text-darkText">이전 대화가 로드되었습니다.</span>
								<button onClick={resetConversation} className="rounded bg-pageBg dark:bg-darkHover text-ink dark:text-darkText px-3 py-0.5 text-xs">새로 시작</button>
								<button onClick={dismissBanner} className="rounded-full p-0.5 text-inkMuted hover:text-ink dark:text-darkMuted dark:hover:text-darkText" aria-label="안내 닫기" title="안내 닫기">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
									</svg>
								</button>
							</div>
						</div>
					)}

					<form onSubmit={handleSubmit} className="p-3 border-t border-line bg-panel dark:bg-transparent dark:border-darkBorder">
						<label htmlFor="chatbot-input" className="sr-only">메시지 입력</label>
						<div className="flex items-center gap-2">
							<input
								id="chatbot-input"
								type="text"
								value={input}
								onChange={(e) => handleInputChange(e.target.value)}
								maxLength={1000}
								placeholder="메시지를 입력하세요..."
								className="flex-1 rounded-md border border-line px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent dark:bg-transparent dark:text-darkText dark:placeholder-white/50 dark:border-darkBorder dark:focus:ring-darkFocus"
								disabled={isLoading}
							/>
							<button
								type="submit"
								className="rounded-md bg-accent text-white px-3 py-2 text-sm hover:opacity-90 disabled:opacity-50 dark:bg-accent-dark dark:text-darkTheme hover:opacity-90"
								aria-label="메시지 전송"
								disabled={!input.trim() || isLoading}
							>
								{isLoading ? "전송중..." : "전송"}
							</button>
						</div>
						<p className="mt-2 text-[11px] text-inkMuted/80 text-center dark:text-darkMuted/80">대화 내용은 답변 품질 개선을 위해 저장될 수 있습니다.</p>
					</form>
				</div>
			)}
		{/* 로딩 점(…) 애니메이션 스타일 */}
		<style jsx>{`
			@keyframes dotFade { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
			.loading-dot { display: inline-block; animation: dotFade 1s infinite ease-in-out; }
			.animation-delay-0 { animation-delay: 0ms; }
			.animation-delay-200 { animation-delay: 200ms; }
			.animation-delay-400 { animation-delay: 400ms; }
		`}</style>
		</div>
	);
}
