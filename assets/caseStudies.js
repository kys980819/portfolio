// 프로젝트 케이스 스터디 본문 데이터 (콘텐츠/코드 분리)
// 새 프로젝트 상세 페이지를 추가할 때: 이 객체에 slug를 키로 항목만 추가하고,
// assets.js의 해당 serviceData 항목에 같은 slug 값을 넣으면 카드에 "자세히 보기"가 노출된다.
// 본문(body)의 각 항목은 문자열(일반 문단) 또는 { type: 'code', text } (모노스페이스 블록)이다.
// 모든 사실의 출처: public/reports/snort-ids-report.pdf, malware-report-cean-agenttesla.pdf,
// serviceData(assets.js). 보고서에 없는 사실은 넣지 않는다.
// 민감정보 정책: C2 도메인·IP는 보고서와 동일하게 무해화 표기([.]), 공격자 이메일 계정은 일부 마스킹.

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
                    '이론 학습에 머물지 않고 실무와 유사한 보안관제·악성코드 분석 환경을 직접 부딪히며 경험하기 위해 기획했다. 학습한 네트워크 기초 지식을 실제 트래픽·패킷 분석에 적용하고, 실제 악성코드 검체를 분석해 동작 원리를 이해하고, 도출한 지표로 탐지 룰을 직접 작성·검증해 보고서까지 작성하는 것 — 보안관제 실무의 전체 흐름을 경험하는 것이 목표였다.',
                    '탐지 환경 구성 → 악성코드 샘플 선정 → 악성코드 분석 → 분석 보고서 작성 → 탐지 룰 작성 → 탐지 검증의 파이프라인 순서로 전 과정을 단독 수행했다. 코드·메모리 단위의 심화 분석은 이번 범위에서 제외했다.',
                ],
            },
            {
                heading: '탐지 환경 구축',
                body: [
                    'VMware 기반의 격리된 Windows 11 환경에, Snort가 탐지한 경보를 MySQL에 저장하고 BASE가 이를 읽어 웹 대시보드로 보여주는 구조를 구축했다. Snort 2.9.2.3 설치·ICMP 탐지 확인 → XAMPP 1.7.1(Apache·PHP·MySQL) 설치 → snort DB·스키마 생성 → snort.conf에 output database 설정 → ADOdb 5.20.21 배치 → BASE 1.4.5 연결 순서다.',
                    '최신 Snort 3는 Windows를 공식 지원하지 않아, Windows를 공식 지원하는 Snort 2를 선택했다. 대시보드는 Splunk(상용 완성품)·ELK(Snort 2 연동 난이도)와 비교한 뒤 Windows에서 구성 가능하고 탐지 흐름 이해에 적합한 BASE를 채택했다.',
                    '당초 악성코드 실행 VM과 탐지 VM을 분리한 2대 구조를 의도했으나, 가상 환경은 트래픽 미러링(복사)을 지원하지 않아 목적지 외 패킷을 볼 수 없었다. 이 제약으로 탐지 VM 내부에서 검체를 직접 실행하는 단일 VM 구조로 재설계했다. 최신 버전 간 호환성 문제(Snort의 output database 기능 제거, PHP 5.2 비호환)는 기능이 남아 있는 구버전으로 다운그레이드해 해결했다.',
                ],
            },
            {
                heading: '검체 선별',
                body: [
                    '샘플 선정 기준을 두 가지로 세웠다. 첫째, C2(공격자가 감염 호스트를 원격 제어하는 서버) 통신이 발생할 것 — 탐지 룰을 작성할 대상이 생기기 때문이다. 둘째, 통신이 암호화되지 않은 평문일 것 — payload 기반 Snort 시그니처를 작성하려면 패킷 내용을 읽을 수 있어야 한다.',
                    '수집처는 가입 없이 다운로드가 가능하고 태그 검색을 지원하는 MalwareBazaar를 선정했다. 등록 샘플 상당수가 C2 종료 상태이거나 암호화 통신을 사용해 조건에 맞는 검체를 찾기 어려웠고, 다수 샘플을 직접 내려받아 CurrPorts와 Wireshark로 C2 통신·평문 여부를 반복 확인하는 방식으로 AgentTesla 패밀리의 CEaN.exe(VirusTotal 54/69 탐지)를 선별했다.',
                ],
            },
            {
                heading: '악성코드 분석',
                body: [
                    '기초·정적·동적·네트워크 분석을 차례로 적용했다. CEaN.exe는 .NET 내부 압축·난독화로 페이로드를 숨긴 형태로, de4dot은 난독화 종류 식별에 실패했고 mal_unpack으로 메모리 모듈을 일부 덤프해 위장 정황(호텔 관리 서비스·시스템 최적화 도구 등 삼중 위장 메타데이터, 한국어 리소스)을 확보했다. 핵심 정보는 정적 분석만으로 드러나지 않아, 실제 악성 행위의 결정적 증거는 동적 분석으로 검체를 실행해 확보했다.',
                    '실행 시 자기 자신을 자식 프로세스로 재실행해 본체를 동작시키고, %APPDATA%\\Roaming\\JVKPZv.exe로 자기복사한 뒤 시스템·숨김(S·H) 속성으로 은폐한다. .ps1 런처를 드롭하고 HKCU Run 키에 PowerShell 실행 항목을 등록해 로그인 시마다 자동 재실행되는 지속성을 확보한다(정상 도구를 악용하는 LotL 기법). 이후 브라우저(Chrome·Edge 등)·VPN·FTP·메일의 자격증명을 수집하고, ip-api[.]com으로 분석 환경 여부를 정찰한 뒤, 수집 정보를 onionmail[.]org로 평문 SMTP를 통해 유출한다 — 메일 전송 완료 응답까지 확인해 실제 유출을 검증했다.',
                    '분석 결과로 파일·레지스트리·네트워크 침해지표(IOC)를 정리했다. 주요 항목은 다음과 같다(도메인·IP는 무해화 표기, 공격자 메일 계정은 일부 마스킹).',
                    {
                        type: 'code',
                        text: [
                            '[파일]      %APPDATA%\\Roaming\\JVKPZv.exe (자기복사본, S·H 속성 은폐)',
                            '[파일]      %LOCALAPPDATA%\\Temp\\<랜덤>.ps1 (지속성 런처, 파일명 가변)',
                            '[레지스트리] HKCU\\...\\Run\\JVKPZv = powershell.exe -NoProfile',
                            '            -ExecutionPolicy Bypass -WindowStyle Hidden -File "...\\<랜덤>.ps1"',
                            '[네트워크]   mail[.]onionmail[.]org:25 — 평문 SMTP 유출 서버',
                            '[네트워크]   onionmail 관측 IP 3종 (DNS A레코드 순환, 단독 차단 부적합)',
                            '[네트워크]   ip-api[.]com:80 GET /line/?fields=hosting — 분석 환경 정찰',
                            '[네트워크]   발신 send***@onionmail[.]org / 수신 origin***@onionmail[.]org',
                            '[네트워크]   유출 메일 제목 패턴 PW_<username>/<computername>',
                        ].join('\n'),
                    },
                ],
            },
            {
                heading: '탐지 룰 작성·검증',
                body: [
                    '도출한 IOC를 바탕으로 Snort 2 문법 탐지 룰 9종을 작성했다. 단일 지표에 의존하지 않도록 C2 IP 통신, 외부 SMTP, 악성 도메인 DNS 질의 2종, 정찰 URI, SMTP 발신·수신 주소, 유출 메일 제목, 유출 본문 시그니처까지 정찰~유출의 각 단계를 겹겹이 커버하도록 구성했다. 대표 룰은 다음과 같다.',
                    {
                        type: 'code',
                        text: 'alert tcp $HOME_NET any -> $EXTERNAL_NET 80\n  (msg:"[AgentTesla] ip-api reconnaissance request";\n   flow:established,to_server;\n   content:"/line/?fields=hosting"; http_uri; nocase;\n   sid:1000007; rev:1;)',
                    },
                    'sid:1000007은 CEaN.exe가 ip-api[.]com에 분석 환경 여부를 묻던 정찰 패킷 기반 룰이다. flow:established,to_server로 연결 수립 후 클라이언트→서버 방향 패킷만 검사해 오탐을 줄이고, http_uri로 이 검체만 쓰는 특정 요청 경로를 URI 영역에 한정해 매칭한다. nocase는 대소문자 우회를 방지한다.',
                    '검증은 BASE 대시보드 준비 → snort -W로 캡처 인터페이스 확인 → IDS 모드 실행(-k none) → 사전 등록한 ICMP 테스트 룰로 탐지 파이프라인 정상 동작 점검 → 검체 실행 순으로 진행했다. 실행 결과 ip-api 정찰(sid:1000007), 악성 도메인 DNS 질의(sid:1000005·1000006), SMTP 발신·수신 주소(sid:1000008·1000009), 유출 본문(sid:1000011) 등이 Snort 실시간 로그와 BASE 대시보드에 탐지·출력되어, 정찰부터 유출까지 악성 행위의 각 단계가 작성한 룰에 포착됨을 검증했다.',
                ],
            },
            {
                heading: '트러블슈팅 — 체크섬 오프로드로 인한 탐지 누락',
                body: [
                    '룰을 local.rules에 저장하고 검증했으나 여러 번 시도해도 탐지되지 않았다. 원인을 단계적으로 배제하며 좁혔다. ① Wireshark 캡처로 악성코드가 여전히 통신 중임을 확인해 트래픽 부재 가능성을 배제하고 ② snort -W 재확인으로 인터페이스 번호 오지정을 정정했으나 여전히 미탐지, ③ ICMP 테스트 룰(sid:1000099)이 정상 동작해 룰 문법과 Snort 엔진 파이프라인에는 문제가 없음을 확인했다.',
                    '④ 남은 원인은 체크섬 오프로드였다. 이 환경에서는 악성코드가 체크섬을 비워둔 채 패킷을 만들고 랜카드(하드웨어)가 마지막에 채워 내보내는데, Snort는 랜카드에 도달하기 전의 패킷을 캡처하므로 체크섬이 빈 패킷을 비정상으로 판단해 룰 매칭 없이 버리고 있었다. 체크섬 검증을 비활성화하는 -k none 옵션을 적용하자 작성한 룰이 정상 탐지되었다.',
                    '이 과정에서 원인 구간을 가르는 테스트 룰의 유용성을 확인해, 테스트 룰을 삭제하지 않고 검증 절차의 사전 단계로 상시 편입했다.',
                ],
            },
        ],
        attachments: [
            { label: 'Snort IDS 탐지 프로젝트 보고서', href: '/reports/snort-ids-report.pdf' },
            { label: '악성코드 분석 보고서 — CEaN.exe (AgentTesla)', href: '/reports/malware-report-cean-agenttesla.pdf' },
        ],
    },
};

export const caseStudySlugs = Object.keys(caseStudies);
