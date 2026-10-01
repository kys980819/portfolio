# KYS Portfolio

정보보안 담당자를 목표로, 정보보안을 기반으로 개발·운영까지 아우르는
DevSecOps를 지향하는 김윤성의 개인 포트폴리오 사이트입니다.

🔗 라이브 사이트: https://kimys.site

## 기술 스택
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend**: Next.js Route Handlers (Node.js runtime)
- **AI 챗봇**: Gemini 3.5 Flash-Lite + Interactions API + File Search (RAG)
- **Database**: MongoDB (대화 로그)
- **알림**: Telegram Bot API
- **배포**: Vercel

## 주요 기능
- 반응형 레이아웃, 라이트/다크 테마
- 이력서·프로젝트·스킬 소개 섹션
- 문서 기반(RAG) AI 챗봇 — 업로드된 이력서·분석 보고서를 근거로 방문자 질문에 응답
- 프로젝트 증빙 문서(분석 보고서 PDF) 연결

## 보안 고려사항
공개 API(챗봇)를 운영하며 적용한 방어 조치:
- **요청 남용 방지**: IP 기준 rate limit
- **입력 검증**: 메시지 길이 상한, 세션·대화 ID 타입·길이 검증(신뢰 경계)
- **대화 이력 검증**: 클라이언트가 보낸 맥락을 서버에서 sanitize·트리밍 후 사용
- **정보 노출 최소화**: health 엔드포인트 시크릿 게이트, 서버 로그에서 대화 본문 제외
- **운영 유연성**: 방어 수치(제한 횟수·길이 등)를 하드코딩하지 않고 환경변수로 관리
- 알림 메시지의 사용자 입력 이스케이프 처리

## 로컬 실행
```bash
npm install
npm run dev
```
`.env.local`에 다음 환경변수 필요 (값은 비공개):
`GEMINI_API_KEY`, `GEMINI_FILE_SEARCH_STORE_NAMES`, `MONGO_URI`, `MONGO_DB`, `MONGO_COLLECTION`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

모델 기본값은 `gemini-3.5-flash-lite`이며 `GEMINI_MODEL`로 설정할 수 있습니다.
3.8 Flash의 실제 요청이 503·시간 초과로 실패해 사용자 결정으로 Lite로 전환했습니다.
`GEMINI_TIMEOUT`은 초 단위(기본 30초), `MAX_OUTPUT_TOKENS`는 출력 토큰 상한(기본 1000)입니다.
기존 `CHAT_*` 제한과 `HEALTH_CHECK_SECRET` 설정은 유지합니다.

## Gemini 문서 등록

기존 GPT에 등록한 문서의 최신 원본 목록을 먼저 확인합니다. 다음과 같은 manifest를
Git에서 제외된 `local-notes/gemini-files.json`에 작성합니다. 경로는 프로젝트 루트 기준입니다.

```json
{
  "files": ["public/kim-yunsung-resume.pdf", "public/reports/snort-ids-report.pdf"]
}
```

위 목록은 형식 예시입니다. 실제 이전 자료 전체를 명시해야 합니다.
키가 설정된 환경에서 아래 명령으로 원본을 한 번 등록합니다(Node.js 20.6 이상).

```bash
node --env-file=.env.local scripts/gemini-file-search.mjs local-notes/gemini-files.json
```

스크립트는 저장소·문서 hash·처리 결과를 `local-notes/gemini-file-search-state.json`에
기록하며, 재실행하면 기존 작업을 이어갑니다. 등록에 실패한 경우 기록을 지우고
재등록하기 전에 Google 저장소 상태를 확인해 중복 등록을 방지하세요.
출력된 저장소 이름을 `GEMINI_FILE_SEARCH_STORE_NAMES`에 설정합니다.
여러 저장소는 쉼표로 구분합니다. 문서를 질문마다 재업로드하지 않습니다.

## Vercel 전환과 작동 확인

1. Vercel 프로젝트에서 Gemini 키·모델·문서 저장소 환경변수를 **Preview**에 설정합니다.
2. 기존 MongoDB·Telegram 설정도 Preview에서 사용할 수 있도록 준비합니다.
3. `codex/gemini-migration` 브랜치를 Preview에 배포합니다. 로컬 `.env.local`은 배포에 필요하지 않습니다.
4. 실제 챗봇에서 문서 기반 질문을 한 번 보내 답변·로딩 종료·DB 기록·Telegram 알림을 확인합니다.
5. 정상 작동하면 Production에 같은 Gemini 설정을 적용하고 운영 배포합니다.

모델 비교와 별도 상세 테스트는 생략하고 이후 문제 발생 시 조치합니다.
health 상세 응답의 서비스 이름은 `gemini`, `fileSearch`, `mongo`, `telegram`입니다.
시크릿 없는 health 응답은 기존처럼 `{ "ok": true }`만 반환합니다.

무료 티어의 실제 호출·토큰 한도는 Google AI Studio에서 확인합니다. 무료 데이터는
제품 개선에 사용될 수 있으며, File Search 최초 인덱싱에는 별도 요금 조건이 있습니다.
이전 배포를 복구하려면 기존 OpenAI 설정·문서 저장소·유효한 잔액도 필요합니다.
