import { assets, serviceData } from '@/assets/assets'
import { caseStudies } from '@/assets/caseStudies'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Projects = () => {
  return (
    <div id='projects' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h2 className='text-center text-3xl font-bold'> MY Projects </h2>
        <span className='mx-auto mt-3 block h-1 w-10 rounded-full bg-accent dark:bg-accent-dark' aria-hidden='true'></span>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-10 max-w-5xl mx-auto'>
                {serviceData.map(({slug, title, description, period, techStack, highlights, troubleshooting, link, attachments}, index)=>{
                    const hasProof = attachments && attachments.length > 0
                    const inProgress = period === '지속 개선 중'
                    return (
                    <div key={index}
                    className='rounded-lg border border-line bg-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface'>
                        <div className='flex items-center justify-between border-b border-line px-6 py-3 dark:border-darkBorder'>
                            <span className='font-mono text-xs font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>
                                CASE {String(index + 1).padStart(2, '0')}
                            </span>
                            {hasProof && (
                                <span className='rounded bg-ok-soft px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-ok dark:bg-emerald-900/45 dark:text-emerald-300'>
                                    VERIFIED
                                </span>
                            )}
                            {!hasProof && inProgress && (
                                <span className='rounded bg-warn-soft px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-warn dark:bg-amber-900/45 dark:text-amber-300'>
                                    IN PROGRESS
                                </span>
                            )}
                        </div>
                        <div className='px-6 py-6'>
                        <h3 className='text-lg font-semibold text-ink dark:text-darkText'>{title}</h3>
                        <p className='text-sm text-inkMuted dark:text-darkMuted mt-3'>{description}</p>

                        {period && (
                            <p className='font-mono text-xs text-inkMuted dark:text-darkMuted mt-3'>기간: {period}</p>
                        )}

                        {techStack && techStack.length > 0 && (
                            <div className='flex flex-wrap gap-1.5 mt-3'>
                                {techStack.map((tech, i) => (
                                    <span key={i} className='text-xs px-2 py-0.5 rounded bg-pageBg text-ink/80 border border-line dark:bg-darkTheme dark:text-darkText/80 dark:border-darkBorder'>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {highlights && highlights.length > 0 && (
                            <ul className='mt-4 space-y-1'>
                                {highlights.map((item, i) => (
                                    <li key={i} className='text-sm text-inkMuted dark:text-darkMuted flex items-start gap-2'>
                                        <span className='text-accent dark:text-accent-dark mt-0.5'>•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {troubleshooting && (
                            <div className='mt-4 p-3 rounded-lg bg-info-soft/60 dark:bg-blue-900/20 border border-info/20 dark:border-blue-800/30'>
                                <p className='text-xs font-semibold text-info dark:text-blue-300 mb-1'>트러블슈팅</p>
                                <p className='text-sm text-ink/80 dark:text-blue-200'>{troubleshooting}</p>
                            </div>
                        )}

                        {attachments && attachments.length > 0 && (
                            <div className='mt-5 pt-4 border-t border-line dark:border-darkBorder'>
                                <p className='font-mono text-xs font-bold uppercase tracking-[0.12em] text-inkMuted dark:text-darkMuted mb-2'>증빙 문서</p>
                                <div className='flex flex-col gap-2'>
                                    {attachments.map(({label, href}, i) => (
                                        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                            aria-label={`${label} 열기`}
                                            className='inline-flex items-center gap-2 text-sm border border-line rounded-md px-3 py-1.5 w-fit hover:bg-pageBg dark:border-darkBorder dark:hover:bg-darkHover'>
                                            {label}
                                            <Image src={assets.right_arrow} alt='' className='w-3'/>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {link && (
                            <a href={link} target="_blank" rel="noopener noreferrer"
                                aria-label={`${title} 자세히 보기`}
                                className='inline-flex items-center gap-2 text-sm mt-5 border border-accent/30 rounded-md px-3 py-1.5 w-fit font-medium text-accent hover:bg-info-soft/60 dark:border-accent-dark/40 dark:text-accent-dark dark:hover:bg-accent-dark/10'>
                                {link.includes('velog') ? '블로그에서 보기' : '사이트 보기'}
                                <ArrowUpRight className='h-4 w-4' aria-hidden />
                            </a>
                        )}

                        {slug && caseStudies[slug] && (
                            <Link href={`/projects/${slug}`}
                                aria-label={`${title} 자세히 보기`}
                                className='inline-flex items-center gap-2 text-sm mt-5 border border-accent/30 rounded-md px-3 py-1.5 w-fit font-medium text-accent hover:bg-info-soft/60 dark:border-accent-dark/40 dark:text-accent-dark dark:hover:bg-accent-dark/10'>
                                자세히 보기
                                <ArrowRight className='h-4 w-4' aria-hidden />
                            </Link>
                        )}
                        </div>
                    </div>
                )})}
            </div>
    </div>
  )
}

export default Projects
