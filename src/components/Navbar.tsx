"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Infografis", href: "/infografis" },
  { label: "Potensi", href: "/potensi" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`navbar-enter fixed top-0 z-50 w-full px-4 transition-all duration-300 md:px-10 ${
        isScrolled
          ? "border-b border-white/10 bg-linear-to-r from-[#004F3B]/95 to-[#003126]/95 shadow-md backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-12 w-full max-w-7xl flex-col gap-2.5 py-2 md:h-14 md:flex-row md:items-center md:justify-between md:gap-4 md:py-0">
        <Link href="/" className="hero-reveal flex items-center gap-2 [animation-delay:80ms]">
          <img
            src="/img/image.png"
            alt="Logo Desa Pametingan"
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
            loading="eager"
          />
          <span className="flex flex-col leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-[1.3rem] font-bold tracking-tight text-white md:text-[1.5rem]">
              Desa Pameutingan
            </span>
            <span className="mt-1 text-[0.68rem] font-medium tracking-[0.16em] text-[#D0FAE5]/78 md:text-[0.72rem]">
              Kec. Cipatujah, Kab. Tasikmalaya
            </span>
          </span>
        </Link>

        <nav className="hero-reveal order-3 flex w-full items-center justify-start gap-3.5 overflow-x-auto pb-1 [animation-delay:160ms] md:order-0 md:w-auto md:justify-center md:gap-5 md:overflow-visible md:pb-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-link-animated whitespace-nowrap text-sm font-semibold md:text-base ${isActive
                    ? "is-active text-white"
                    : "text-[#D0FAE5] hover:text-white"
                  }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/layanan-masyarakat"
          className="hero-reveal nav-cta inline-flex h-9 items-center justify-center self-start rounded-full bg-white px-5 text-sm font-semibold text-[#004F3B] shadow-[0_6px_10px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.07)] hover:bg-emerald-50 [animation-delay:240ms] md:self-auto"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Layanan Masyarakat
        </Link>
      </div>
    </header>
  );
}
