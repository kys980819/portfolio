import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const About = () => {
  return (
    <div id='about' className='w-full px-[8%] lg:px-[10%] py-20 scroll-mt-20'>
      <div className='max-w-6xl mx-auto'>
        <SectionHeading kicker='ABOUT' title='About me' />

        <div className='grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-start mt-12'>
          {/* 프로필 사진 — 사각 크롭 + 듀오톤 (CSS 필터, 원본 불변) */}
          <Reveal className='flex justify-center md:justify-start shrink-0'>
            <div className='group relative w-[240px] h-[320px] overflow-hidden rounded-xl border border-lightBorder dark:border-darkBorder'>
              <Image
                src={assets.profile_kys_img}
                alt='김윤성 프로필 사진'
                width={240}
                height={320}
                className='h-full w-full object-cover grayscale contrast-125 brightness-95 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100'
                sizes='240px'
              />
              <div className='pointer-events-none absolute inset-0 bg-accentDark/50 dark:bg-accent/40 mix-blend-color transition-opacity duration-500 group-hover:opacity-0' />
              <span className='pointer-events-none absolute left-2 top-2 font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-white/90 backdrop-blur-sm'>
                PROFILE_01
              </span>
            </div>
          </Reveal>

          <div className='flex min-w-0 flex-col gap-8'>
            <Reveal className='text-gray-600 dark:text-gray-300'>
              <p className='leading-relaxed break-keep'>
              삼성전자 사업장에서 1년간 시설보안으로 일하며, 다수 게이트에서 출입 통제와 보안 검색을 수행했습니다. 포지션별 매뉴얼을 자기 방식으로 재구성해 현장에서 가장 빨리 적응한 팀원으로 평가받았습니다.
              </p>
              <p className='mt-4 leading-relaxed break-keep'>
              이후 IT로 방향을 전환해, 현직 실무자의 멘토링을 받으며 학습하고 그 과정을 기술 블로그에 꾸준히 기록해왔습니다. 이렇게 IT 전반의 흐름을 이해한 뒤, 지금은 네트워크와 보안 분야를 공부하며 보안 직무 진입을 준비하고 있습니다.
              </p>
            </Reveal>

            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {infoList.map(({ icon: Icon, title, description }, index) => (
                <Reveal as='li' key={index} delay={index * 70}
                  className='group rounded-xl border border-lightBorder bg-lightSurface p-5 shadow-panel transition-colors hover:border-accentDark/50 dark:border-darkBorder dark:bg-darkSurface dark:hover:border-accent/50'
                >
                  <Icon
                    className='mb-3 h-5 w-5 text-accentDark dark:text-accent'
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className='mb-2 font-semibold text-lightInk dark:text-white break-keep'>{title}</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300 break-keep'>{description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-lightBorder pt-10 dark:border-darkBorder mt-14'>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
            <Reveal as='section' className='rounded-xl border border-lightBorder bg-lightSurface p-5 shadow-panel dark:border-darkBorder dark:bg-darkSurface'>
              <h3 className='font-mono text-xs uppercase tracking-wide text-accentDark dark:text-accent'>
                경력
              </h3>
              <h4 className='mt-3 text-lg font-semibold text-lightInk dark:text-white'>
                삼성전자 캠퍼스 보안
              </h4>
              <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>휴먼TSS · 2023.11 ~ 2024.11 (1년)<br/>졸업유예 기간 중 근무</p>
              <p className='mt-3 text-sm text-gray-600 dark:text-gray-300 break-keep'>
                출입 통제·보안 검색(금속탐지·문서감응·엑스레이), 반입·반출 통제, 사업장 순찰, 모의훈련 대응
              </p>
            </Reveal>

            <Reveal as='section' delay={70} className='rounded-xl border border-lightBorder bg-lightSurface p-5 shadow-panel dark:border-darkBorder dark:bg-darkSurface'>
              <h3 className='font-mono text-xs uppercase tracking-wide text-accentDark dark:text-accent'>
                학력
              </h3>
              <div>
                <h4 className='mt-3 text-lg font-semibold text-lightInk dark:text-white'>
                  호서대학교 법경찰행정학과
                </h4>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>졸업 · 2024.08</p>
              </div>
            </Reveal>

            <Reveal as='section' delay={140} className='rounded-xl border border-lightBorder bg-lightSurface p-5 shadow-panel dark:border-darkBorder dark:bg-darkSurface'>
              <h3 className='font-mono text-xs uppercase tracking-wide text-accentDark dark:text-accent'>
                자격증
              </h3>
              <ul className='mt-4 space-y-4'>
                <li className='flex flex-wrap items-center gap-2'>
                  <span className='font-medium text-lightInk dark:text-white'>리눅스마스터 2급</span>
                  <span className='inline-flex font-mono rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/45 dark:text-emerald-200'>
                    2025.12
                  </span>
                </li>
                <li className='flex flex-wrap items-center gap-2'>
                  <span className='font-medium text-lightInk dark:text-white'>정보처리기사 필기</span>
                  <span className='inline-flex font-mono rounded bg-amber-200 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-800/60 dark:text-amber-100'>
                    2026.03
                  </span>
                </li>
                <li className='text-sm text-gray-600 dark:text-gray-300'>실기 2026년 2차 예정</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
