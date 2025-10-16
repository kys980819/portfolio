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

    return NextResponse.json({
      ok: true,
      status: "healthy",
      openai_configured: openaiConfigured,
      mongo_configured: mongoConfigured,
      vector_store_configured: vectorStoreConfigured,
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
