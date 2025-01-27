import type { Metadata } from "next";
import "./globals.css";
import { notojp } from "@/fonts";
import Navigation from "@/app/_components/Navigation"

export const metadata: Metadata = {
  title: process.env.APP_TITLE,
  description: process.env.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`
          ${notojp.className}
          antialiased
          relative
        `}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
