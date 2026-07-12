import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const VELOG_RSS_URL = 'https://v2.velog.io/rss/@kys980819'
const MAX_POSTS = 3

// 새 의존성 금지 → XML 파서 없이 정규식으로 item의 title/link/pubDate만 추출
function parseRssItems(xml) {
  const items = []
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) || []
  for (const block of itemBlocks.slice(0, MAX_POSTS)) {
    const title =
      block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ??
      block.match(/<title>([\s\S]*?)<\/title>/)?.[1]
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]
    if (title && link) items.push({ title: title.trim(), link: link.trim(), pubDate })
  }
  return items
}

function formatDate(pubDate) {
  if (!pubDate) return ''
  const d = new Date(pubDate)
  if (isNaN(d)) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`
}

// fetch·파싱 실패 또는 빈 결과면 null 반환 → 영역 자체를 조용히 숨김 (페이지 렌더는 유지)
const VelogLatest = async () => {
  let posts = []
  try {
    const res = await fetch(VELOG_RSS_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    posts = parseRssItems(await res.text())
  } catch {
    return null
  }
  if (posts.length === 0) return null

  return (
    <div className='max-w-5xl mx-auto mt-2 rounded-lg border border-line bg-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface'>
      <div className='flex items-center justify-between border-b border-line px-5 py-3 dark:border-darkBorder'>
        <p className='font-mono text-xs font-bold uppercase tracking-[0.15em] text-inkMuted dark:text-darkMuted'>최신 글</p>
        <span className='rounded bg-info-soft px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-info dark:bg-blue-900/45 dark:text-blue-300'>
          LIVE
        </span>
      </div>
      <ul className='flex flex-col'>
        {posts.map(({ title, link, pubDate }) => (
          <li key={link} className='border-b border-line last:border-b-0 dark:border-darkBorder'>
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-between gap-4 px-5 py-3 hover:bg-pageBg transition-colors dark:hover:bg-darkHover'
            >
              <span className='text-sm text-ink dark:text-darkText/90 truncate'>{title}</span>
              <span className='flex items-center gap-2 shrink-0 font-mono text-xs text-inkMuted dark:text-darkMuted'>
                {formatDate(pubDate)}
                <ArrowUpRight
                  className='h-4 w-4 text-inkMuted group-hover:text-ink dark:text-darkMuted dark:group-hover:text-darkText transition-colors'
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VelogLatest
