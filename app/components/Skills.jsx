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
    <div id='skills' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h2 className='text-center text-3xl font-bold'>Skills</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12'>
        {skillsData.map((group, index) => (
          <div key={index} className='rounded-lg border border-line bg-panel overflow-hidden dark:border-darkBorder dark:bg-darkSurface'>
            <div className='border-b border-line px-5 py-3 dark:border-darkBorder'>
              <h3 className='font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink dark:text-darkText'>{group.category}</h3>
            </div>
            <div className='flex flex-wrap gap-2 px-5 py-4'>
              {group.skills.map((skill, i) => (
                <span key={i} className='text-sm px-2.5 py-1 rounded bg-pageBg text-ink/90 border border-line dark:bg-darkTheme dark:text-darkText/90 dark:border-darkBorder'>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
