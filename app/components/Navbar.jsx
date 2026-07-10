'use client'

import { Menu, X, Moon, Sun } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '#top', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About me' },
  { href: '#learning-log', label: 'Learning Log' },
  { href: '#chat', label: 'Chat' },
]

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
      <nav className={`w-full fixed top-0 left-0 px-5 lg:px-8 xl:px-[8%] py-4
      flex items-center justify-between z-50 transition-colors duration-300
      ${isScroll ? "bg-lightBg/80 backdrop-blur-lg border-b border-lightBorder dark:bg-darkTheme/80 dark:border-darkBorder" : "border-b border-transparent"}`}>
        <a href='#top' aria-label="홈으로 이동" className='font-mono text-lg font-bold tracking-tight text-lightInk dark:text-white'>
          <span className='text-accentDark dark:text-accent'>[</span>kys<span className='text-accentDark dark:text-accent'>]</span>
        </a>

        <ul className='hidden md:flex items-center gap-8 lg:gap-10 font-mono text-sm'>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className='text-gray-600 hover:text-accentDark dark:text-gray-300 dark:hover:text-accent transition-colors'>{label}</a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-4'>
          <button onClick={toggleDark} aria-pressed={isDark} aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className='text-gray-600 hover:text-accentDark dark:text-gray-300 dark:hover:text-accent transition-colors'>
            {isDark ? <Sun className='w-5 h-5' aria-hidden /> : <Moon className='w-5 h-5' aria-hidden />}
          </button>

          <button className='block md:hidden text-gray-600 dark:text-gray-300' onClick={openMenu} aria-label="메뉴 열기">
            <Menu className='w-6 h-6' aria-hidden />
          </button>
        </div>

        {/* 모바일 메뉴 */}
        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-5 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50
        h-screen bg-lightSurface font-mono transition duration-500 dark:bg-darkSurface dark:text-darkText border-l border-lightBorder dark:border-darkBorder'>

          <button className='absolute right-6 top-6 text-gray-600 dark:text-gray-300' onClick={closeMenu} aria-label="메뉴 닫기">
            <X className='w-5 h-5' aria-hidden />
          </button>

          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a onClick={closeMenu} href={href} className='hover:text-accentDark dark:hover:text-accent transition-colors'>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
