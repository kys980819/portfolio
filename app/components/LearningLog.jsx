import { categoryStyles, learningLogMeta, learningLogSeries, velogMainUrl } from '@/assets/learningLog'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const LearningLog = () => {
  return (
    <div id='learning-log' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg'> Writing </h4>
      <h2 className='text-center text-5xl'> Learning Log </h2>

      <p className='text-center max-w-2xl mx-auto mt-5 mb-6'>
        모르는 건 찾아서 익히고, 익힌 건 기록으로 남깁니다.<br />
        보안관제로의 전환을 위해 쌓아온 학습 궤적입니다.
      </p>

      <p className='text-center text-sm text-gray-500 dark:text-gray-400 mb-12'>
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
              'group block border border-gray-300 rounded-lg px-8 py-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-darkBorder ' +
              categoryStyles[series.category].accent
            }
          >
            <div className='flex items-start justify-between mb-4'>
              <span
                className={
                  'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ' +
                  categoryStyles[series.category].badge
                }
              >
                {series.category}
              </span>
              <ArrowUpRight
                className='h-4 w-4 text-gray-400 group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-200 transition-colors'
                aria-hidden
              />
            </div>

            <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>{series.title}</h3>
            <p className='text-sm text-gray-600 dark:text-white/80 leading-relaxed'>{series.description}</p>

          </a>
        ))}
      </div>

      <div className='text-center mt-12'>
        <a
          href={velogMainUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 text-sm border border-gray-400 rounded-lg px-5 py-2 hover:bg-gray-50 dark:border-darkBorder dark:hover:bg-darkHover transition-colors'
        >
          모든 글 보기
          <ArrowUpRight className='h-4 w-4' aria-hidden />
        </a>
      </div>
    </div>
  )
}

export default LearningLog
