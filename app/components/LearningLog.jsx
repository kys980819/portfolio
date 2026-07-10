import { categoryStyles, learningLogMeta, learningLogSeries, velogMainUrl } from '@/assets/learningLog'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const LearningLog = () => {
  return (
    <div id='learning-log' className='w-full px-[8%] lg:px-[10%] py-20 scroll-mt-20 bg-lightHover/60 dark:bg-darkSurface/40'>
      <div className='max-w-6xl mx-auto'>
        <SectionHeading kicker='WRITING' title='Learning Log' />

        <Reveal className='mt-5'>
          <p className='max-w-2xl text-gray-600 dark:text-gray-300 break-keep'>
            학습 과정에서 정리한 개념과 실습 기록입니다.
          </p>
          <p className='mt-2 font-mono text-sm text-gray-500 dark:text-gray-400'>
            시리즈 {learningLogMeta.totalSeries} · 포스트 {learningLogMeta.totalPosts}+ · {learningLogMeta.period}
          </p>
        </Reveal>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
          {learningLogSeries.map((series, index) => (
            <Reveal as='div' key={series.id} delay={index * 60}>
              <a
                href={series.url}
                target='_blank'
                rel='noopener noreferrer'
                className={
                  'group block h-full rounded-xl border border-lightBorder bg-lightSurface shadow-panel px-7 py-7 transition-colors dark:border-darkBorder dark:bg-darkSurface ' +
                  categoryStyles[series.category].accent
                }
              >
                <div className='flex items-start justify-between mb-4'>
                  <span
                    className={
                      'inline-flex font-mono rounded px-2 py-0.5 text-xs font-medium ' +
                      categoryStyles[series.category].badge
                    }
                  >
                    {series.category}
                  </span>
                  <ArrowUpRight
                    className='h-4 w-4 text-gray-400 group-hover:text-accentDark dark:text-gray-500 dark:group-hover:text-accent transition-colors'
                    aria-hidden
                  />
                </div>

                <h3 className='text-lg font-semibold text-lightInk dark:text-white mb-2 break-keep'>{series.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed break-keep'>{series.description}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <div className='mt-10'>
          <a
            href={velogMainUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center gap-2 font-mono text-sm border border-lightBorder rounded-lg px-5 py-2.5 hover:border-accentDark hover:text-accentDark dark:border-darkBorder dark:hover:border-accent dark:hover:text-accent transition-colors'
          >
            모든 글 보기
            <ArrowUpRight className='h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}

export default LearningLog
