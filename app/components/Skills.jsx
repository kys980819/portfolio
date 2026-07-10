import React from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

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
    <div id='skills' className='w-full px-[8%] lg:px-[10%] py-20 scroll-mt-20 bg-lightHover/60 dark:bg-darkSurface/40'>
      <div className='max-w-6xl mx-auto'>
        <SectionHeading kicker='SKILLS' title='Skills' />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12'>
          {skillsData.map((group, index) => (
            <Reveal key={index} delay={index * 60}
              className='rounded-xl border border-lightBorder bg-lightSurface p-6 shadow-panel hover:border-accentDark/50 dark:border-darkBorder dark:bg-darkSurface dark:hover:border-accent/50 transition-colors'>
              <h3 className='font-mono text-sm font-semibold text-accentDark dark:text-accent mb-4'>
                <span className='text-gray-400 dark:text-gray-600'>#</span> {group.category}
              </h3>
              <ul className='flex flex-wrap gap-2'>
                {group.skills.map((skill, i) => (
                  <li key={i} className='font-mono text-xs px-2.5 py-1 rounded border border-lightBorder text-gray-600 dark:border-darkBorder dark:text-gray-300 break-keep'>
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills
