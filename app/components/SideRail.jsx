'use client'

import React, { useEffect, useState } from 'react'

// 데스크톱(lg 이상) 전용 보조 앵커 레일 — 상단 네비를 대체하지 않는 부가 요소
const railItems = [
  { id: 'top', no: '01', label: 'Home' },
  { id: 'about', no: '02', label: 'About me' },
  { id: 'skills', no: '03', label: 'Skills' },
  { id: 'projects', no: '04', label: 'Projects' },
  { id: 'learning-log', no: '05', label: 'Learning Log' },
  { id: 'chat', no: '06', label: 'Chat' },
]

const SideRail = () => {
  const [activeId, setActiveId] = useState('top')

  useEffect(() => {
    const sections = railItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      // 화면 세로 중앙 부근을 지나는 섹션을 활성으로 판정
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label='섹션 바로가기 레일'
      className='hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-1.5
      rounded-lg border border-line bg-panel p-1.5 shadow-sm dark:border-darkBorder dark:bg-darkSurface'
    >
      {railItems.map(({ id, no, label }) => (
        <a
          key={id}
          href={`/#${id}`}
          title={label}
          aria-label={label}
          aria-current={activeId === id ? 'true' : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-md font-mono text-[11px] font-bold transition-colors ${
            activeId === id
              ? 'bg-accent text-white dark:bg-accent-dark dark:text-darkTheme'
              : 'text-inkMuted hover:bg-pageBg hover:text-ink dark:text-darkMuted dark:hover:bg-darkHover dark:hover:text-darkText'
          }`}
        >
          {no}
        </a>
      ))}
    </nav>
  )
}

export default SideRail
