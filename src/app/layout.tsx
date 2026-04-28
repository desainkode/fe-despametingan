import type { Metadata } from "next";
import "./globals.css";
import { upakarti } from "../lib/fonts";

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
      className={`${upakarti.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f7f6]">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
