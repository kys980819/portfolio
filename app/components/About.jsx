import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20 bg-gray-50 dark:bg-darkSurface'>
      <h4 className='text-center mb-2 text-lg'> Introduction </h4>
      <h2 className='text-center text-5xl'> About me </h2>

      <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start my-12 md:my-20 max-w-5xl mx-auto'>
        <div className='flex justify-center md:justify-start shrink-0'>
          <div className='relative w-[240px] h-[320px] overflow-hidden rounded-xl'>
            <Image
              src={assets.profile_kys_img}
              alt='김윤성 프로필 사진'
              width={240}
              height={320}
              className='h-full w-full object-cover'
              sizes='240px'
            />
          </div>
        </div>

        <div className='flex min-w-0 flex-col gap-8'>
          <div className='text-gray-700 dark:text-gray-200'>
            <p className='leading-relaxed'>
              법경찰행정학과를 졸업하고 삼성전자 사업장에서 1년간 시설보안 업무를 수행했습니다. 현장에서 절차 준수와 매뉴얼 기반 업무의 중요성을 체감하면서, 물리 보안을 넘어 정보보안과 IT 분야로 관심이 확장되었습니다.
            </p>
            <p className='mt-4 leading-relaxed'>
              현재는 네트워크·보안 기초와 악성코드 분석 실습을 병행하며 보안관제 직무 전환을 준비하고 있습니다.
            </p>
          </div>

          <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {infoList.map(({ icon: Icon, title, description }, index) => (
              <li
                key={index}
                className='group rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-50 dark:border-darkBorder dark:bg-darkSurface/40 dark:hover:bg-darkHover/50 dark:hover:shadow-[0_4px_24px_rgba(255,255,255,0.06)]'
              >
                <Icon
                  className='mb-3 h-5 w-5 text-gray-700 dark:text-gray-200'
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className='mb-2 font-semibold text-gray-800 dark:text-white'>{title}</h3>
                <p className='text-sm text-gray-600 dark:text-white/80'>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-200 pt-10 dark:border-darkBorder max-w-5xl mx-auto'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <section className='rounded-xl border border-gray-200 bg-white p-5 dark:border-darkBorder dark:bg-darkSurface/40'>
            <h3 className='text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              경력
            </h3>
            <h4 className='mt-2 text-lg font-semibold text-gray-900 dark:text-white'>
              삼성전자 사업장 시설보안
            </h4>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>휴먼TSS · 2024.11 ~ 2025.11</p>
            <p className='mt-3 text-sm text-gray-600 dark:text-gray-300'>
              출입통제, 매뉴얼 기반 대응, 교대근무
            </p>
          </section>

          <section className='rounded-xl border border-gray-200 bg-white p-5 dark:border-darkBorder dark:bg-darkSurface/40'>
            <h3 className='text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              교육
            </h3>
            <div>
              <h4 className='mt-2 text-lg font-semibold text-gray-900 dark:text-white'>
                IT 직무 전환 멘토링
              </h4>
              <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>과제형 · 2025.08 ~ 현재</p>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                웹개발 → 네트워크/보안 → 악성코드 분석
              </p>
            </div>
            <div className='mt-6 border-t border-gray-100 pt-6 dark:border-darkBorder'>
              <h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
                호서대학교 법경찰행정학과
              </h4>
              <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>졸업 · 2024.08</p>
            </div>
          </section>

          <section className='rounded-xl border border-gray-200 bg-white p-5 dark:border-darkBorder dark:bg-darkSurface/40'>
            <h3 className='text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              자격증
            </h3>
            <ul className='mt-4 space-y-4'>
              <li className='flex flex-wrap items-center gap-2'>
                <span className='font-medium text-gray-900 dark:text-white'>리눅스마스터 2급</span>
                <span className='inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/45 dark:text-emerald-200'>
                  취득
                </span>
              </li>
              <li className='flex flex-wrap items-center gap-2'>
                <span className='font-medium text-gray-900 dark:text-white'>정보처리기사</span>
                <span className='inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/45 dark:text-blue-200'>
                  필기 합격
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
