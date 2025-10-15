'use client'

import Chatbot from './Chatbot'
import { useChatbot } from './ChatbotProvider'

const ChatSection = () => {
  const { hasSavedHistory, resetConversation } = useChatbot();
  return (
    <div id='chat' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg'> Chat </h4>
        <h2 className='text-center text-5xl'> Ask me </h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>
        궁금한 점이 있으신가요?<br/> AI가 제 이력서를 기반으로 바로 답해드립니다.
        </p>
        
        {/* 인라인 모드로 중앙 상태의 채팅창 사용 */}
        <div className='max-w-3xl mx-auto'>
          <Chatbot mode="inline" />
        </div>
    </div>
  )
}

export default ChatSection
