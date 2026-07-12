import { categoryStyles, learningLogMeta, learningLogSeries, velogMainUrl } from '@/assets/learningLog'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import VelogLatest from './VelogLatest'

const LearningLog = () => {
  return (
    <div id='learning-log' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-inkMuted dark:text-darkMuted'> Writing </h4>
      <h2 className='text-center text-3xl font-bold'> Learning Log </h2>

      <p className='text-center max-w-2xl mx-auto mt-5 mb-6 text-inkMuted dark:text-darkMuted'>
        학습 과정에서 정리한 개념과 실습 기록입니다.
      </p>

      <p className='text-center font-mono text-sm text-inkMuted dark:text-darkMuted mb-12'>
        시리즈 {learningLogMeta.totalSeries} · 포스트 {learningLogMeta.totalPosts}+ · {learningLogMeta.period}
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-10 max-w-5xl mx-auto'>
        {learningLogSeries.map((series) => (
          <a
            key={series.id}
            href={series.url}
            target='_blank'
            rel='noopener noreferrer'
            className={
              'group block rounded-lg border border-line bg-panel px-8 py-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-darkBorder dark:bg-darkSurface ' +
              categoryStyles[series.category].accent
            }
          >
            <div className='flex items-start justify-between mb-4'>
              <span
                className={
                  'inline-flex rounded px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider ' +
                  categoryStyles[series.category].badge
                }
              >
                {series.category}
              </span>
              <ArrowUpRight
                className='h-4 w-4 text-inkMuted group-hover:text-ink dark:text-darkMuted dark:group-hover:text-darkText transition-colors'
                aria-hidden
              />
            </div>

            <h3 className='text-lg font-semibold text-ink dark:text-darkText mb-2'>{series.title}</h3>
            <p className='text-sm text-inkMuted dark:text-darkMuted leading-relaxed'>{series.description}</p>

          </a>
        ))}
      </div>

      <VelogLatest />

      <div className='text-center mt-12'>
        <a
          href={velogMainUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 text-sm border border-line bg-panel rounded-md px-5 py-2 hover:bg-pageBg dark:bg-darkSurface dark:border-darkBorder dark:hover:bg-darkHover transition-colors'
        >
          모든 글 보기
          <ArrowUpRight className='h-4 w-4' aria-hidden />
        </a>
      </div>
    </div>
  )
}

export default LearningLog
