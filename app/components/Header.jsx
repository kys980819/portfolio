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
      <h1 className='text-3xl sm:text-6xl lg:text-[66px]'> 신입 보안 엔지니어</h1>
      <p className='max-w-2xl mx-auto'> 
        시설보안 현장에서 검증된 실행력과 꾸준한 IT 학습으로,<br/>모르면 찾아서 익히고 끝까지 만들어내는 사람입니다. </p>
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a href="/sample-resume.pdf" download aria-label="이력서 다운로드" className='px-10 py-3 border rounded-full
         border-gray-500 flex items-center gap-2 bg-white dark:text-black'> 
        My Resume <Image src={assets.download_icon} alt='다운로드 아이콘' className='w-4'/></a>
      </div>
    </div>
  )
}

export default Header
