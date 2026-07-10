import React from 'react'

// 터미널 창 타이틀바의 3버튼 장식 (Header 로그 카드·Chatbot 헤더 공용)
const TrafficDots = () => (
  <span className="flex items-center gap-1.5" aria-hidden>
    <span className="w-3 h-3 rounded-full bg-red-400/80" />
    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
    <span className="w-3 h-3 rounded-full bg-green-400/80" />
  </span>
)

export default TrafficDots
