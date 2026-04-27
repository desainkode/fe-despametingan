import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const upakarti = localFont({
  src: [
    {
      path: "../../public/fonts/hero-section/upakarti.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/hero-section/upakarti-serong.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-upakarti",
  display: "swap",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${upakarti.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f7f6]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
