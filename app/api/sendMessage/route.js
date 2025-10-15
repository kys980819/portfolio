import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

// 환경변수에서 설정값 가져오기 (Vercel 배포 시 안정성을 위해 더 엄격한 체크)
const openaiApiKey = process.env.OPENAI_API_KEY;
const mongoUri = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB;
const mongoCollectionName = process.env.MONGO_COLLECTION;
const vectorStoreIds = process.env.VECTOR_STORE_IDS ? 
  process.env.VECTOR_STORE_IDS.split(',').map(id => id.trim()).filter(id => id.length > 0) : [];
const maxOutputTokens = parseInt(process.env.MAX_OUTPUT_TOKENS || '256');
const openaiTimeout = parseInt(process.env.OPENAI_TIMEOUT || '30') * 1000; // ms로 변환

// 환경변수 검증 함수
function validateEnvironment() {
  const openaiConfigured = openaiApiKey && openaiApiKey.startsWith('sk-');
  const mongoConfigured = mongoUri && mongoDbName && mongoCollectionName;
  const vectorStoreConfigured = vectorStoreIds.length > 0;
  
  return {
    openai_configured: openaiConfigured,
    mongo_configured: mongoConfigured,
    vector_store_configured: vectorStoreConfigured,
    all_configured: openaiConfigured && mongoConfigured && vectorStoreConfigured
  };
}

// OpenAI 클라이언트 초기화
let openaiClient = null;
if (openaiApiKey && openaiApiKey.startsWith('sk-')) {
  openaiClient = new OpenAI({
    apiKey: openaiApiKey,
    timeout: openaiTimeout
  });
}

// MongoDB 클라이언트 초기화
let mongoClient = null;

if (mongoUri && mongoDbName && mongoCollectionName) {
  try {
    mongoClient = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000
    });
    // 연결은 실제 사용 시점에 수행
  } catch (error) {
    console.error('MongoDB 클라이언트 초기화 실패:', error);
  }
}

// MongoDB 연결 테스트 함수
async function testMongoConnection() {
  if (!mongoClient) return false;
  
  try {
    await mongoClient.connect();
    await mongoClient.db(mongoDbName).admin().ping();
    return true;
  } catch (error) {
    console.error('MongoDB 연결 테스트 실패:', error);
    return false;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

// Health check endpoint
export async function GET() {
  try {
    const envStatus = validateEnvironment();
    
    // 실제 연결 테스트
    let mongoConnectionTest = false;
    if (envStatus.mongo_configured) {
      mongoConnectionTest = await testMongoConnection();
    }
    
    // OpenAI 연결 테스트
    let openaiConnectionTest = false;
    if (envStatus.openai_configured) {
      try {
        // 간단한 API 호출로 연결 테스트
        await openaiClient.models.list();
        openaiConnectionTest = true;
      } catch (error) {
        console.error('OpenAI 연결 테스트 실패:', error);
        openaiConnectionTest = false;
      }
    }
    
    return NextResponse.json({
      ok: true,
      status: "healthy",
      ...envStatus,
      connection_tests: {
        openai_connected: openaiConnectionTest,
        mongo_connected: mongoConnectionTest
      },
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

export async function POST(request) {
  try {
    // Content-Type 확인
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { ok: false, error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    // JSON 데이터 파싱
    const data = await request.json();
    
    // 세션/대화 ID 수집
    const sessionId = request.headers.get('x-session-id') || uuidv4();
    const conversationId = data.conversation_id || uuidv4();
    const message = data.message;

    // 메시지 검증
    if (!message || !message.trim()) {
      return NextResponse.json(
        { ok: false, error: "Message is required and cannot be empty" },
        { status: 400 }
      );
    }

    console.log(`사용자가 보낸 메시지: ${message}`);

    // 환경변수 상태 확인
    const envStatus = validateEnvironment();
    
    // OpenAI API 키 확인
    if (!envStatus.openai_configured) {
      console.error("OpenAI API 키가 설정되지 않았습니다.");
      return NextResponse.json(
        { 
          ok: false, 
          error: "OpenAI API 키가 설정되지 않았습니다",
          environment_status: envStatus
        },
        { status: 500 }
      );
    }

    // 벡터스토어 ID 확인
    if (!envStatus.vector_store_configured) {
      console.error("VECTOR_STORE_IDS 환경변수가 설정되지 않았습니다.");
      return NextResponse.json(
        { 
          ok: false, 
          error: "VECTOR_STORE_IDS가 설정되지 않아 파일 검색을 사용할 수 없습니다",
          environment_status: envStatus
        },
        { status: 500 }
      );
    }

    // OpenAI API 호출
    try {
      console.log("OpenAI API 호출 시작");
      
      const response = await openaiClient.responses.create({
        model: "gpt-4.1",
        input: [
          { role: "system", content: "너는 김윤성의 이력서를 보고 답변하는 챗봇이야" },
          { role: "user", content: message }
        ],
        tools: [{ type: "file_search", vector_store_ids: vectorStoreIds }]
      });

      const aiResponse = response.output_text;
      console.log(`AI 응답 생성 완료: ${aiResponse.length}자`);

      // MongoDB 저장 (가능한 경우에만)
      if (envStatus.mongo_configured && mongoClient) {
        try {
          // MongoDB 연결 및 저장
          await mongoClient.connect();
          const db = mongoClient.db(mongoDbName);
          const collection = db.collection(mongoCollectionName);
          
          const doc = {
            session_id: sessionId,
            conversation_id: conversationId,
            user: "guest",
            message: message,
            response: aiResponse,
            time: new Date().toISOString()
          };
          
          await collection.insertOne(doc);
          console.log("대화 레코드가 MongoDB에 저장되었습니다.");
        } catch (mongoError) {
          console.error("MongoDB 저장 실패:", mongoError);
          // MongoDB 저장 실패해도 챗봇 응답은 계속 진행
        } finally {
          // 연결 종료
          try {
            if (mongoClient) {
              await mongoClient.close();
            }
          } catch (closeError) {
            console.error("MongoDB 연결 종료 실패:", closeError);
          }
        }
      } else {
        console.warn("MongoDB 설정이 없어 응답을 저장하지 않습니다.");
      }

      // 성공 응답
      return NextResponse.json({
        ok: true,
        response: aiResponse,
        session_id: sessionId,
        conversation_id: conversationId
      });

    } catch (openaiError) {
      console.error("OpenAI API 에러:", openaiError);
      return NextResponse.json(
        { ok: false, error: "AI 서비스에 문제가 발생했습니다" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("예상치 못한 에러 발생:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
