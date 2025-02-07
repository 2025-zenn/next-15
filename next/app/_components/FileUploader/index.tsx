"use client";
import { useState } from 'react';
import Image from 'next/image';

interface FoodItem {
    name: string;
    'min-calories': number;
    'max-calories': number;
}

interface AnalysisResult {
    foods: FoodItem[];
    'min-total-calories': number;
    'max-total-calories': number;
}

interface HealthAdviceResult {
    caloryEvaluation: string;
    nutritionBalance: string;
    improvements: string[];
    timing: string;
}

interface FileUploaderProps {
    onClose?: () => void;
}

const FileUploader = ({ onClose }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [healthAdvice, setHealthAdvice] = useState<HealthAdviceResult | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // ファイルをBase64に変換する関数
    const convertToBase64 = async (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                resolve(base64.split(',')[1]);
            };
            reader.readAsDataURL(file);
        });
    };

    // アップロード処理を行う関数
    const handleUpload = async () => {
        if (!selectedFile) return;
        
        setIsUploading(true);
        setAnalysisResult(null);
        setError(null);

        try {
            const base64Data = await convertToBase64(selectedFile);
            const response = await fetch('/api/loadImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mimeType: selectedFile.type,
                    base64Data: base64Data,
                }),
            });
            const data = await response.json();
            
            if (!response.ok) {
                setError(data.error || '画像の解析中にエラーが発生しました。');
                return;
            }
            
            setAnalysisResult(data.result);
        } finally {
            setIsUploading(false);
        }
    };

    // アドバイス生成関数を修正
    const generateHealthAdvice = async () => {
        if (!analysisResult) return;
        
        setError(null);
        setIsUploading(true);
        try {
            const response = await fetch('/api/generateAdvice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: analysisResult,
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'アドバイスの生成中にエラーが発生しました。');
                return;
            }
            setHealthAdvice(JSON.parse(data.healthTips));
        } catch (error) {
            setError(`アドバイスの生成中にエラーが発生しました\n${error}`);
        } finally {
            setIsUploading(false);
        }
    };

    // リセット関数を修正
    const handleReset = () => {
        setSelectedFile(null);
        setPreview(null);
        setAnalysisResult(null);
        setError(null);
        setHealthAdvice(null);
    };

    return (
        <div className="space-y-4">            
            {/* エラーメッセージの表示 */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {/* 食事のアドバイス */}
            {healthAdvice && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-lg mb-4 text-green-800">健康アドバイス</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-green-700 mb-1">カロリー評価</h4>
                            <p className="text-green-600">{healthAdvice.caloryEvaluation}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-green-700 mb-1">栄養バランス</h4>
                            <p className="text-green-600">{healthAdvice.nutritionBalance}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-green-700 mb-1">改善のアドバイス</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {healthAdvice.improvements.map((improvement, index) => (
                                    <li key={index} className="text-green-600">{improvement}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-green-700 mb-1">食事のタイミング</h4>
                            <p className="text-green-600">{healthAdvice.timing}</p>
                        </div>
                    </div>
                </div>
            )}
            {/* アップロードした画像のプレビュー */}
            {preview && !healthAdvice && (
                <div className="relative w-full h-48">
                    <Image
                        src={preview}
                        alt="プレビュー"
                        fill
                        className="object-contain rounded-lg"
                    />
                </div>
            )}
            {/* 解析結果の表示 */}
            {analysisResult && !healthAdvice && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">解析結果</h3>
                    <div className="space-y-2">
                        {analysisResult && (() => {
                            const result: AnalysisResult = JSON.parse(analysisResult);
                            return (
                                <>
                                    <div className="space-y-4">
                                        <div className="border-b pb-3">
                                            <p className="text-sm font-medium text-gray-700">
                                                総カロリー：
                                                <span className="text-blue-600">
                                                    {result['min-total-calories']}~{result['max-total-calories']}kcal
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">検出された食品</h4>
                                            <ul className="space-y-2">
                                                {result.foods.map((food: FoodItem, index: number) => (
                                                    <li key={index} className="bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium">{food.name}</span>
                                                        <span className="text-sm text-gray-600 ml-2">
                                                            {food['min-calories']}~{food['max-calories']}kcal
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
            {analysisResult && !healthAdvice && (
                <>
                    <button
                        onClick={generateHealthAdvice}
                        disabled={isUploading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
                    >
                        {isUploading ? 'アドバイスを生成中...' : 'アドバイスをもらう'}
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        キャンセル
                    </button>
                </>
            )}
            {analysisResult && healthAdvice && (
                <button
                    onClick={() => {
                        handleReset();
                        onClose?.();  // モーダルを閉じる
                    }}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    閉じる
                </button>
            )}
            {!analysisResult && (
                <>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">料理の画像をアップロード</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                            </div>
                            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={handleUpload}
                        disabled={!selectedFile || isUploading}
                    >
                        {isUploading ? 'アップロード中...' : 'アップロード'}
                    </button>
                </>
            )}
        </div>
    )
}

export default FileUploader