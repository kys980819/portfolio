'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { href: '/#top', label: 'Home' },
  { href: '/#about', label: 'About me' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#learning-log', label: 'Learning Log' },
  { href: '/#chat', label: 'Chat' },
]

const Navbar = () => {

    const sideMenuRef = useRef();

    const openMenu = ()=>{
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }
    const closeMenu = ()=>{
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    setIsDark(root.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const root = document.documentElement
    const next = !root.classList.contains('dark')
    if (next) {
      root.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      root.classList.remove('dark')
      localStorage.theme = 'light'
    }
    setIsDark(next)
  }

  return (
    <>
      <nav className='w-full fixed top-0 left-0 z-50 flex items-center justify-between
      px-5 lg:px-8 xl:px-[8%] py-4 bg-white border-b-2 border-ink dark:bg-darkTheme dark:border-darkBorder'>
        <a href='/#top' aria-label="홈으로 이동"
          className='text-sm font-extrabold tracking-tight text-ink dark:text-darkText'>
          KYS Portfolio
        </a>

        <ul className='hidden md:flex items-center gap-7 lg:gap-9 text-xs font-semibold uppercase tracking-[0.08em]'>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className='text-ink hover:text-accent dark:text-darkText dark:hover:text-darkFocus transition-colors'>{label}</a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-4'>

          <button onClick={toggleDark} aria-pressed={isDark} aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}>
            <Image src={isDark ? assets.sun_icon : assets.moon_icon} alt="테마 전환 아이콘" className='w-6'/>
          </button>

          <button className='block md:hidden ml-3' onClick={openMenu} aria-label="메뉴 열기">
            <Image src={isDark ? assets.menu_white : assets.menu_black} alt="메뉴 열기 아이콘" className='w-6'/>
          </button>
        </div>

        {/* 모바일 메뉴 */}

        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50
        h-screen bg-white border-l-2 border-ink transition duration-500 dark:bg-darkTheme dark:border-darkBorder dark:text-darkText
        text-sm font-semibold uppercase tracking-[0.08em]'>

          <button className='absolute right-6 top-6' onClick={closeMenu} aria-label="메뉴 닫기">
              <Image src={isDark ? assets.close_white: assets.close_black} alt="메뉴 닫기 아이콘" className='w-5 cursor-pointer'/>
          </button>

          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a onClick={closeMenu} href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
