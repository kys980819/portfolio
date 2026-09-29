import { categoryStyles, learningLogMeta, learningLogSeries, velogMainUrl } from '@/assets/learningLog'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import VelogLatest from './VelogLatest'

// 카테고리별 시리즈 수 — learningLogSeries 실데이터에서 계산 (등장 순서 유지)
const categoryCounts = learningLogSeries.reduce((acc, series) => {
  acc[series.category] = (acc[series.category] || 0) + 1
  return acc
}, {})

// 분포 바 세그먼트 색 (카테고리 칩과 같은 계열)
const categoryBarColors = {
  Security: 'bg-emerald-500',
  Certification: 'bg-amber-500',
  'Hands-on': 'bg-blue-500',
  Foundation: 'bg-slate-400',
}

const LearningLog = () => {
  return (
    <div id='learning-log' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-inkMuted dark:text-darkMuted'> Writing </h4>
      <h2 className='text-center text-3xl font-bold'> Learning Log </h2>
      <span className='mx-auto mt-3 block h-1 w-10 rounded-full bg-accent dark:bg-accent-dark' aria-hidden='true'></span>

      <p className='text-center max-w-2xl mx-auto mt-5 mb-6 text-inkMuted dark:text-darkMuted'>
        학습 과정에서 정리한 개념과 실습 기록입니다.
      </p>

      <p className='text-center font-mono text-sm text-inkMuted dark:text-darkMuted mb-5'>
        시리즈 {learningLogMeta.totalSeries} · 포스트 {learningLogMeta.totalPosts}+ · {learningLogMeta.period}
      </p>

      <div className='max-w-md mx-auto mb-12'>
        <div
          className='flex h-1.5 overflow-hidden rounded-full'
          role='img'
          aria-label={`카테고리별 시리즈 분포: ${Object.entries(categoryCounts)
            .map(([category, count]) => `${category} ${count}`)
            .join(', ')}`}
        >
          {Object.entries(categoryCounts).map(([category, count]) => (
            <span
              key={category}
              className={categoryBarColors[category] || 'bg-slate-400'}
              style={{ width: `${(count / learningLogSeries.length) * 100}%` }}
            ></span>
          ))}
        </div>
        <div className='mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-[11px] text-inkMuted dark:text-darkMuted' aria-hidden='true'>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <span key={category} className='inline-flex items-center gap-1.5'>
              <span className={`inline-block h-2 w-2 rounded-sm ${categoryBarColors[category] || 'bg-slate-400'}`}></span>
              {category} {count}
            </span>
          ))}
        </div>
      </div>

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
          className='inline-flex items-center gap-2 text-sm border border-accent/30 bg-panel rounded-md px-5 py-2 font-medium text-accent hover:bg-info-soft/60 dark:bg-darkSurface dark:border-accent-dark/40 dark:text-accent-dark dark:hover:bg-accent-dark/10 transition-colors'
        >
          모든 글 보기
          <ArrowUpRight className='h-4 w-4' aria-hidden />
        </a>
      </div>
    </div>
  )
}

export default LearningLog
