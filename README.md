# KYS Portfolio

정보보안 담당자를 목표로, 정보보안을 기반으로 개발·운영까지 아우르는
DevSecOps를 지향하는 김윤성의 개인 포트폴리오 사이트입니다.

🔗 라이브 사이트: https://kysportfolio.site

## 기술 스택
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend**: Next.js Route Handlers (Node.js runtime)
- **AI 챗봇**: OpenAI Responses API + Vector Store (RAG, file_search)
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
`OPENAI_API_KEY`, `VECTOR_STORE_IDS`, `MONGO_URI`, `MONGO_DB`, `MONGO_COLLECTION`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
