import "./globals.css";
import type { Metadata } from "next";
import { notojp } from "@/fonts";
import { ClientLayout } from "./_components/ClientLayout";
import backGround from "@/public/img/backGround.png"

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || 'アドバイス',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'カロリー管理アプリ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notojp.className} antialiased relative`} style={{backgroundImage: `url(${backGround.src})`}}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
