import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { MongoClient } from 'mongodb';

export const runtime = 'nodejs';

// 각 서비스 상태 확인 — 가장 가벼운 호출만 사용, try/catch로 개별 격리

async function checkGemini(geminiClient) {
  if (!geminiClient) return "error";
  try {
    await geminiClient.models.get({ model: process.env.GEMINI_MODEL?.trim() || 'gemini-3.8-flash' });
    return "ok";
  } catch {
    return "error";
  }
}

async function checkMongo() {
  if (!process.env.MONGO_URI) return "error";
  let client = null;
  try {
    client = new MongoClient(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    await client.db().command({ ping: 1 });
    return "ok";
  } catch {
    return "error";
  } finally {
    if (client) await client.close().catch(() => {});
  }
}

async function checkTelegram() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || !process.env.TELEGRAM_CHAT_ID) return "error";
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}

async function checkFileSearch(geminiClient) {
  const names = (process.env.GEMINI_FILE_SEARCH_STORE_NAMES || '').split(',').map(name => name.trim()).filter(Boolean);
  if (!geminiClient || !names.length) return "error";
  try {
    await Promise.all(names.map(name => geminiClient.fileSearchStores.get({ name })));
    return "ok";
  } catch {
    return "error";
  }
}

export async function GET(request) {
  // 시크릿 게이트: 열쇠 없음/불일치 시 최소 응답만 (상세 상태 숨김)
  const secret = process.env.HEALTH_CHECK_SECRET;
  const providedKey = request.headers.get('x-health-key')
    || new URL(request.url).searchParams.get('key');

  if (!secret || providedKey !== secret) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const geminiClient = apiKey ? new GoogleGenAI({ apiKey, httpOptions: { timeout: 10000 } }) : null;

  const [gemini, mongo, telegram, fileSearch] = await Promise.all([
    checkGemini(geminiClient),
    checkMongo(),
    checkTelegram(),
    checkFileSearch(geminiClient)
  ]);

  return NextResponse.json({
    ok: true,
    services: { gemini, mongo, telegram, fileSearch }
  });
}
