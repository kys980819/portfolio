import { serviceData } from '@/assets/assets'
import { caseStudies } from '@/assets/caseStudies'
import Link from 'next/link'
import React from 'react'

const Projects = () => {
  return (
    <div id='projects' className='w-full border-b border-ink dark:border-darkBorder scroll-mt-20'>
        <div className='max-w-5xl mx-auto px-5 lg:px-8 py-16 md:py-20'>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-darkFocus mb-3'>03 — Work</p>
            <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight'>Projects</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 border-t border-l border-ink dark:border-darkBorder mt-12'>
                {serviceData.map(({slug, title, description, period, techStack, highlights, troubleshooting, link, attachments}, index)=>(
                    <div key={index}
                    className='border-r border-b border-ink dark:border-darkBorder px-7 py-8'>
                        <p className='text-xs font-bold tracking-[0.15em] text-accent dark:text-darkFocus'>{String(index + 1).padStart(2, '0')}</p>
                        <h3 className='text-lg my-3 font-bold text-ink dark:text-darkText'>{title}</h3>
                        <p className='text-sm text-sub dark:text-darkSub'>{description}</p>

                        {period && (
                            <p className='text-xs text-sub dark:text-darkSub mt-3'>기간: {period}</p>
                        )}

                        {techStack && techStack.length > 0 && (
                            <div className='flex flex-wrap gap-1.5 mt-3'>
                                {techStack.map((tech, i) => (
                                    <span key={i} className='text-xs px-2 py-0.5 border border-gray-300 text-sub dark:border-darkSub/40 dark:text-darkSub'>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {highlights && highlights.length > 0 && (
                            <ul className='mt-4 space-y-1'>
                                {highlights.map((item, i) => (
                                    <li key={i} className='text-sm text-sub dark:text-darkSub flex items-start gap-2'>
                                        <span className='text-accent dark:text-darkFocus mt-0.5'>—</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {troubleshooting && (
                            <div className='mt-4 border-l-2 border-accent dark:border-darkFocus pl-4 py-1'>
                                <p className='text-xs font-bold uppercase tracking-[0.12em] text-accent dark:text-darkFocus mb-1'>Troubleshooting</p>
                                <p className='text-sm text-sub dark:text-darkSub'>{troubleshooting}</p>
                            </div>
                        )}

                        {attachments && attachments.length > 0 && (
                            <div className='mt-5 pt-4 border-t border-gray-300 dark:border-darkSub/40'>
                                <p className='text-xs font-bold uppercase tracking-[0.12em] text-sub dark:text-darkSub mb-2'>증빙 문서</p>
                                <div className='flex flex-col gap-2'>
                                    {attachments.map(({label, href}, i) => (
                                        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                            aria-label={`${label} 열기`}
                                            className='inline-flex items-center gap-2 text-sm border border-ink px-3 py-1.5 w-fit font-semibold hover:bg-ink hover:text-white transition-colors dark:border-darkBorder dark:hover:bg-darkText dark:hover:text-darkTheme'>
                                            {label}
                                            <span aria-hidden='true'>→</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {link && (
                            <a href={link} target="_blank" rel="noopener noreferrer"
                                aria-label={`${title} 자세히 보기`}
                                className='inline-flex items-center gap-2 text-sm mt-5 border border-ink px-3 py-1.5 w-fit font-semibold hover:bg-ink hover:text-white transition-colors dark:border-darkBorder dark:hover:bg-darkText dark:hover:text-darkTheme'>
                                {link.includes('velog') ? '블로그에서 보기' : '사이트 보기'}
                                <span aria-hidden='true'>→</span>
                            </a>
                        )}

                        {slug && caseStudies[slug] && (
                            <Link href={`/projects/${slug}`}
                                aria-label={`${title} 자세히 보기`}
                                className='inline-flex items-center gap-2 text-sm mt-5 bg-accent text-white px-3 py-1.5 w-fit font-semibold hover:opacity-90 transition-opacity dark:bg-darkFocus'>
                                자세히 보기
                                <span aria-hidden='true'>→</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Projects
