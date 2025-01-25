import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-6 max-w-2xl text-center sm:text-left">
          <h1 className="text-4xl font-bold">私たちについて</h1>
          <p className="text-lg">
            {process.env.APP_TITLE}は、皆様の健康的な生活をサポートすることを使命としています。
            最新のAI技術を活用し、パーソナライズされた健康アドバイスを提供します。
          </p>
          <p className="text-lg">
            私たちのチームは、AIエンジニアで構成されており、医療の専門家ではございません。
            最新のAI技術を用いた正確な情報提供を心がけています。
          </p>
          <div className="flex gap-4 justify-center sm:justify-start">
            <button className="btn btn-primary">お問い合わせ</button>
            <button className="btn btn-outline">サービス詳細</button>
          </div>
        </div>
      </main>
    </div>
  );
}
