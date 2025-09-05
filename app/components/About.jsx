import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = ({isDarkMode}) => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg'> Introduction </h4>
      <h2 className='text-center text-5xl'> About me </h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.profile_kys_img} alt='user' className='w-full rounded-3xl'/>
        </div>
        <div className='flex-1'>
            <p className='mb-10 max-w-2xl'>
            안녕하세요, 경찰행정학을 전공했지만 오래전부터 IT에 관심을 가져온 김윤성입니다.
            컴퓨터에 문제가 생겼을 때 직접 해결하는 과정이 멋지고 의미 있다고 느껴 도전하게 되었습니다.
            새로운 기술과 프로그램을 빠르게 배우고 활용하는 것을 좋아하며, 문제가 생기면 직접 해결하려는 태도를 강점으로 삼고 있습니다.
            앞으로는 QA와 클라우드 분야에서 꾸준히 배우고 기여할 수 있는 엔지니어로 성장하고 싶습니다.
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
                        {Array.isArray(description) ? (
                          <ul className='list-disc pl-5 text-gray-600 text-sm dark:text-white/80 space-y-1 whitespace-pre-line'>
                            {description.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
                        )}
                    </li>
                ))}
            </ul>

                <h4 className='my-6 text-gray-700 dark:text-white'>Tool I use</h4>

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


