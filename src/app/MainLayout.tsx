"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/layanan-masyarakat/login" ||
    pathname === "/layanan-masyarakat/daftar";
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}
