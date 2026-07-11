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
    <div className='max-w-5xl mx-auto mt-2'>
      <p className='text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3'>최신 글</p>
      <ul className='flex flex-col gap-2'>
        {posts.map(({ title, link, pubDate }) => (
          <li key={link}>
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-between gap-4 border border-gray-300 rounded-lg px-5 py-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 dark:border-darkBorder'
            >
              <span className='text-sm text-gray-700 dark:text-white/90 truncate'>{title}</span>
              <span className='flex items-center gap-2 shrink-0 text-xs text-gray-500 dark:text-gray-400'>
                {formatDate(pubDate)}
                <ArrowUpRight
                  className='h-4 w-4 text-gray-400 group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-200 transition-colors'
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
