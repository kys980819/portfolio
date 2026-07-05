import React from 'react'

const skillsData = [
  {
    category: 'Security',
    skills: [
      'Snort (IDS 탐지 환경 구축·룰 작성)',
      'BASE (탐지 대시보드) · MySQL/XAMPP (구동 환경)',
      '네트워크 기초 (OSI/TCP/IP)',
      '보안 장비 (방화벽/IDS/IPS)',
      '정적 분석: VirusTotal · ExeinfoPE · DIE · BinText · PEview',
      '언패킹: mal_unpack · de4dot',
      '동적 분석: Process Monitor · Process Explorer · Autoruns · Wireshark',
      '네트워크 분석: CurrPorts · SmartSniff · Wireshark',
      '홈네트워크 구성·장애 진단 (스위치 교체·Wi-Fi/SSD 원인 분리)'
    ]
  },
  {
    category: 'Frontend',
    skills: ['JavaScript', 'React', 'Next.js', 'HTML/CSS']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Flask (Python)', 'OpenAI API']
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'Supabase']
  },
  {
    category: 'DevOps / Cloud',
    skills: ['AWS EC2', 'Vercel', 'GitHub Actions']
  },
  {
    category: 'Tools',
    skills: ['Git/GitHub', 'Cursor', 'VS Code', 'Linux/Ubuntu', 'VMware']
  },
  {
    category: '문서화',
    skills: ['분석 보고서·분석 노트 작성', 'MS Word', 'PowerPoint']
  }
]

const Skills = () => {
  return (
    <div id='skills' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h2 className='text-center text-5xl'>Skills</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12'>
        {skillsData.map((group, index) => (
          <div key={index} className='border border-gray-400 rounded-xl p-6 dark:border-darkBorder'>
            <h3 className='font-semibold text-gray-800 dark:text-white mb-3'>{group.category}</h3>
            <div className='flex flex-wrap gap-2'>
              {group.skills.map((skill, i) => (
                <span key={i} className='text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-darkSurface dark:text-gray-300'>
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
