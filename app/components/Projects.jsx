import { serviceData } from '@/assets/assets'
import { ArrowUpRight, FileText, Terminal } from 'lucide-react'
import React from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const MonoTag = ({ children }) => (
  <span className='font-mono text-xs px-2 py-0.5 rounded border border-lightBorder text-gray-600 dark:border-darkBorder dark:text-gray-300'>
    {children}
  </span>
)

const Highlights = ({ items }) => (
  <ul className='space-y-2.5'>
    {items.map((item, i) => (
      <li key={i} className='flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300 break-keep'>
        <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accentDark dark:bg-accent' />
        <span className='leading-relaxed'>{item}</span>
      </li>
    ))}
  </ul>
)

const Troubleshooting = ({ text }) => (
  <div className='border-l-2 border-accentDark dark:border-accent bg-accentDark/[0.04] dark:bg-accent/[0.06] pl-4 pr-3 py-3 rounded-r'>
    <p className='font-mono text-xs text-accentDark dark:text-accent mb-1'>{'>'} troubleshooting</p>
    <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed break-keep'>{text}</p>
  </div>
)

const Artifacts = ({ items }) => (
  <div>
    <p className='font-mono text-xs text-gray-500 dark:text-gray-400 mb-2'>ARTIFACTS</p>
    <div className='flex flex-col gap-2'>
      {items.map(({ label, href }, i) => (
        <a key={i} href={href} target='_blank' rel='noopener noreferrer' aria-label={`${label} 열기`}
          className='group inline-flex items-center gap-2 text-sm border border-lightBorder rounded-lg px-3 py-1.5 w-fit hover:border-accentDark dark:border-darkBorder dark:hover:border-accent transition-colors break-keep'>
          <FileText className='w-4 h-4 text-gray-400 group-hover:text-accentDark dark:group-hover:text-accent shrink-0' aria-hidden />
          <span className='text-gray-700 dark:text-gray-200'>{label}</span>
        </a>
      ))}
    </div>
  </div>
)

const CaseLabel = ({ n }) => (
  <span className='font-mono text-xs text-accentDark dark:text-accent'>CASE #{n}</span>
)

const Projects = () => {
  const [main, ...rest] = serviceData

  return (
    <div id='projects' className='w-full px-[8%] lg:px-[10%] py-20 scroll-mt-20'>
      <div className='max-w-6xl mx-auto'>
        <SectionHeading kicker='PROJECTS' title='MY Projects' />

        {/* 메인 프로젝트 — 풀폭 케이스 리포트 */}
        <Reveal className='mt-12 rounded-xl border border-lightBorder bg-lightSurface shadow-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface'>
          <div className='flex items-center gap-3 px-6 py-3 border-b border-lightBorder dark:border-darkBorder font-mono text-xs'>
            <Terminal className='w-4 h-4 text-accentDark dark:text-accent' aria-hidden />
            <CaseLabel n='01' />
            <span className='text-gray-400 dark:text-gray-600'>—</span>
            <span className='text-gray-500 dark:text-gray-400'>MAIN PROJECT</span>
          </div>

          <div className='grid lg:grid-cols-[280px_1fr] gap-8 p-6 sm:p-8'>
            {/* 좌: 메타 */}
            <div className='flex flex-col gap-5'>
              <h3 className='text-xl font-bold text-lightInk dark:text-white leading-snug break-keep'>{main.title}</h3>
              {main.period && (
                <div>
                  <p className='font-mono text-xs text-gray-500 dark:text-gray-400 mb-1'>PERIOD</p>
                  <p className='font-mono text-sm text-gray-700 dark:text-gray-200'>{main.period}</p>
                </div>
              )}
              {main.techStack?.length > 0 && (
                <div>
                  <p className='font-mono text-xs text-gray-500 dark:text-gray-400 mb-2'>STACK</p>
                  <div className='flex flex-wrap gap-1.5'>
                    {main.techStack.map((t, i) => <MonoTag key={i}>{t}</MonoTag>)}
                  </div>
                </div>
              )}
              {main.attachments?.length > 0 && <Artifacts items={main.attachments} />}
            </div>

            {/* 우: 내용 */}
            <div className='flex flex-col gap-6 min-w-0'>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed break-keep'>{main.description}</p>
              {main.highlights?.length > 0 && <Highlights items={main.highlights} />}
              {main.troubleshooting && <Troubleshooting text={main.troubleshooting} />}
              {main.link && (
                <a href={main.link} target='_blank' rel='noopener noreferrer' aria-label={`${main.title} 자세히 보기`}
                  className='group inline-flex items-center gap-2 text-sm font-medium text-accentDark dark:text-accent w-fit'>
                  {main.link.includes('velog') ? '블로그에서 보기' : '사이트 보기'}
                  <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' aria-hidden />
                </a>
              )}
            </div>
          </div>
        </Reveal>

        {/* 나머지 프로젝트 — 2단 카드 */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          {rest.map((p, index) => (
            <Reveal key={index} delay={index * 80}
              className='group flex flex-col rounded-xl border border-lightBorder bg-lightSurface p-6 shadow-panel hover:border-accentDark/60 dark:border-darkBorder dark:bg-darkSurface dark:hover:border-accent/60 transition-colors'>
              <div className='font-mono text-xs mb-4'>
                <CaseLabel n={String(index + 2).padStart(2, '0')} />
              </div>
              <h3 className='text-lg font-bold text-lightInk dark:text-white leading-snug mb-2 break-keep'>{p.title}</h3>
              <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed break-keep mb-4'>{p.description}</p>

              {p.period && (
                <p className='font-mono text-xs text-gray-500 dark:text-gray-400 mb-3'>기간: {p.period}</p>
              )}

              {p.techStack?.length > 0 && (
                <div className='flex flex-wrap gap-1.5 mb-4'>
                  {p.techStack.map((t, i) => <MonoTag key={i}>{t}</MonoTag>)}
                </div>
              )}

              {p.highlights?.length > 0 && <div className='mb-4'><Highlights items={p.highlights} /></div>}
              {p.troubleshooting && <div className='mb-4'><Troubleshooting text={p.troubleshooting} /></div>}
              {p.attachments?.length > 0 && <div className='mb-4'><Artifacts items={p.attachments} /></div>}

              {p.link && (
                <a href={p.link} target='_blank' rel='noopener noreferrer' aria-label={`${p.title} 자세히 보기`}
                  className='group/link mt-auto inline-flex items-center gap-2 text-sm font-medium text-accentDark dark:text-accent w-fit'>
                  {p.link.includes('velog') ? '블로그에서 보기' : '사이트 보기'}
                  <ArrowUpRight className='w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform' aria-hidden />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
