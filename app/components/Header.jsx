import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div id='top' className='w-full border-b border-ink dark:border-darkBorder'>
      <div className='max-w-5xl mx-auto px-5 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-20 animate-rise'>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-darkFocus mb-5'>
              Security Analyst — Portfolio
            </p>
            <h3 className='flex items-end gap-2 text-lg md:text-xl mb-4 font-medium'>
              안녕하세요, 김윤성입니다 <Image src={assets.hand_icon} alt='인사 아이콘' className='w-6'/>
            </h3>
            <h1 className='text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-balance break-keep'>
              정보보안 담당자를<br className='hidden sm:block'/> 목표로 합니다
            </h1>
            <p className='max-w-2xl mt-6 text-pretty break-keep text-sub dark:text-darkSub leading-relaxed'>
            문제나 모르는 것은 찾아서 해결하고, 시작한 것은 끝까지 완수합니다.<br/> IDS 탐지 환경 구축부터 악성코드 분석·탐지 룰 검증까지 보안 문제를 직접 다뤘고,<br/> 이 포트폴리오 사이트도 기획·개발·배포까지 스스로 해냈습니다.</p>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-8'>
              <a href="/kim-yunsung-resume.pdf" download="김윤성_이력서.pdf" aria-label="이력서 다운로드"
                className='px-8 py-3 bg-accent text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity dark:bg-darkFocus'>
              My Resume <Image src={assets.download_icon} alt='다운로드 아이콘' className='w-4'/></a>
              <Link href="/resume" aria-label="이력서 웹으로 보기"
                className='px-8 py-3 border-2 border-ink font-bold text-sm flex items-center gap-2 hover:bg-ink hover:text-white transition-colors dark:border-darkBorder dark:hover:bg-darkText dark:hover:text-darkTheme'>
              웹으로 보기 <span aria-hidden='true'>→</span></Link>
            </div>
          </div>

          <div className='order-first md:order-none w-fit border border-ink dark:border-darkBorder p-1.5'>
            <Image
              src={assets.profile_kys_img}
              alt='김윤성 프로필 사진'
              width={200}
              height={266}
              className='w-[150px] h-[200px] md:w-[200px] md:h-[266px] object-cover'
              sizes='200px'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
