"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Potensi", href: "/potensi" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Infografis", href: "/infografis" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`navbar-enter fixed top-0 z-50 w-full px-4 transition-all duration-500 md:px-10 ${
        isScrolled || isMenuOpen
          ? "border-b border-white/10 bg-linear-to-r from-[#004F3B]/95 to-[#003126]/95 shadow-md backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between md:h-20">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={closeMenu}
          className="hero-reveal z-50 flex items-center gap-2.5 [animation-delay:80ms]"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 p-1.5 shadow-inner backdrop-blur-sm md:h-10 md:w-10">
            <img
              src="/img/image.png"
              alt="Logo Desa Pametingan"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              loading="eager"
            />
          </div>
          <span className="flex flex-col leading-none" style={{ fontFamily: 'var(--font-sans)' }}>
            <span className="text-[1.1rem] font-bold tracking-tight text-white md:text-[1.35rem]">
              Desa Pameutingan
            </span>
            <span className="mt-0.5 text-[0.62rem] font-medium tracking-[0.14em] text-[#D0FAE5]/80 md:text-[0.68rem]">
              KAB. TASIKMALAYA
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hero-reveal hidden items-center gap-7 [animation-delay:160ms] md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-link-animated text-[0.95rem] font-semibold transition-all duration-300 ${isActive
                    ? "is-active text-white"
                    : "text-[#D0FAE5]/90 hover:text-white"
                  }`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hero-reveal hidden [animation-delay:240ms] md:block">
          <Link
            href="/layanan-masyarakat"
            className="nav-cta group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-white px-7 text-[0.92rem] font-bold text-[#004F3B] shadow-xl"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="relative z-10">Layanan Masyarakat</span>
            <div className="absolute inset-0 translate-y-full bg-emerald-50 transition-transform duration-300 group-hover:translate-y-0" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="hero-reveal z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all active:scale-95 md:hidden"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 h-screen w-full bg-[#002B20]/98 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-8 pt-28 pb-10">
          <div className="flex flex-col gap-6">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`group flex items-center justify-between text-2xl font-bold tracking-tight transition-all duration-300 ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  } ${isActive ? "text-white" : "text-white/60"}`}
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    transitionDelay: `${150 + index * 50}ms`
                  }}
                >
                  <span>{item.label}</span>
                  <div className={`h-1.5 w-1.5 rounded-full bg-[#F0B100] transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"}`} />
                </Link>
              );
            })}
          </div>

          <div 
            className={`mt-auto transition-all duration-500 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${150 + navItems.length * 50}ms` }}
          >
            <Link
              href="/layanan-masyarakat"
              onClick={closeMenu}
              className="flex h-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#004F3B] shadow-2xl active:scale-[0.98] transition-transform"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Layanan Masyarakat
            </Link>
            
            <div className="mt-8 flex flex-col items-center gap-1 text-center">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/30 uppercase">
                Pemerintah Desa Pametingan
              </span>
              <span className="text-[0.6rem] text-white/20">
                &copy; 2026 • All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
