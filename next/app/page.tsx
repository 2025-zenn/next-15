export default function Home() {
  // TODO: 1日の総カロリーを取得・設定する
  const totalCalories = 300;
  // TODO: ユーザーごとの推奨カロリーを取得・設定する
  const recommendedCalories = 2000;
  // TODO: 各時間帯のカロリーデータ（後でAPIから取得するように変更予定）
  const mealData = [
    { time: "朝食", calories: 300, icon: "☀️" },
    { time: "昼食", calories: 0, icon: "🌤️" },
    { time: "夕食", calories: 0, icon: "🌙" },
  ];

  return (
    <main className="flex flex-col gap-8 mt-20 items-center px-4 sm:px-20 py-8">
      <div className="w-full max-w-md space-y-8 mx-auto">
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
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">時間帯別カロリー</h2>
          <div className="grid grid-cols-1 gap-4">
            {mealData.map((meal) => (
              <div key={meal.time} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{meal.icon}</span>
                    <h3 className="text-sm text-gray-600 dark:text-gray-400 font-medium">{meal.time}</h3>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-blue-600">{meal.calories}</p>
                  <span className="ml-1 text-sm text-gray-500">kcal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((meal.calories / (recommendedCalories / 3)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
