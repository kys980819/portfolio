import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-20 border-t-2 border-ink dark:border-darkBorder'>
      <div className='max-w-5xl mx-auto px-5 lg:px-8 pt-10'>
        <p className='text-sm font-extrabold tracking-tight text-ink dark:text-darkText mb-2'>KYS Portfolio</p>
        <div className='w-max flex items-center gap-2'>
            <Image src={assets.mail_icon} alt='이메일 아이콘' className='w-6 dark:hidden'/>
            <Image src={assets.mail_icon_dark} alt='이메일 아이콘' className='w-6 hidden dark:block'/>
            <a href='mailto:kys980819@gmail.com' aria-label='이메일 보내기' className='text-sm hover:text-accent dark:hover:text-darkFocus transition-colors'>kys980819@gmail.com</a>
        </div>

        <div className='sm:flex items-center justify-between border-t border-ink dark:border-darkBorder mt-10 py-6'>
          <p className='text-sm text-sub dark:text-darkSub'> © {new Date().getFullYear()} Yunsung Kim. All rights reserved.</p>
          <ul className='flex items-center gap-8 mt-4 sm:mt-0 text-xs font-semibold uppercase tracking-[0.08em]'>
              <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/kys980819' aria-label='GitHub 열기(새 탭)' className='hover:text-accent dark:hover:text-darkFocus transition-colors'>GitHub</a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://velog.io/@kys980819' aria-label='블로그 열기(새 탭)' className='hover:text-accent dark:hover:text-darkFocus transition-colors'>Blog</a></li>
              <li><Link href='/resume' aria-label='웹 이력서 보기' className='hover:text-accent dark:hover:text-darkFocus transition-colors'>Resume</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
