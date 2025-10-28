import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // OpenAI API 키 확인
    const openaiConfigured = process.env.OPENAI_API_KEY && 
                           process.env.OPENAI_API_KEY.startsWith('sk-');
    
    // MongoDB 설정 확인
    const mongoConfigured = process.env.MONGO_URI && 
                           process.env.MONGO_DB && 
                           process.env.MONGO_COLLECTION;
    
    // 벡터스토어 설정 확인
    const vectorStoreConfigured = process.env.VECTOR_STORE_IDS && 
                                 process.env.VECTOR_STORE_IDS.trim() !== '';

    // 텔레그램 설정 확인
    const telegramConfigured = process.env.TELEGRAM_BOT_TOKEN && 
                              process.env.TELEGRAM_CHAT_ID;

    return NextResponse.json({
      ok: true,
      status: "healthy",
      openai_configured: openaiConfigured,
      mongo_configured: mongoConfigured,
      vector_store_configured: vectorStoreConfigured,
      telegram_configured: telegramConfigured,
      // 디버깅용 (실제 값은 노출하지 않음)
      telegram_token_length: process.env.TELEGRAM_BOT_TOKEN?.length || 0,
      telegram_chat_id: process.env.TELEGRAM_CHAT_ID ? '설정됨' : '설정 안됨',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      status: "error",
      error: error.message
    }, { status: 500 });
  }
}
