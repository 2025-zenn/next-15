import { VertexAI, GenerateContentRequest } from '@google-cloud/vertexai';

// 共通の設定を定義
const GEMINI_CONFIG = {
  PROJECT_ID: process.env.PROJECT_ID,
  LOCATION: 'asia-northeast1',
  MODEL: 'gemini-1.5-pro',
  PROMPTS: {
    IMAGE_ANALYSIS: `以下の食事画像を解析し、食品名とそれぞれのカロリーを推定してください。
    - 画像の中に含まれている食品を特定してください。
    - 一般的なお皿やお弁当のサイズから各料理のサイズを推定してください。
    - 各料理のサイズを参考に一般的なカロリー量を推定してください。
    - 料理全体の推定カロリーを計算してください。

    注意:
    - マークダウン記法（**など）は使用しないでください
    - 純粋なJSONフォーマットで返してください
    - 改行やインデントは不要です

    例
    {
      "foods": [
        { "name": "白米", "min-calories": 240, "max-calories": 360 },
        { "name": "焼き鮭", "min-calories": 180, "max-calories": 240 },
        { "name": "味噌汁", "min-calories": 50, "max-calories": 100}
      ],
      "min-total-calories": 470,
      "max-total-calories": 700
    }`,
    HEALTH_ADVICE: `
    以下の食事内容に基づいて、健康的な食生活のアドバイスを提供してください：

    食事内容：
    {{foodData}}

    以下の点について、シンプルなJSONオブジェクトで返してください:
    - カロリーバランスの評価
    - 栄養バランスの改善点
    - 健康的な代替案や補足すべき食材
    - 食事のタイミングに関する提案

    注意:
    - マークダウン記法（**など）は使用しないでください
    - 純粋なJSONフォーマットで返してください
    - 改行やインデントは不要です
    - アドバイスは短く読みやすい文章が重要です

    レスポンス例：
    {
      "caloryEvaluation": "総カロリーは適度な範囲内です",
      "nutritionBalance": "タンパク質が不足気味です",
      "improvements": ["野菜を追加することで食物繊維を補給できます", "全粒粉の食材を取り入れることをお勧めします"],
      "timing": "この食事は昼食として適していますが、夕食としては少し重めです"
    }`
  }
} as const;

// 関数をエクスポートする
export async function analyzeImageWithGemini(
  imageData: {
    mimeType?: string;
    base64Data?: string;
  },
  prompt: string = GEMINI_CONFIG.PROMPTS.IMAGE_ANALYSIS,
  projectId = GEMINI_CONFIG.PROJECT_ID,
  location = GEMINI_CONFIG.LOCATION,
  model = GEMINI_CONFIG.MODEL,
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

export async function generateHealthAdvice(
  foodData: {
    foods: Array<{
      name: string;
      "min-calories": number;
      "max-calories": number;
    }>;
    "min-total-calories": number;
    "max-total-calories": number;
  },
  projectId = GEMINI_CONFIG.PROJECT_ID,
  location = GEMINI_CONFIG.LOCATION,
  model = GEMINI_CONFIG.MODEL,
) {
  try {
    if (!projectId) {
      throw new Error('Project ID が設定されていません');
    }

    const vertexAI = new VertexAI({project: projectId, location: location});
    const generativeModel = vertexAI.getGenerativeModel({
      model: model,
    });
    const prompt = GEMINI_CONFIG.PROMPTS.HEALTH_ADVICE.replace('{{foodData}}', JSON.stringify(foodData, null, 2));
    console.log('health advise', prompt);

    const response = await generativeModel.generateContent(prompt);
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