import { GoogleGenAI } from '@google/genai';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, basename, extname } from 'node:path';

// 명시한 원본만 등록. 키는 환경변수에서 가져오고 결과 파일에 저장하지 않음.
const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error('사용법: node scripts/gemini-file-search.mjs <manifest.json>');
  process.exit(1);
}

async function main() {
  const manifest = JSON.parse(await readFile(resolve(manifestPath), 'utf8'));
  if (!Array.isArray(manifest.files) || !manifest.files.length) {
    throw new Error('manifest.files에 업로드할 원본 경로를 명시하세요.');
  }
  const files = await Promise.all(manifest.files.map(async path => {
    const absolutePath = resolve(path);
    const bytes = await readFile(absolutePath);
    return { path: absolutePath, sha256: createHash('sha256').update(bytes).digest('hex') };
  }));
  if (new Set(files.map(file => file.sha256)).size !== files.length) {
    throw new Error('목록에 내용이 동일한 파일이 있습니다. 중복을 제거하세요.');
  }
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error('GEMINI_API_KEY 환경변수를 먼저 설정하세요.');
  const ai = new GoogleGenAI({ apiKey, httpOptions: { timeout: 60000 } });
  const statePath = resolve('local-notes/gemini-file-search-state.json');
  let state;
  try {
    state = JSON.parse(await readFile(statePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const store = await ai.fileSearchStores.create({ config: { displayName: 'Portfolio documents' } });
    state = { storeName: store.name, files: [] };
  }
  const save = async () => {
    await mkdir(dirname(statePath), { recursive: true });
    await writeFile(statePath, JSON.stringify(state, null, 2) + '\n');
  };
  await save();
  for (const file of files) {
    let entry = state.files.find(item => item.sha256 === file.sha256);
    if (entry?.documentName) {
      await ai.fileSearchStores.documents.get({ name: entry.documentName });
      console.log(`등록된 파일 유지: ${basename(file.path)}`);
      continue;
    }
    if (!entry) {
      entry = { ...file };
      state.files.push(entry);
    }
    let operation = entry.operation;
    if (!operation) {
      operation = await ai.fileSearchStores.uploadToFileSearchStore({
        // ASCII 전송 이름을 사용해 한글 파일명의 HTTP 헤더 오류를 방지
        file: extname(file.path).toLowerCase() === '.md'
          ? new File([await readFile(file.path)], `${file.sha256}.md`, { type: 'text/markdown' })
          : file.path,
        fileSearchStoreName: state.storeName,
        config: {
          displayName: basename(file.path),
          ...(extname(file.path).toLowerCase() === '.md' ? { mimeType: 'text/markdown' } : {}),
          customMetadata: [{ key: 'sha256', stringValue: file.sha256 }]
        }
      });
      entry.operation = operation;
      await save();
    }
    const deadline = Date.now() + 10 * 60 * 1000;
    while (!operation.done) {
      if (Date.now() > deadline) throw new Error('문서 처리 대기 시간이 초과되었습니다. 같은 명령으로 상태 확인을 이어가세요.');
      await new Promise(resolve => setTimeout(resolve, 5000));
      // 재실행 때도 SDK operation 인스턴스를 사용
      const { UploadToFileSearchStoreOperation } = await import('@google/genai');
      operation = await ai.operations.get({ operation: Object.assign(new UploadToFileSearchStoreOperation(), operation) });
      entry.operation = operation;
      await save();
    }
    if (operation.error) throw new Error(`문서 등록 실패: ${basename(file.path)} (code=${operation.error.code || 'unknown'})`);
    if (!operation.response?.documentName) throw new Error('문서 등록 결과에 documentName이 없습니다.');
    entry.documentName = operation.response.documentName;
    await save();
    console.log(`문서 등록 완료: ${basename(file.path)}`);
  }
  const store = await ai.fileSearchStores.get({ name: state.storeName });
  console.log(`저장소 상태: active=${store.activeDocumentsCount || 0}, pending=${store.pendingDocumentsCount || 0}, failed=${store.failedDocumentsCount || 0}`);
  if (Number(store.failedDocumentsCount || 0) || Number(store.pendingDocumentsCount || 0)
      || Number(store.activeDocumentsCount || 0) < files.length) {
    throw new Error('문서 상태가 준비되지 않았습니다. 상태를 확인한 뒤 설정하세요.');
  }
  console.log(`Vercel에 설정할 값: GEMINI_FILE_SEARCH_STORE_NAMES=${state.storeName}`);
}

main().catch(error => {
  // 공급자 오류 본문·요청 객체에는 비밀정보가 포함될 수 있으므로 출력하지 않음
  console.error(error.status ? `Gemini 문서 등록 요청 실패 (status=${error.status})` : error.message);
  process.exitCode = 1;
});
