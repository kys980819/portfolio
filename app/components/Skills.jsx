import React from 'react'

const skillsData = [
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
    category: 'Security (학습 중)',
    skills: ['네트워크 기초 (OSI/TCP/IP)', '보안 장비 (방화벽/IDS/IPS)', '악성코드 분석 (VirusTotal/정적/동적)']
  },
  {
    category: 'Tools',
    skills: ['Git/GitHub', 'Cursor', 'VS Code', 'Linux/Ubuntu']
  },
  {
    category: 'Currently Learning',
    skills: ['악성코드 분석 심화', '정보처리기사 실기']
  }
]

const Skills = () => {
  return (
    <div id='skills' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg'>What I Work With</h4>
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
