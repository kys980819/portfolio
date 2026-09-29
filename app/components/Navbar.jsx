'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {

    const [isScroll, setIsScroll] = useState(false)
    const sideMenuRef = useRef();

    const openMenu = ()=>{
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }
    const closeMenu = ()=>{
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(()=>{
        const handleScroll = ()=>{
          if(window.scrollY > 50){
              setIsScroll(true)
          }else{
              setIsScroll(false)
          }
        }
        window.addEventListener('scroll', handleScroll)
        return ()=> window.removeEventListener('scroll', handleScroll)
    },[])

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
      <nav className={`w-full fixed top-0 px-5 lg:px-8 xl:px-[8%] py-3
      flex items-center justify-between z-50 bg-panel border-b border-line
      dark:bg-darkSurface dark:border-darkBorder ${isScroll ? "shadow-sm" : ""}`}>
        <a href='/#top' aria-label="홈으로 이동">
          <Image src={isDark ? assets.logo_dark : assets.logo} alt="KYS Portfolio 로고" className='w-28 cursor-pointer mr-14'/>
        </a>

        <ul className='hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-ink dark:text-darkText'>
          <li><a href="/#top">Home</a></li>
          <li><a href="/#about">About me</a></li>
          <li><a href="/#skills">Skills</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/#learning-log">Learning Log</a></li>
          <li><a href="/#chat">Chat</a></li>
        </ul>

        <div className='flex items-center gap-4'>

          <span className='hidden lg:inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-ok dark:text-emerald-400' aria-hidden='true'>
            <span className='inline-block h-2 w-2 rounded-full bg-ok dark:bg-emerald-400'></span>
            MONITORING
          </span>

          <button onClick={toggleDark} aria-pressed={isDark} aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}>
            <Image src={isDark ? assets.sun_icon : assets.moon_icon} alt="테마 전환 아이콘" className='w-6'/>
          </button>

          <button className='block md:hidden ml-3' onClick={openMenu} aria-label="메뉴 열기">
            <Image src={isDark ? assets.menu_white : assets.menu_black} alt="메뉴 열기 아이콘" className='w-6'/>
          </button> 
        </div>

        {/* 모바일 메뉴 */}

        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50
        h-screen bg-panel border-l border-line transition duration-500 dark:bg-darkSurface dark:border-darkBorder dark:text-darkText'>

          <button className='absolute right-6 top-6' onClick={closeMenu} aria-label="메뉴 닫기">
              <Image src={isDark ? assets.close_white: assets.close_black} alt="메뉴 닫기 아이콘" className='w-5 cursor-pointer'/>
          </button>

          <li><a onClick={closeMenu} href="/#top">Home</a></li>
          <li><a onClick={closeMenu} href="/#about">About me</a></li>
          <li><a onClick={closeMenu} href="/#skills">Skills</a></li>
          <li><a onClick={closeMenu} href="/#projects">Projects</a></li>
          <li><a onClick={closeMenu} href="/#learning-log">Learning Log</a></li>
          <li><a onClick={closeMenu} href="/#chat">Chat</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar