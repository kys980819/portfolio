import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = ({isDarkMode}) => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo'> Introduction </h4>
      <h2 className='text-center text-5xl font-Ovo'> About me </h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.profile_kys_img} alt='user' className='w-full rounded-3xl'/>
        </div>
        <div className='flex-1'>
            <p className='mb-10 max-w-2xl font-Ovo'>
            저는 10년 이상의 경험을 가진 프론트엔드 개발자입니다
            그 분야에 대한 전문 지식을 갖추고 있습니다. 제 경력 동안
            경력을 쌓으면서 저는 다음과 협력할 수 있는 특권을 누렸습니다
            </p>
            {/*About me에서 언어, 학력, 프로젝트 수정 할떄 여기 참고 assets.js 파일에서 수정  */}
            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                {infoList.map(({icon, iconDark, title, description}, index)=>(
                    <li  className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-amber-50
                    hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white 
                    dark:hover:shadow-white dark:hover:bg-darkHover/50' 
                     key={index}>
                        <Image src={isDarkMode ? iconDark : icon} alt={title} className='w-7 mt-3'/>
                        <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                        <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
                    </li>
                ))}
            </ul>

                <h4 className='my-6 text-gray-700 font-Ovo dark:text-white'>Tool I use</h4>

                <ul className='flex items-center gap-3 sm:gap-5'>
                    {toolsData.map((tool,index)=>(
                       <li className='flex items-center justify-center w-12 sm:w-14 aspect-square border
                        border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500' 
                       key={index}>
                            <Image src={tool} alt='Tool' className='w-5 sm:w-7'/>
                       </li> 
                    ))}
                </ul>
        </div>
      </div>
    </div>
  )
}

export default About


