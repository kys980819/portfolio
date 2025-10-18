import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
      <div>
       <Image src={assets.profile_kys_img} alt='' className='rounded-full w-32'/>
      </div>
      <h3 className='flex items-end gap-2 text-x1 md:text-2x1 md-3'> 
        안녕하세요 저는 김윤성 입니다 <Image src={assets.hand_icon} alt='' className='w-6'/> </h3>
      <h1 className='text-3xl sm:text-6xl lg:text-[66px]'> 한국에서 it 공부중입니다</h1>
      <p className='max-w-2xl mx-auto'> 
        현재는 웹개발을 기반으로 it 기초 공부중입니다. <br/> 앞으로 클라우드, 정보보안 분야에 대해서 공부 할 예정입니다. </p>
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a href="#sample-resume.pdf" download aria-label="이력서 다운로드" className='px-10 py-3 border rounded-full
         border-gray-500 flex items-center gap-2 bg-white dark:text-black'> 
        My Resume <Image src={assets.download_icon} alt='' className='w-4'/></a>
      </div>
    </div>
  )
}

export default Header
