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
            <code key={i} className='font-mono text-[13px] bg-gray-100 dark:bg-darkSurface px-1.5 py-0.5'>
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
        <main className='px-[8%] md:px-[12%] pt-28 pb-20 max-w-4xl mx-auto min-h-screen dark:bg-darkTheme dark:text-darkText'>
            <Link
                href='/#projects'
                className='inline-flex items-center gap-1 text-sm text-sub hover:text-ink dark:text-darkSub dark:hover:text-darkText'
            >
                ← 프로젝트 목록으로
            </Link>

            <p className='text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-darkFocus mt-6 mb-3'>Case Study</p>
            <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight leading-snug'>{study.title}</h1>

            <div className='mt-6 border border-ink dark:border-darkBorder p-6'>
                <p className='text-base md:text-lg text-ink dark:text-darkText leading-relaxed'>{study.summary}</p>

                {study.period && (
                    <p className='text-sm text-sub dark:text-darkSub mt-3'>기간: {study.period}</p>
                )}

                {study.techStack && study.techStack.length > 0 && (
                    <div className='mt-4'>
                        <p className='text-xs font-bold uppercase tracking-[0.12em] text-sub dark:text-darkSub mb-2'>기술 스택</p>
                        <div className='flex flex-wrap gap-1.5'>
                            {study.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className='text-xs px-2 py-0.5 border border-gray-300 text-sub dark:border-darkSub/40 dark:text-darkSub'
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <nav aria-label='섹션 바로가기' className='flex flex-wrap gap-2 mt-4'>
                {study.sections.map(({ heading }, i) => (
                    <a
                        key={i}
                        href={`#section-${i}`}
                        className='text-xs font-semibold px-3 py-1 border border-ink dark:border-darkBorder hover:bg-ink hover:text-white dark:hover:bg-darkText dark:hover:text-darkTheme transition-colors'
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
                            <div className='border-b-2 border-ink dark:border-darkBorder pb-2'>
                                <div className='flex items-center gap-2'>
                                    <span
                                        className='shrink-0 text-xs font-bold tracking-[0.15em] text-accent dark:text-darkFocus'
                                        aria-hidden='true'
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {Icon && <Icon className='h-4 w-4 shrink-0 text-sub dark:text-darkSub' strokeWidth={1.5} aria-hidden />}
                                    <h2 className='text-xl font-bold text-ink dark:text-darkText'>{heading}</h2>
                                </div>
                            </div>
                            <div
                                className={
                                    isCallout
                                        ? 'mt-3 space-y-2 py-2 pl-4 border-l-2 border-accent dark:border-darkFocus'
                                        : 'mt-3 space-y-2'
                                }
                            >
                                {(Array.isArray(body) ? body : [body]).map((block, j) =>
                                    typeof block === 'object' && block.type === 'code' ? (
                                        <pre
                                            key={j}
                                            className='my-3 p-4 overflow-x-auto text-xs leading-6 font-mono bg-gray-100 text-ink dark:bg-darkSurface dark:text-darkText border border-ink dark:border-darkBorder'
                                        >
                                            <code>{block.text}</code>
                                        </pre>
                                    ) : (
                                        <p
                                            key={j}
                                            className={
                                                isCallout
                                                    ? 'text-sm text-ink dark:text-darkText leading-7'
                                                    : 'text-sub dark:text-darkSub leading-8'
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
                <div className='mt-12 pt-6 border-t-2 border-ink dark:border-darkBorder'>
                    <p className='text-xs font-bold uppercase tracking-[0.12em] text-sub dark:text-darkSub mb-3'>증빙 문서</p>
                    <div className='flex flex-col gap-2'>
                        {study.attachments.map(({ label, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={`${label} 열기 (PDF)`}
                                className='inline-flex items-center gap-2 text-sm font-semibold border border-ink px-3 py-1.5 w-fit dark:border-darkBorder hover:bg-ink hover:text-white dark:hover:bg-darkText dark:hover:text-darkTheme transition-colors'
                            >
                                <FileText className='h-4 w-4 text-sub dark:text-darkSub' strokeWidth={1.5} aria-hidden />
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
