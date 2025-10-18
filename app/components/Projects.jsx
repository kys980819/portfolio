import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Projects = () => {
  return (
    <div id='projects' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg'> Challenge </h4>
        <h2 className='text-center text-5xl'> MY Projects </h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>
        학습한 내용을 바탕으로 다양한 프로젝트를 시도하고 있습니다.<br/> 꾸준히 쌓아가며 제 성장을 보여드리겠습니다.
        </p>
            <div className='grid grid-cols-auto gap-6 my-10'>
                {serviceData.map(({icon, title, description, link}, index)=>(
                    <div key={index} 
                    className='border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black 
                    cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500
                     dark:hover:bg-darkHover dark:hover:shadow-white'>
                        <Image src={icon} alt='' className='w-10'/>
                        <h3 className='text-lg my-4 text-gray-700 dark:text-white'>{title}</h3>
                        <p className='text-sm text-gray-600 leading-5 dark:text-white/80 whitespace-pre-line'>
                            {description}
                        </p>
                        <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`${title} 프로젝트 자세히 보기`} className='inline-flex items-center gap-2 text-sm mt-5 border border-gray-400 rounded-lg px-3 py-1.5 w-fit'>
                            Read more <Image src={assets.right_arrow} alt='' className='w-4'/>
                        </a>

                    </div>
                ))}
            </div>
    </div>
  )
}

export default Projects
