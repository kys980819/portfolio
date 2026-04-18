import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg'> Introduction </h4>
      <h2 className='text-center text-5xl'> About me </h2>

      <div className='flex w-full flex-col lg:flex-row items-center justify-center gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.profile_kys_img} alt='김윤성 프로필 사진' className='w-full rounded-3xl'/>
        </div>
        <div className='flex-1 flex flex-col items-center lg:items-start'>
            <p className='mb-10 max-w-2xl'>
              법경찰행정학과를 졸업하고 삼성전자 사업장에서 1년간 시설보안 업무를 수행했습니다.
              현장에서 절차 준수와 매뉴얼 기반 업무의 중요성을 체감하면서, 물리 보안을 넘어 정보보안과 IT 분야로 관심이 확장되었습니다.
              <br/><br/>
              비전공자였지만 멘토링 기반 과제형 학습을 통해 포트폴리오 사이트를 직접 기획·구현·배포했고,
              현재는 네트워크·보안 기초와 악성코드 분석 실습을 병행하며 보안관제 직무 전환을 준비하고 있습니다.
              <br/><br/>
              저의 강점은 새로운 기술 앞에서 멈추지 않고, 검색하고 시도하고 기록하면서 결과물을 완성하는 실행력입니다.
            </p>
            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                {infoList.map(({icon, iconDark, title, description}, index)=>(
                    <li  className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-amber-50
                    hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white 
                    dark:hover:shadow-white dark:hover:bg-darkHover/50' 
                     key={index}>
                        <Image src={icon} alt={title} className='w-7 mt-3 dark:hidden'/>
                        <Image src={iconDark} alt={title} className='w-7 mt-3 hidden dark:block'/>
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

            <div className='mt-14 max-w-2xl w-full'>
              <h4 className='text-lg font-semibold text-gray-700 dark:text-white mb-6'>경력 · 교육 · 자격증</h4>
              <div className='relative border-l-2 border-gray-300 dark:border-darkBorder pl-6 space-y-8'>

                <div className='relative'>
                  <span className='absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-400 dark:bg-darkFocus border-2 border-white dark:border-darkTheme'></span>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>2024.11 ~ 2025.11</span>
                  <h5 className='font-semibold text-gray-800 dark:text-white'>삼성전자 사업장 시설보안</h5>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>휴먼TSS 파견 · 출입통제, 매뉴얼 기반 대응, 교대근무</p>
                  <span className='inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'>경력</span>
                </div>

                <div className='relative'>
                  <span className='absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-400 dark:bg-darkFocus border-2 border-white dark:border-darkTheme'></span>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>2025.08 ~ 현재</span>
                  <h5 className='font-semibold text-gray-800 dark:text-white'>IT 직무 전환 멘토링 (과제형)</h5>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>웹개발 → 네트워크/보안 기초 → 악성코드 분석</p>
                  <span className='inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'>교육</span>
                </div>

                <div className='relative'>
                  <span className='absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-400 dark:bg-darkFocus border-2 border-white dark:border-darkTheme'></span>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>2024.08</span>
                  <h5 className='font-semibold text-gray-800 dark:text-white'>호서대학교 법경찰행정학과 졸업</h5>
                  <span className='inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'>학력</span>
                </div>

                <div className='relative'>
                  <span className='absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-400 dark:bg-darkFocus border-2 border-white dark:border-darkTheme'></span>
                  <h5 className='font-semibold text-gray-800 dark:text-white'>리눅스마스터 2급 · 정보처리기사 필기 합격</h5>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>정보처리기사 실기 준비 중</p>
                  <span className='inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'>자격증</span>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default About

