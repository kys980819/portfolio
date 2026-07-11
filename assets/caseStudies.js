// 프로젝트 케이스 스터디 본문 데이터 (콘텐츠/코드 분리)
// 새 프로젝트 상세 페이지를 추가할 때: 이 객체에 slug를 키로 항목만 추가하고,
// assets.js의 해당 serviceData 항목에 같은 slug 값을 넣으면 카드에 "자세히 보기"가 노출된다.
// 모든 사실은 serviceData(assets.js) 또는 사이트에 이미 렌더링되는 텍스트에서만 가져온다.

export const caseStudies = {
    'snort-ids-cean-agenttesla': {
        slug: 'snort-ids-cean-agenttesla',
        title: 'Snort IDS 탐지 환경 구축 + 악성코드 분석 (CEaN.exe / 정보탈취형)',
        summary:
            'VMware 격리 환경에 Snort 기반 IDS를 직접 구축하고, 정보탈취형 악성코드를 분석해 IOC 기반 탐지 룰을 작성·검증한 메인 프로젝트',
        period: '2026.05.11 ~ 2026.06.05',
        techStack: ['Snort', 'VMware', 'BASE', 'MalwareBazaar', 'Wireshark', 'Process Monitor'],
        sections: [
            {
                heading: '목표',
                body: [
                    '격리된 실습 환경에서 IDS를 직접 세우고, 실제 정보탈취형 악성코드를 분석해 그 행위를 잡아내는 탐지 룰을 작성·검증하는 것을 목표로 삼았다.',
                    '탐지 환경 구축 → 검체 선별 → 악성코드 분석 → IOC 기반 룰 작성 → BASE에서 탐지 검증까지, 관제 실무의 흐름을 처음부터 끝까지 직접 밟는 데 초점을 뒀다.',
                ],
            },
            {
                heading: '탐지 환경 구축',
                body: [
                    'VMware 격리 환경에 Snort 2.9.2.3 + BASE + MySQL 기반 IDS 탐지 환경을 직접 구축했다.',
                    'Windows 미러링 제약은 단일 VM 구조로 재설계해 우회했고, 버전 호환성 문제는 다운그레이드로 해결했다.',
                ],
            },
            {
                heading: '검체 선별',
                body: '"C2 통신·평문 통신" 두 기준을 직접 세워, MalwareBazaar에서 반복 검증을 거쳐 분석 대상(정보탈취형) 검체를 선별했다.',
            },
            {
                heading: '악성코드 분석',
                body: [
                    '기초·정적·동적·네트워크 분석을 차례로 적용해, 자격증명 수집 → 평문 SMTP 유출(전송 완료 응답까지) → Run 키 지속성으로 이어지는 악성 행위를 실증했다.',
                    '이를 근거로 파일·레지스트리·네트워크 단위의 IOC를 도출했다. (코드·메모리 단위 리버싱은 이번 분석 범위 밖으로 두었다.)',
                ],
            },
            {
                heading: '탐지 룰 작성·검증',
                body: '도출한 IOC를 기반으로 Snort 룰을 작성하고, BASE 대시보드에서 실제 탐지되는지 검증했다.',
            },
            {
                heading: '트러블슈팅',
                body: '탐지 누락 원인을 트래픽 → 인터페이스 → 룰 문법 → 패킷 처리 순으로 구간을 나눠 좁혔고, 체크섬 오프로드 문제로 규명해 -k none 옵션으로 해결했다.',
            },
        ],
        attachments: [
            { label: 'Snort IDS 탐지 프로젝트 보고서', href: '/reports/snort-ids-report.pdf' },
            { label: '악성코드 분석 보고서 — CEaN.exe (AgentTesla)', href: '/reports/malware-report-cean-agenttesla.pdf' },
        ],
    },
};

export const caseStudySlugs = Object.keys(caseStudies);
