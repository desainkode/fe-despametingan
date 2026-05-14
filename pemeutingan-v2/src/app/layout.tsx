import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/app/components/ScrollToTop";
import SessionProviderComp from "@/app/provider/nextauth/SessionProvider";
import { AuthDialogProvider } from "../context/AuthDialogContext";
import NextTopLoader from "nextjs-toploader";
import { Metadata } from "next";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Resmi Desa Pameutingan",
  description: "Website Resmi Pemerintahan Desa Pameutingan, Kecamatan Cipatujah, Kabupaten Tasikmalaya.",
  icons: {
    icon: "/images/logo/logo-desa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className} suppressHydrationWarning>
        <NextTopLoader color="#10B981" />
        <AuthDialogProvider>
          <SessionProviderComp>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </SessionProviderComp>
        </AuthDialogProvider>
      </body>
    </html>
  );
}