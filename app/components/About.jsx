import { assets, infoList } from '@/assets/assets'
import { learningLogMeta } from '@/assets/learningLog'
import Image from 'next/image'
import React from 'react'

// KPI 수치는 사이트 기존 콘텐츠 기준: 경력 1년(About), 자격증 2개(About),
// 분석 보고서 3건(공개 PDF 3종), 학습 포스트 수(learningLogMeta)
const kpiTiles = [
  { label: 'Career', value: '1', unit: '년' },
  { label: 'Certificates', value: '2', unit: '개' },
  { label: 'Reports', value: '3', unit: '건' },
  { label: 'Posts', value: String(learningLogMeta.totalPosts), unit: '+' },
]

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-inkMuted dark:text-darkMuted'> Introduction </h4>
      <h2 className='text-center text-3xl font-bold'> About me </h2>

      <ul className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10'>
        {kpiTiles.map(({ label, value, unit }) => (
          <li key={label} className='rounded-lg border border-line bg-panel px-5 py-4 dark:border-darkBorder dark:bg-darkSurface'>
            <p className='font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>{label}</p>
            <p className='mt-1 text-3xl font-bold tabular-nums'>
              {value}
              <span className='ml-1 text-sm font-semibold text-inkMuted dark:text-darkMuted'>{unit}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start my-12 md:my-16 max-w-5xl mx-auto'>
        <div className='flex justify-center md:justify-start shrink-0'>
          <div className='relative w-[240px] h-[320px] overflow-hidden rounded-lg border border-line dark:border-darkBorder'>
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
          <div className='text-ink dark:text-darkText'>
            <p className='leading-relaxed'>
            삼성전자 사업장에서 1년간 시설보안으로 일하며, 다수 게이트에서 출입 통제와 보안 검색을 수행했습니다. 포지션별 매뉴얼을 자기 방식으로 재구성해 현장에서 가장 빨리 적응한 팀원으로 평가받았습니다.
            </p>
            <p className='mt-4 leading-relaxed'>
            이후 IT로 방향을 전환해, 현직 실무자의 멘토링을 받으며 학습하고 그 과정을 기술 블로그에 꾸준히 기록해왔습니다. 이렇게 IT 전반의 흐름을 이해한 뒤, 지금은 네트워크와 보안 분야를 공부하며 보안 직무 진입을 준비하고 있습니다.
            </p>
          </div>

          <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {infoList.map(({ icon: Icon, title, description }, index) => (
              <li
                key={index}
                className='group rounded-lg border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-darkBorder dark:bg-darkSurface dark:hover:bg-darkHover'
              >
                <Icon
                  className='mb-3 h-5 w-5 text-accent dark:text-accent-dark'
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className='mb-2 font-semibold text-ink dark:text-darkText break-keep'>{title}</h3>
                <p className='text-sm text-inkMuted dark:text-darkMuted break-keep'>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='border-t border-line pt-10 dark:border-darkBorder max-w-5xl mx-auto'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <section className='rounded-lg border border-line bg-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface'>
            <div className='flex items-center justify-between border-b border-line px-5 py-3 dark:border-darkBorder'>
              <h3 className='font-mono text-xs font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>
                경력
              </h3>
            </div>
            <div className='px-5 py-4'>
              <h4 className='text-lg font-semibold text-ink dark:text-darkText'>
                삼성전자 캠퍼스 보안
              </h4>
              <p className='mt-1 text-sm text-inkMuted dark:text-darkMuted'>휴먼TSS · 2023.11 ~ 2024.11 (1년)<br/>졸업유예 기간 중 근무</p>
              <p className='mt-3 text-sm text-inkMuted dark:text-darkMuted'>
                출입 통제·보안 검색(금속탐지·문서감응·엑스레이), 반입·반출 통제, 사업장 순찰, 모의훈련 대응
              </p>
            </div>
          </section>

          <section className='rounded-lg border border-line bg-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface'>
            <div className='flex items-center justify-between border-b border-line px-5 py-3 dark:border-darkBorder'>
              <h3 className='font-mono text-xs font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>
                학력
              </h3>
            </div>
            <div className='px-5 py-4'>
              <h4 className='text-lg font-semibold text-ink dark:text-darkText'>
                호서대학교 법경찰행정학과
              </h4>
              <p className='mt-1 text-sm text-inkMuted dark:text-darkMuted'>졸업 · 2024.08</p>
            </div>
          </section>

          <section className='rounded-lg border border-line bg-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface'>
            <div className='flex items-center justify-between border-b border-line px-5 py-3 dark:border-darkBorder'>
              <h3 className='font-mono text-xs font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>
                자격증
              </h3>
            </div>
            <ul className='px-5 py-4 space-y-4'>
              <li className='flex flex-wrap items-center gap-2'>
                <span className='font-medium text-ink dark:text-darkText'>리눅스마스터 2급</span>
                <span className='inline-flex rounded bg-ok-soft px-2 py-0.5 font-mono text-xs font-bold text-ok dark:bg-emerald-900/45 dark:text-emerald-300'>
                  2025.12
                </span>
              </li>
              <li className='flex flex-wrap items-center gap-2'>
                <span className='font-medium text-ink dark:text-darkText'>정보처리기사 필기</span>
                <span className='inline-flex rounded bg-info-soft px-2 py-0.5 font-mono text-xs font-bold text-info dark:bg-blue-900/45 dark:text-blue-300'>
                  2026.03
                </span>
              </li>
              <li className='text-sm text-inkMuted dark:text-darkMuted'>실기 2026년 2차 예정</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
