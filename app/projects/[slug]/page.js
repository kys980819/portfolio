import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, caseStudySlugs } from '@/assets/caseStudies';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Target, ServerCog, Filter, Bug, ShieldCheck, Wrench, FileText, ArrowUpRight } from 'lucide-react';

// caseStudies.js 섹션의 icon 키 → lucide 아이콘 매핑
const sectionIcons = { Target, ServerCog, Filter, Bug, ShieldCheck, Wrench };

// 문단 내 백틱(`...`) 구간을 인라인 코드로 렌더링
function renderWithCode(text) {
    return text.split(/(`[^`]+`)/g).map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
            <code key={i} className='font-mono text-[13px] bg-pageBg border border-line dark:border-darkBorder dark:bg-darkSurface px-1.5 py-0.5 rounded'>
                {part.slice(1, -1)}
            </code>
        ) : (
            part
        )
    );
}

export function generateStaticParams() {
    return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const study = caseStudies[slug];
    if (!study) return {};

    return {
        title: study.title,
        description: study.summary,
        openGraph: {
            title: study.title,
            description: study.summary,
            url: `/projects/${slug}`,
            type: 'article',
        },
    };
}

export default async function CaseStudyPage({ params }) {
    const { slug } = await params;
    const study = caseStudies[slug];
    if (!study) notFound();

    return (
        <>
        <Navbar />
        <main className='px-[8%] md:px-[12%] pt-28 pb-20 max-w-4xl mx-auto min-h-screen dark:text-darkText'>
            <Link
                href='/#projects'
                className='inline-flex items-center gap-1 text-sm text-inkMuted hover:text-ink dark:text-darkMuted dark:hover:text-darkText'
            >
                ← 프로젝트 목록으로
            </Link>

            <h1 className='text-3xl md:text-4xl font-bold mt-6 leading-snug'>{study.title}</h1>

            <div className='mt-6 rounded-lg border border-line dark:border-darkBorder bg-panel dark:bg-darkSurface overflow-hidden'>
                <div className='flex items-center justify-between border-b border-line px-6 py-3 dark:border-darkBorder'>
                    <span className='font-mono text-xs font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>Case Study</span>
                    <span className='rounded bg-ok-soft px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-ok dark:bg-emerald-900/45 dark:text-emerald-300'>VERIFIED</span>
                </div>
                <div className='p-6'>
                <p className='text-base md:text-lg text-ink dark:text-darkText/90 leading-relaxed'>{study.summary}</p>

                {study.period && (
                    <p className='font-mono text-sm text-inkMuted dark:text-darkMuted mt-3'>기간: {study.period}</p>
                )}

                {study.techStack && study.techStack.length > 0 && (
                    <div className='mt-4'>
                        <p className='font-mono text-xs font-bold uppercase tracking-[0.12em] text-inkMuted dark:text-darkMuted mb-2'>기술 스택</p>
                        <div className='flex flex-wrap gap-1.5'>
                            {study.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className='text-xs px-2 py-0.5 rounded bg-pageBg text-ink/80 border border-line dark:bg-darkTheme dark:text-darkText/80 dark:border-darkBorder'
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                </div>
            </div>

            <nav aria-label='섹션 바로가기' className='flex flex-wrap gap-2 mt-4'>
                {study.sections.map(({ heading }, i) => (
                    <a
                        key={i}
                        href={`#section-${i}`}
                        className='text-xs px-3 py-1 rounded-md border border-line bg-panel hover:bg-pageBg dark:bg-darkSurface dark:border-darkBorder dark:hover:bg-darkHover transition-colors'
                    >
                        {heading}
                    </a>
                ))}
            </nav>

            <div className='mt-10 space-y-8'>
                {study.sections.map(({ heading, icon, variant, body }, i) => {
                    const Icon = sectionIcons[icon];
                    const isCallout = variant === 'callout';
                    return (
                        <section key={i} id={`section-${i}`} className='scroll-mt-24'>
                            <div className='border-b border-line dark:border-darkBorder pb-2'>
                                <div className='flex items-center gap-2'>
                                    <span
                                        className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line dark:border-darkBorder font-mono text-xs font-bold text-inkMuted dark:text-darkMuted'
                                        aria-hidden='true'
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {Icon && <Icon className='h-4 w-4 shrink-0 text-accent dark:text-accent-dark' strokeWidth={1.5} aria-hidden />}
                                    <h2 className='text-xl font-bold text-ink dark:text-darkText'>{heading}</h2>
                                </div>
                            </div>
                            <div
                                className={
                                    isCallout
                                        ? 'mt-3 space-y-2 p-4 rounded-lg bg-info-soft/60 dark:bg-blue-900/20 border border-info/20 dark:border-blue-800/30'
                                        : 'mt-3 space-y-2'
                                }
                            >
                                {(Array.isArray(body) ? body : [body]).map((block, j) =>
                                    typeof block === 'object' && block.type === 'code' ? (
                                        <pre
                                            key={j}
                                            className='my-3 p-4 rounded-lg overflow-x-auto text-xs leading-6 font-mono bg-pageBg text-ink dark:bg-darkSurface dark:text-darkText border border-line dark:border-darkBorder'
                                        >
                                            <code>{block.text}</code>
                                        </pre>
                                    ) : (
                                        <p
                                            key={j}
                                            className={
                                                isCallout
                                                    ? 'text-sm text-ink/80 dark:text-blue-200 leading-7'
                                                    : 'text-ink/80 dark:text-darkText/80 leading-8'
                                            }
                                        >
                                            {renderWithCode(block)}
                                        </p>
                                    )
                                )}
                            </div>
                        </section>
                    );
                })}
            </div>

            {study.attachments && study.attachments.length > 0 && (
                <div className='mt-12 pt-6 border-t border-line dark:border-darkBorder'>
                    <p className='font-mono text-xs font-bold uppercase tracking-[0.12em] text-inkMuted dark:text-darkMuted mb-3'>증빙 문서</p>
                    <div className='flex flex-col gap-2'>
                        {study.attachments.map(({ label, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={`${label} 열기 (PDF)`}
                                className='inline-flex items-center gap-2 text-sm border border-line bg-panel rounded-md px-3 py-1.5 w-fit dark:border-darkBorder dark:bg-darkSurface hover:bg-pageBg dark:hover:bg-darkHover'
                            >
                                <FileText className='h-4 w-4 text-inkMuted dark:text-darkMuted' strokeWidth={1.5} aria-hidden />
                                {label}
                                <ArrowUpRight className='h-3.5 w-3.5' aria-hidden />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </main>
        <Footer />
        </>
    );
}
