import { Mail } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-20 border-t border-lightBorder dark:border-darkBorder'>
      <div className='text-center pt-12'>
        <a href='#top' aria-label='홈으로 이동' className='font-mono text-2xl font-bold tracking-tight text-lightInk dark:text-white'>
          <span className='text-accentDark dark:text-accent'>[</span>kys<span className='text-accentDark dark:text-accent'>]</span>
        </a>
        <div className='w-max flex items-center gap-2 mx-auto mt-4 font-mono text-sm'>
            <Mail className='w-5 h-5 text-accentDark dark:text-accent' aria-hidden />
            <a href='mailto:kys980819@gmail.com' aria-label='이메일 보내기' className='hover:text-accentDark dark:hover:text-accent transition-colors'>kys980819@gmail.com</a>
        </div>
      </div>

      <div className='text-center sm:flex items-center justify-between border-t border-lightBorder dark:border-darkBorder mx-[10%] mt-12 py-6 font-mono text-sm text-gray-500 dark:text-gray-400'>
        <p> © {new Date().getFullYear()} Yunsung Kim. All rights reserved.</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/kys980819' aria-label='GitHub 열기(새 탭)' className='hover:text-accentDark dark:hover:text-accent transition-colors'>GitHub</a></li>
            <li><a target='_blank' rel='noopener noreferrer' href='https://velog.io/@kys980819' aria-label='블로그 열기(새 탭)' className='hover:text-accentDark dark:hover:text-accent transition-colors'>Blog</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
