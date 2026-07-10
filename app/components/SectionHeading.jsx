import Reveal from './Reveal'

// 콘솔 무드의 섹션 헤더 — 모노 커커(장식) + 제목.
// kicker는 순수 장식 라벨, title은 기존 섹션명 텍스트를 그대로 받음.
const SectionHeading = ({ kicker, title, align = 'left' }) => {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <p className="font-mono text-sm text-accentDark dark:text-accent">
        <span className="text-gray-400 dark:text-gray-600">{'//'}</span> {kicker}
      </p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-lightInk dark:text-white break-keep">
        {title}
      </h2>
    </Reveal>
  )
}

export default SectionHeading
