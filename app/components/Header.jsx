'use client'

import { serviceData } from '@/assets/assets'
import { Download, MessageSquareText } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TrafficDots from './TrafficDots'

// 히어로 로그 카드에 순환 출력할 문자열 — 전부 serviceData의 기존 텍스트(새 문구 생성 없음).
// 콘텐츠 갱신으로 항목이 줄거나 비어도 크래시 없이 존재하는 문자열만 남긴다.
const logLines = [
  serviceData[0]?.troubleshooting,
  serviceData[0]?.highlights?.[3],
  serviceData[2]?.highlights?.[3],
  serviceData[1]?.troubleshooting,
].filter((line) => typeof line === 'string' && line.trim() !== '')

// 로그 카드 타이핑 효과 (CSS + 소량 JS). reduced-motion이면 전체를 즉시 표시.
function useTypedLog(lines) {
  const [done, setDone] = useState([])
  const [current, setCurrent] = useState('')
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (!lines.length) return // 표시할 문구가 없으면 타이핑 자체를 시작하지 않음
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduced(true)
      return
    }

    let lineIdx = 0
    let charIdx = 0
    let timer
    const step = () => {
      const line = lines[lineIdx]
      if (charIdx <= line.length) {
        setCurrent(line.slice(0, charIdx))
        charIdx += 1
        timer = setTimeout(step, 28)
        return
      }
      // 한 줄 완료 → 완료 목록에 넣고 다음 줄
      setDone((prev) => {
        const next = [...prev, line]
        return next.length > 5 ? next.slice(-5) : next
      })
      setCurrent('')
      lineIdx = (lineIdx + 1) % lines.length
      charIdx = 0
      // 한 바퀴 돌면 화면 정리
      if (lineIdx === 0) {
        timer = setTimeout(() => {
          setDone([])
          step()
        }, 1400)
        return
      }
      timer = setTimeout(step, 700)
    }
    timer = setTimeout(step, 500)
    return () => clearTimeout(timer)
  }, [lines])

  return { done, current, reduced }
}

const Prompt = () => (
  <span className="select-none text-accentDark dark:text-accent">analyst@kys</span>
)

const Header = () => {
  const { done, current, reduced } = useTypedLog(logLines)

  return (
    <header
      id="top"
      className="w-full px-[8%] lg:px-[10%] min-h-screen flex items-center pt-28 pb-16 scroll-mt-20"
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* 좌: 텍스트 */}
        <div className="animate-revealUp">
          <p className="font-mono text-sm sm:text-base text-accentDark dark:text-accent">
            <span className="text-gray-400 dark:text-gray-600">$</span> whoami
          </p>

          <h2 className="mt-4 text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 break-keep">
            안녕하세요, 김윤성입니다
          </h2>

          <h1 className="mt-3 text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] text-lightInk dark:text-white break-keep text-balance">
            정보보안 담당자를 목표로 합니다
            <span className="cursor-blink inline-block w-[0.6ch] ml-1 animate-blink text-accentDark dark:text-accent">
              _
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 text-pretty break-keep">
            문제나 모르는 것은 찾아서 해결하고, 시작한 것은 끝까지 완수합니다. IDS 탐지 환경 구축부터 악성코드 분석·탐지 룰 검증까지 보안 문제를 직접 다뤘고, 이 포트폴리오 사이트도 기획·개발·배포까지 스스로 해냈습니다.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="/kim-yunsung-resume.pdf"
              download="김윤성_이력서.pdf"
              aria-label="이력서 다운로드"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-accentDark text-white hover:bg-accentDark/90 dark:bg-accent dark:text-darkTheme dark:hover:bg-accent/90 transition-colors"
            >
              My Resume
              <Download className="w-4 h-4" aria-hidden />
            </a>
            <a
              href="#chat"
              aria-label="챗봇으로 질문하기"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border border-lightBorder text-lightInk hover:border-accentDark hover:text-accentDark dark:border-darkBorder dark:text-darkText dark:hover:border-accent dark:hover:text-accent transition-colors"
            >
              Ask me
              <MessageSquareText className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* 우: 라이브 로그 카드 */}
        <div className="animate-revealUp rounded-xl border border-lightBorder bg-lightSurface shadow-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-lightBorder dark:border-darkBorder">
            <TrafficDots />
            <span className="ml-2 font-mono text-xs text-gray-500 dark:text-gray-400">
              analyst.log
            </span>
          </div>
          <div className="p-4 sm:p-5 font-mono text-[13px] leading-relaxed min-h-[280px] text-gray-700 dark:text-gray-300">
            {reduced ? (
              <ul className="space-y-2">
                {logLines.map((line, i) => (
                  <li key={i} className="break-keep">
                    <Prompt />
                    <span className="text-gray-400 dark:text-gray-600">:~$ </span>
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2">
                {done.map((line, i) => (
                  <li key={i} className="break-keep">
                    <Prompt />
                    <span className="text-gray-400 dark:text-gray-600">:~$ </span>
                    {line}
                  </li>
                ))}
                <li className="break-keep">
                  <Prompt />
                  <span className="text-gray-400 dark:text-gray-600">:~$ </span>
                  {current}
                  <span className="cursor-blink inline-block animate-blink text-accentDark dark:text-accent">
                    ▊
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
