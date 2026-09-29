import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div id='top' className='w-11/12 max-w-5xl mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 pt-24 lg:pt-16'>
      <div className='flex flex-1 flex-col items-center lg:items-start text-center lg:text-left gap-4'>
        <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-1'>
          안녕하세요, 김윤성입니다 <Image src={assets.hand_icon} alt='인사 아이콘' className='w-6'/> </h3>
        <h1 className='text-3xl sm:text-5xl lg:text-[52px] font-bold leading-tight text-balance break-keep'> 정보보안 담당자를 목표로 합니다</h1>
        <p className='max-w-2xl text-pretty break-keep text-inkMuted dark:text-darkMuted'>
        문제나 모르는 것은 찾아서 해결하고, 시작한 것은 끝까지 완수합니다.<br/> IDS 탐지 환경 구축부터 악성코드 분석·탐지 룰 검증까지 보안 문제를 직접 다뤘고,<br/> 이 포트폴리오 사이트도 기획·개발·배포까지 스스로 해냈습니다.</p>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
          <a href="/kim-yunsung-resume.pdf" download="김윤성_이력서.pdf" aria-label="이력서 다운로드" className='px-8 py-3 rounded-lg
           border border-line bg-panel text-ink flex items-center gap-2 font-medium'>
          My Resume <Image src={assets.download_icon} alt='다운로드 아이콘' className='w-4'/></a>
          <Link href="/resume" aria-label="이력서 웹으로 보기" className='px-8 py-3 rounded-lg
           bg-accent text-white flex items-center gap-2 font-medium dark:bg-accent-dark dark:text-darkTheme'>
          웹으로 보기 <Image src={assets.right_arrow_bold_dark} alt='화살표 아이콘' className='w-4 dark:hidden'/><Image src={assets.right_arrow_bold} alt='화살표 아이콘' className='w-4 hidden dark:block'/></Link>
        </div>
      </div>

      <div className='w-full max-w-[260px] shrink-0'>
        <div className='rounded-lg border border-line bg-panel overflow-hidden shadow-sm dark:border-darkBorder dark:bg-darkSurface'>
          <div className='flex items-center justify-between border-b border-line px-4 py-2.5 dark:border-darkBorder'>
            <span className='font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>Analyst Profile</span>
            <span className='rounded bg-info-soft px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-info dark:bg-blue-900/45 dark:text-blue-300'>ACTIVE</span>
          </div>
          <div className='p-3'>
            <Image src={assets.profile_kys_img} alt='김윤성 프로필 사진' className='w-full rounded-md'/>
          </div>
          <div className='border-t border-line px-4 pt-3 pb-2 dark:border-darkBorder'>
            <p className='font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>Activity</p>
            <svg viewBox='0 0 240 44' preserveAspectRatio='none' aria-hidden='true' className='mt-1 h-10 w-full'>
              <polyline points='0,34 24,31 48,33 72,23 96,27 120,14 144,20 168,9 192,16 216,6 240,11'
                fill='none' strokeWidth='2' className='stroke-accent dark:stroke-accent-dark' vectorEffect='non-scaling-stroke'/>
              <polygon points='0,34 24,31 48,33 72,23 96,27 120,14 144,20 168,9 192,16 216,6 240,11 240,44 0,44'
                stroke='none' className='fill-accent/10 dark:fill-accent-dark/10'/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
