import { NextResponse } from 'next/server';
import { generateHealthAdvice } from '../gemini/request';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const analysis = await generateHealthAdvice(data);
    if (!analysis.success) {
      return NextResponse.json({
        status: 500,
        error: analysis.error?.message || '健康アドバイスの生成に失敗しました。'
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 200,
      healthTips: analysis.data,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error
    }, { status: 500 });
  }
}