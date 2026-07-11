import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
      <div>
       <Image src={assets.profile_kys_img} alt='김윤성 프로필 사진' className='rounded-full w-32'/>
      </div>
      <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3'> 
        안녕하세요, 김윤성입니다 <Image src={assets.hand_icon} alt='인사 아이콘' className='w-6'/> </h3>
      <h1 className='text-3xl sm:text-6xl lg:text-[66px] text-balance break-keep'> 정보보안 담당자를 목표로 합니다</h1>
      <p className='max-w-2xl mx-auto text-pretty break-keep'>
      문제나 모르는 것은 찾아서 해결하고, 시작한 것은 끝까지 완수합니다.<br/> IDS 탐지 환경 구축부터 악성코드 분석·탐지 룰 검증까지 보안 문제를 직접 다뤘고,<br/> 이 포트폴리오 사이트도 기획·개발·배포까지 스스로 해냈습니다.</p>
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a href="/kim-yunsung-resume.pdf" download="김윤성_이력서.pdf" aria-label="이력서 다운로드" className='px-10 py-3 border rounded-full
         border-gray-500 flex items-center gap-2 bg-white dark:text-black'>
        My Resume <Image src={assets.download_icon} alt='다운로드 아이콘' className='w-4'/></a>
        <Link href="/resume" aria-label="이력서 웹으로 보기" className='px-10 py-3 border rounded-full
         border-gray-500 flex items-center gap-2'>
        웹으로 보기 <Image src={assets.right_arrow_bold} alt='화살표 아이콘' className='w-4 dark:hidden'/><Image src={assets.right_arrow_bold_dark} alt='화살표 아이콘' className='w-4 hidden dark:block'/></Link>
      </div>
    </div>
  )
}

export default Header
