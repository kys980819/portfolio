import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-20'>
      <div className='text-center'>
        {/* 라이트/다크 로고 자동 전환 */}
        <Image src={assets.logo} alt='KYS Portfolio 로고' className='w-36 mx-auto mb-2 dark:hidden' />
        <Image src={assets.logo_dark} alt='KYS Portfolio 로고' className='w-36 mx-auto mb-2 hidden dark:block' />
        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={assets.mail_icon} alt='이메일 아이콘' className='w-6 dark:hidden'/>
            <Image src={assets.mail_icon_dark} alt='이메일 아이콘' className='w-6 hidden dark:block'/>
            kys980819@gmail.com
        </div>
      </div>

      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
        <p> © 2025 Yunsung Kim. All rights reserved.</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/kys980819' aria-label='GitHub 열기(새 탭)'>GitHub</a></li>
            <li><a target='_blank' rel='noopener noreferrer' href='https://velog.io/@kys980819' aria-label='블로그 열기(새 탭)'>Blog</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
