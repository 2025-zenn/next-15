import { NextResponse } from 'next/server';
import { analyzeImageWithGemini } from '../gemini/request';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const imageData = {
      mimeType: data.mimeType,
      base64Data: data.base64Data,
    }
    const analysis = await analyzeImageWithGemini(imageData);
    if (!analysis.success) {
      return NextResponse.json({
        status: 500,
        error: analysis.error?.message || '画像解析に失敗しました。'
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 200,
      result: analysis.data
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error
    }, { status: 500 });
  }
}