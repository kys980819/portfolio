import React from 'react'

const skillsData = [
  {
    category: '탐지 · 관제',
    skills: [
      'Snort (IDS 탐지 환경 구축·룰 작성)',
      'BASE (탐지 대시보드) · MySQL/XAMPP (구동 환경)',
      '보안 장비 개념 이해 (방화벽/IDS/IPS)'
    ]
  },
  {
    category: '악성코드 분석',
    skills: [
      '정적: VirusTotal · ExeinfoPE · DIE · BinText · PEview',
      '언패킹: mal_unpack · de4dot',
      '동적: Process Monitor · Process Explorer · Autoruns',
      '네트워크: Wireshark · CurrPorts · SmartSniff'
    ]
  },
  {
    category: '네트워크',
    skills: [
      '네트워크 기초 (OSI 7계층 · TCP/IP · HTTP/HTTPS · SSH · DNS)',
      '패킷 분석 (Wireshark) — 악성코드 통신·유출 분석',
      '홈네트워크 구성·장애 진단 (스위치 교체·서브넷 통합)'
    ]
  },
  {
    category: 'OS · 가상화 · 클라우드',
    skills: ['Linux/Ubuntu', 'Windows', 'VMware', 'AWS EC2', 'Vercel']
  },
  {
    category: '개발',
    skills: ['JavaScript', 'React', 'Next.js', 'HTML/CSS', 'Node.js', 'Python/Flask', 'OpenAI API', 'MongoDB', 'Supabase']
  },
  {
    category: 'DevOps · 협업 · 문서화',
    skills: ['Git/GitHub', 'GitHub Actions', 'Cursor', 'VS Code', '분석 보고서·노트 작성', 'MS Word', 'PowerPoint']
  }
]

const Skills = () => {
  return (
    <div id='skills' className='w-full border-b border-ink dark:border-darkBorder scroll-mt-20'>
      <div className='max-w-5xl mx-auto px-5 lg:px-8 py-16 md:py-20'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-darkFocus mb-3'>02 — Capabilities</p>
        <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight'>Skills</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink dark:border-darkBorder mt-12'>
          {skillsData.map((group, index) => (
            <div key={index} className='border-r border-b border-ink dark:border-darkBorder p-6'>
              <p className='text-xs font-bold tracking-[0.15em] text-accent dark:text-darkFocus mb-2'>{String(index + 1).padStart(2, '0')}</p>
              <h3 className='font-bold text-ink dark:text-darkText mb-3'>{group.category}</h3>
              <div className='flex flex-wrap gap-1.5'>
                {group.skills.map((skill, i) => (
                  <span key={i} className='text-sm px-2.5 py-1 border border-gray-300 text-sub dark:border-darkSub/40 dark:text-darkSub'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills
