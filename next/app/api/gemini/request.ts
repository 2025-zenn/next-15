import { VertexAI, GenerateContentRequest } from '@google-cloud/vertexai';

// 関数をエクスポートする
export async function analyzeImageWithGemini(
  imageData: {
    mimeType?: string;
    base64Data?: string;
  },
  prompt: string = `以下の食事画像を解析し、食品名とそれぞれのカロリーを推定してください。
  - 画像の中に含まれている食品を特定してください。
  - 一般的なカロリー量を推定してください。(100g あたりのカロリーをベースに考える)
  - 料理全体の推定カロリーを計算してください。
  - 出力は JSON 形式のみ返してください。
  例:
  {
    "foods": [
      { "name": "白米", "min-calories": 240, "max-calories": 360 },
      { "name": "焼き鮭", "min-calories": 180, "max-calories": 240 },
      { "name": "味噌汁", "min-calories": 50, "max-calories": 100}
    ],
    "min-total-calories": 470,
    "max-total-calories": 700
  }`,
  projectId = process.env.NEXT_PUBLIC_PROJECT_ID,
  location = 'asia-northeast1',
  model = 'gemini-1.5-pro',
) {
  try {
    if (!projectId) {
      throw new Error('Project ID が設定されていません');
    }
    
    const vertexAI = new VertexAI({project: projectId, location: location});

    const generativeVisionModel = vertexAI.getGenerativeModel({
      model: model,
    });

    if (!imageData.base64Data) {
      throw new Error('画像データが提供されていません');
    }    

    // リクエスト形式を修正
    const imagePart = {
      inline_data: {
        data: imageData.base64Data,
        mime_type: imageData.mimeType || 'image/jpeg',
      },
    };

    const request = {
      contents: [{
        role: 'user',
        parts: [
          {
            text: prompt
          },
          imagePart
        ]
      }],
    } as GenerateContentRequest;

    const response = await generativeVisionModel.generateContent(request);
    const candidates = response.response?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error('応答が空でした');
    }

    const resultText = candidates[0].content.parts[0].text;

    return {
      success: true,
      data: resultText,
    };

  } catch (error) {
    console.error('Gemini API エラー:', error);
    
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : '不明なエラーが発生しました',
        details: error instanceof Error ? error.stack : undefined,
      }
    };
  }
}