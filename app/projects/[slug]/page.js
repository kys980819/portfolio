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
            <code key={i} className='font-mono text-[13px] bg-gray-100 dark:bg-darkSurface px-1.5 py-0.5 rounded'>
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
        <main className='px-[8%] md:px-[12%] pt-28 pb-20 max-w-4xl mx-auto min-h-screen dark:bg-darkTheme dark:text-white'>
            <Link
                href='/#projects'
                className='inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
            >
                ← 프로젝트 목록으로
            </Link>

            <h1 className='font-Ovo text-3xl md:text-4xl mt-6 leading-snug'>{study.title}</h1>

            <div className='mt-6 rounded-xl border border-gray-200 dark:border-darkBorder bg-gray-50 dark:bg-darkSurface/40 p-6'>
                <p className='text-base md:text-lg text-gray-700 dark:text-white/90 leading-relaxed'>{study.summary}</p>

                {study.period && (
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-3'>기간: {study.period}</p>
                )}

                {study.techStack && study.techStack.length > 0 && (
                    <div className='mt-4'>
                        <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2'>기술 스택</p>
                        <div className='flex flex-wrap gap-1.5'>
                            {study.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className='text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-darkSurface dark:text-gray-300'
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
                        className='text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-darkBorder hover:bg-gray-50 dark:hover:bg-darkHover transition-colors'
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
                            <div className='border-b border-gray-200 dark:border-darkBorder pb-2'>
                                <div className='flex items-center gap-2'>
                                    <span
                                        className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-300 dark:border-darkBorder text-xs font-semibold text-gray-500 dark:text-gray-400'
                                        aria-hidden='true'
                                    >
                                        {i + 1}
                                    </span>
                                    {Icon && <Icon className='h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400' strokeWidth={1.5} aria-hidden />}
                                    <h2 className='text-xl font-semibold text-gray-700 dark:text-white'>{heading}</h2>
                                </div>
                            </div>
                            <div
                                className={
                                    isCallout
                                        ? 'mt-3 space-y-2 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30'
                                        : 'mt-3 space-y-2'
                                }
                            >
                                {(Array.isArray(body) ? body : [body]).map((block, j) =>
                                    typeof block === 'object' && block.type === 'code' ? (
                                        <pre
                                            key={j}
                                            className='my-3 p-4 rounded-lg overflow-x-auto text-xs leading-6 font-mono bg-gray-100 text-gray-800 dark:bg-darkSurface dark:text-gray-200 border border-gray-200 dark:border-darkBorder'
                                        >
                                            <code>{block.text}</code>
                                        </pre>
                                    ) : (
                                        <p
                                            key={j}
                                            className={
                                                isCallout
                                                    ? 'text-sm text-blue-600 dark:text-blue-200 leading-7'
                                                    : 'text-gray-600 dark:text-white/80 leading-8'
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
                <div className='mt-12 pt-6 border-t border-gray-200 dark:border-darkBorder'>
                    <p className='text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3'>증빙 문서</p>
                    <div className='flex flex-col gap-2'>
                        {study.attachments.map(({ label, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={`${label} 열기 (PDF)`}
                                className='inline-flex items-center gap-2 text-sm border border-gray-400 rounded-lg px-3 py-1.5 w-fit dark:border-darkBorder hover:bg-gray-50 dark:hover:bg-darkHover'
                            >
                                <FileText className='h-4 w-4 text-gray-500 dark:text-gray-400' strokeWidth={1.5} aria-hidden />
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
