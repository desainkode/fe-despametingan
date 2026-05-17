import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Website Desa Pameutingan",
  description: "Portal resmi Desa Pameutingan",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/img/image.png",
  },
};

import MainLayout from "./MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#f5f7f6]"
        suppressHydrationWarning
      >
        <MainLayout>{children}</MainLayout>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
