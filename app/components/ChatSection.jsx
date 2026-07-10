'use client'

import Chatbot from './Chatbot'
import SectionHeading from './SectionHeading'

const ChatSection = () => {
  return (
    <div id='chat' className='w-full px-[8%] lg:px-[10%] py-20 scroll-mt-20'>
      <div className='max-w-6xl mx-auto'>
        <SectionHeading kicker='CHAT' title='Ask me' />

        <p className='max-w-2xl mt-5 text-gray-600 dark:text-gray-300 break-keep'>
        보안 직무 지원자 윤성입니다. 이력·기술·프로젝트 어느 것이든 물어보세요. AI가 제 이력서를 기반으로 바로 답해드립니다.
        </p>

        {/* 인라인 모드로 중앙 상태의 채팅창 사용 */}
        <div className='max-w-3xl mx-auto mt-10'>
          <Chatbot mode="inline" />
        </div>
      </div>
    </div>
  )
}

export default ChatSection
