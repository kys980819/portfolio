import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full border-b border-ink dark:border-darkBorder scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-5 lg:px-8 py-16 md:py-20'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-darkFocus mb-3'>01 — Introduction</p>
        <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight'>About me</h2>

        <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start mt-12 md:mt-16'>
          <div className='flex justify-center md:justify-start shrink-0'>
            <div className='border border-ink dark:border-darkBorder p-1.5'>
              <Image
                src={assets.profile_kys_img}
                alt='김윤성 프로필 사진'
                width={240}
                height={320}
                className='w-[240px] h-[320px] object-cover'
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

            <ul className='grid grid-cols-1 sm:grid-cols-3 border border-ink divide-y sm:divide-y-0 sm:divide-x divide-ink dark:border-darkBorder dark:divide-darkBorder'>
              {infoList.map(({ icon: Icon, title, description }, index) => (
                <li key={index} className='p-5'>
                  <Icon
                    className='mb-3 h-5 w-5 text-accent dark:text-darkFocus'
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className='mb-2 font-bold text-ink dark:text-darkText break-keep'>{title}</h3>
                  <p className='text-sm text-sub dark:text-darkSub break-keep'>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-12 md:mt-16'>
          <div className='grid grid-cols-1 md:grid-cols-3 border border-ink divide-y md:divide-y-0 md:divide-x divide-ink dark:border-darkBorder dark:divide-darkBorder'>
            <section className='p-6'>
              <h3 className='text-xs font-bold uppercase tracking-[0.15em] text-accent dark:text-darkFocus'>
                경력
              </h3>
              <h4 className='mt-3 text-lg font-bold text-ink dark:text-darkText'>
                삼성전자 캠퍼스 보안
              </h4>
              <p className='mt-1 text-sm text-sub dark:text-darkSub'>휴먼TSS · 2023.11 ~ 2024.11 (1년)<br/>졸업유예 기간 중 근무</p>
              <p className='mt-3 text-sm text-sub dark:text-darkSub'>
                출입 통제·보안 검색(금속탐지·문서감응·엑스레이), 반입·반출 통제, 사업장 순찰, 모의훈련 대응
              </p>
            </section>

            <section className='p-6'>
              <h3 className='text-xs font-bold uppercase tracking-[0.15em] text-accent dark:text-darkFocus'>
                학력
              </h3>
              <div>
                <h4 className='mt-3 text-lg font-bold text-ink dark:text-darkText'>
                  호서대학교 법경찰행정학과
                </h4>
                <p className='mt-1 text-sm text-sub dark:text-darkSub'>졸업 · 2024.08</p>
              </div>
            </section>

            <section className='p-6'>
              <h3 className='text-xs font-bold uppercase tracking-[0.15em] text-accent dark:text-darkFocus'>
                자격증
              </h3>
              <ul className='mt-4 space-y-4'>
                <li className='flex flex-wrap items-center gap-2'>
                  <span className='font-bold text-ink dark:text-darkText'>리눅스마스터 2급</span>
                  <span className='inline-flex border border-ink px-2 py-0.5 text-xs font-semibold text-ink dark:border-darkBorder dark:text-darkText'>
                    2025.12
                  </span>
                </li>
                <li className='flex flex-wrap items-center gap-2'>
                  <span className='font-bold text-ink dark:text-darkText'>정보처리기사 필기</span>
                  <span className='inline-flex border border-ink px-2 py-0.5 text-xs font-semibold text-ink dark:border-darkBorder dark:text-darkText'>
                    2026.03
                  </span>
                </li>
                <li className='text-sm text-sub dark:text-darkSub'>실기 2026년 2차 예정</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
