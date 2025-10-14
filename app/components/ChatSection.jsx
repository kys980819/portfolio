'use client'

import Chatbot from './Chatbot'
import { useChatbot } from './ChatbotProvider'

const ChatSection = () => {
  const { hasSavedHistory, resetConversation } = useChatbot();
  return (
    <section id='chat' className='w-full px-[12%] py-20 scroll-mt-10 bg-gray-50 dark:bg-darkTheme'>
      <div className='text-center mb-8'>
        <h2 className='text-5xl font-bold mb-5 text-gray-900 dark:text-white'>
          함께 이야기해요
        </h2>
        <p className='max-w-2xl mx-auto text-gray-600 dark:text-white/80'>
          궁금한 점이 있으시거나 프로젝트에 대해 더 자세히 알고 싶으시다면<br/>
          언제든지 편하게 메시지를 남겨주세요!
        </p>
      </div>
      
      {/* 인라인 모드로 중앙 상태의 채팅창 사용 */}
      <div className='max-w-3xl mx-auto'>
        <Chatbot mode="inline" />
      </div>
    </section>
  )
}

export default ChatSection
