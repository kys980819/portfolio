import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MongoClient } from 'mongodb';

export const runtime = 'nodejs';

// 각 서비스 상태 확인 — 가장 가벼운 호출만 사용, try/catch로 개별 격리

async function checkOpenAI(openaiClient) {
  if (!openaiClient) return "error";
  try {
    await openaiClient.models.list();
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

async function checkVectorStore(openaiClient) {
  const ids = (process.env.VECTOR_STORE_IDS || '').split(',').map(id => id.trim()).filter(Boolean);
  if (!openaiClient || !ids.length) return "error";
  try {
    await openaiClient.vectorStores.retrieve(ids[0]);
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

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const openaiClient = apiKey ? new OpenAI({ apiKey, timeout: 10000 }) : null;

  const [openai, mongo, telegram, vectorStore] = await Promise.all([
    checkOpenAI(openaiClient),
    checkMongo(),
    checkTelegram(),
    checkVectorStore(openaiClient)
  ]);

  return NextResponse.json({
    ok: true,
    services: { openai, mongo, telegram, vectorStore }
  });
}
