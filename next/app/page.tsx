"use client"

import { useState } from "react";
import FileUploader from "./_components/FileUploader";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // TODO: 1日の総カロリーを取得・設定する
  const totalCalories = 300;
  // TODO: ユーザーごとの推奨カロリーを取得・設定する
  const recommendedCalories = 2000;
  // const [recommendedCalories, setrecommendedCalories] = useState(0);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full max-w-md">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">一日の推奨カロリー</h2>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-green-600">{recommendedCalories}</p>
                  <span className="ml-1 text-sm text-gray-500">kcal</span>
                </div>
              </div>
              <div>
                <h2 className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">現在の摂取カロリー</h2>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-blue-600">{totalCalories}</p>
                  <span className="ml-1 text-sm text-gray-500">kcal</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalCalories / recommendedCalories) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </main>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-[90%] max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">何を食べましたか？</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 overflow-y-auto flex-1">
              <FileUploader />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
