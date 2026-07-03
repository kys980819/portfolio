import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
      <div>
       <Image src={assets.profile_kys_img} alt='김윤성 프로필 사진' className='rounded-full w-32'/>
      </div>
      <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3'> 
        안녕하세요, 김윤성입니다 <Image src={assets.hand_icon} alt='인사 아이콘' className='w-6'/> </h3>
      <h1 className='text-3xl sm:text-6xl lg:text-[66px]'> 정보보안 담당자를 목표로 합니다</h1>
      <p className='max-w-2xl mx-auto'>
      모르는 문제는 직접 조사하여 풀어나가는 사람입니다.
      <br/>네트워크·보안 기초부터 탐지 환경 구축, 악성코드 분석,
      <br/>탐지 룰 작성·검증까지 보안관제 한 흐름을 직접 끝까지 돌려봤습니다.
      <br/>끝까지 검증하고 확인하는 태도로, 정보보안 담당자를 목표로 하고 있습니다.</p>
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a href="/kim-yunsung-resume.pdf" download="김윤성_이력서.pdf" aria-label="이력서 다운로드" className='px-10 py-3 border rounded-full
         border-gray-500 flex items-center gap-2 bg-white dark:text-black'> 
        My Resume <Image src={assets.download_icon} alt='다운로드 아이콘' className='w-4'/></a>
      </div>
    </div>
  )
}

export default Header
