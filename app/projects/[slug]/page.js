import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, caseStudySlugs } from '@/assets/caseStudies';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

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
            <p className='text-gray-600 dark:text-white/80 mt-4'>{study.summary}</p>

            {study.period && (
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-3'>기간: {study.period}</p>
            )}

            {study.techStack && study.techStack.length > 0 && (
                <div className='flex flex-wrap gap-1.5 mt-4'>
                    {study.techStack.map((tech, i) => (
                        <span
                            key={i}
                            className='text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-darkSurface dark:text-gray-300'
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}

            <div className='mt-10 space-y-8'>
                {study.sections.map(({ heading, body }, i) => (
                    <section key={i}>
                        <h2 className='text-xl font-semibold text-gray-700 dark:text-white border-b border-gray-200 dark:border-darkBorder pb-2'>
                            {heading}
                        </h2>
                        <div className='mt-3 space-y-2'>
                            {(Array.isArray(body) ? body : [body]).map((block, j) =>
                                typeof block === 'object' && block.type === 'code' ? (
                                    <pre
                                        key={j}
                                        className='my-3 p-4 rounded-lg overflow-x-auto text-xs leading-6 font-mono bg-gray-100 text-gray-800 dark:bg-darkSurface dark:text-gray-200 border border-gray-200 dark:border-darkBorder'
                                    >
                                        <code>{block.text}</code>
                                    </pre>
                                ) : (
                                    <p key={j} className='text-gray-600 dark:text-white/80 leading-8'>
                                        {block}
                                    </p>
                                )
                            )}
                        </div>
                    </section>
                ))}
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
                                {label}
                                <span aria-hidden='true'>↗</span>
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
