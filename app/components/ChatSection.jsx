'use client'

import Chatbot from './Chatbot'
import { useChatbot } from './ChatbotProvider'

const ChatSection = () => {
  const { hasSavedHistory, resetConversation } = useChatbot();
  return (
    <div id='chat' className='w-full border-b border-ink dark:border-darkBorder scroll-mt-20'>
        <div className='max-w-5xl mx-auto px-5 lg:px-8 py-16 md:py-20'>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-darkFocus mb-3'>05 — Chat</p>
          <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight'>Ask me</h2>

          <p className='max-w-2xl mt-5 mb-12 text-sub dark:text-darkSub'>
          보안 직무 지원자 윤성입니다.<br/> 이력·기술·프로젝트 어느 것이든 물어보세요.<br/> AI가 제 이력서를 기반으로 바로 답해드립니다.
          </p>

          {/* 인라인 모드로 중앙 상태의 채팅창 사용 */}
          <div className='max-w-3xl'>
            <Chatbot mode="inline" />
          </div>
        </div>
    </div>
  )
}

export default ChatSection
