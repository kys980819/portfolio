import { categoryStyles, learningLogMeta, learningLogSeries, velogMainUrl } from '@/assets/learningLog'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import VelogLatest from './VelogLatest'

const LearningLog = () => {
  return (
    <div id='learning-log' className='w-full border-b border-ink dark:border-darkBorder scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-5 lg:px-8 py-16 md:py-20'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-darkFocus mb-3'>04 — Writing</p>
        <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight'>Learning Log</h2>

        <p className='max-w-2xl mt-5 text-sub dark:text-darkSub'>
          학습 과정에서 정리한 개념과 실습 기록입니다.
        </p>

        <p className='text-sm font-semibold text-ink dark:text-darkText mt-2 mb-12'>
          시리즈 {learningLogMeta.totalSeries} · 포스트 {learningLogMeta.totalPosts}+ · {learningLogMeta.period}
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-ink dark:border-darkBorder mb-12'>
          {learningLogSeries.map((series) => (
            <a
              key={series.id}
              href={series.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group block border-r border-b border-ink dark:border-darkBorder px-7 py-7 transition-colors hover:bg-gray-50 dark:hover:bg-darkHover'
            >
              <div className='flex items-start justify-between mb-4'>
                <span
                  className={
                    'inline-flex px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.1em] ' +
                    categoryStyles[series.category].badge
                  }
                >
                  {series.category}
                </span>
                <ArrowUpRight
                  className='h-4 w-4 text-sub group-hover:text-accent dark:text-darkSub dark:group-hover:text-darkFocus transition-colors'
                  aria-hidden
                />
              </div>

              <h3 className='text-lg font-bold text-ink dark:text-darkText mb-2'>{series.title}</h3>
              <p className='text-sm text-sub dark:text-darkSub leading-relaxed'>{series.description}</p>

            </a>
          ))}
        </div>

        <VelogLatest />

        <div className='mt-12'>
          <a
            href={velogMainUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-sm font-bold border-2 border-ink px-5 py-2.5 hover:bg-ink hover:text-white dark:border-darkBorder dark:hover:bg-darkText dark:hover:text-darkTheme transition-colors'
          >
            모든 글 보기
            <ArrowUpRight className='h-4 w-4' aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}

export default LearningLog
