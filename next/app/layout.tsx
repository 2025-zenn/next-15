import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/_components/Navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
