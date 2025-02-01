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

    return NextResponse.json({
      status: 200,
      result: analysis.data
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, error: 'Image analysis failed' },
      { status: 500 }
    );
  }
}