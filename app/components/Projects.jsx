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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-10 max-w-5xl mx-auto'>
                {serviceData.map(({icon, title, description, period, techStack, highlights, troubleshooting, link}, index)=>(
                    <div key={index}
                    className='border border-gray-400 rounded-lg px-8 py-10 dark:border-darkBorder'>
                        <Image src={icon} alt='' className='w-10'/>
                        <h3 className='text-lg my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                        <p className='text-sm text-gray-600 dark:text-white/80'>{description}</p>

                        {period && (
                            <p className='text-xs text-gray-500 dark:text-gray-400 mt-3'>기간: {period}</p>
                        )}

                        {techStack && techStack.length > 0 && (
                            <div className='flex flex-wrap gap-1.5 mt-3'>
                                {techStack.map((tech, i) => (
                                    <span key={i} className='text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-darkSurface dark:text-gray-300'>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {highlights && highlights.length > 0 && (
                            <ul className='mt-4 space-y-1'>
                                {highlights.map((item, i) => (
                                    <li key={i} className='text-sm text-gray-600 dark:text-white/80 flex items-start gap-2'>
                                        <span className='text-gray-400 mt-0.5'>•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {troubleshooting && (
                            <div className='mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30'>
                                <p className='text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1'>트러블슈팅</p>
                                <p className='text-sm text-blue-600 dark:text-blue-200'>{troubleshooting}</p>
                            </div>
                        )}

                        <a href={link} target="_blank" rel="noopener noreferrer"
                            aria-label={`${title} 자세히 보기`}
                            className='inline-flex items-center gap-2 text-sm mt-5 border border-gray-400 rounded-lg px-3 py-1.5 w-fit dark:border-darkBorder'>
                            {link.includes('velog') ? '블로그에서 보기' : '사이트 보기'}
                            <Image src={assets.right_arrow} alt='화살표 아이콘' className='w-4'/>
                        </a>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Projects
