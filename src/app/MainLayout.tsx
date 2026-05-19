"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppPage = pathname.startsWith("/layanan-masyarakat") || pathname.startsWith("/admin");

  return (
    <>
      {!isAppPage && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAppPage && <Footer />}
    </>
  );
}
