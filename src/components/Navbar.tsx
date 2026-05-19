"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useDesa } from "@/hooks/useDesa";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Potensi", href: "/potensi" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Infografis", href: "/infografis" },
];

export default function Navbar() {
  const { desa } = useDesa();
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
    <>
      <header 
        className={`fixed top-0 z-50 w-full py-3 sm:py-4 transition-all duration-500 ${
          isMenuOpen
            ? "bg-transparent"
            : isScrolled
              ? "bg-[#004F3B]/85 backdrop-blur-xl border-b border-white/5 shadow-lg"
              : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-2 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-stretch lg:gap-x-12 xl:px-0">
          {/* Logo Section */}
          <Link 
            href="/" 
            onClick={closeMenu}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="relative flex h-8 w-8 items-center justify-center xs:h-9 xs:w-9 md:h-10 md:w-10">
              <img
                src={desa?.logo_desa || "/img/image.png"}
                alt={`Logo ${desa?.nama_desa || "Desa Pameutingan"}`}
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>
            <span className={`flex flex-col leading-none transition-all duration-300 ${
              isMenuOpen 
                ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:flex" 
                : "opacity-100"
            }`}>
              <span className="text-[0.92rem] xs:text-[1.02rem] sm:text-[1.1rem] md:text-[1.2rem] font-bold tracking-tight text-white">
                {desa?.nama_desa || "Desa Pameutingan"}
              </span>
              <span className="mt-0.5 text-[0.55rem] xs:text-[0.6rem] sm:text-[0.62rem] font-medium tracking-[0.14em] text-[#D0FAE5]/70">
                {desa?.kabupaten || "KAB. TASIKMALAYA"}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-[0.92rem] font-medium transition-all duration-300 rounded-lg ${
                        isActive
                          ? "text-white bg-white/10"
                          : "text-[#D0FAE5]/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <Link
              href="/layanan-masyarakat"
              className="hidden lg:flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-bold transition-all bg-white text-[#004F3B] hover:bg-emerald-50 active:scale-95 px-5 py-2.5 rounded-xl shadow-xl shadow-black/10"
            >
              Layanan
              <ArrowUpRight size={16} className="opacity-70" />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md transition-all duration-300 active:scale-95 lg:hidden z-50 ${
                isMenuOpen ? "rotate-90 bg-white/20" : ""
              }`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
          <div 
            onClick={closeMenu}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-500"
          />
        )}

        {/* Mobile Menu Drawer (Sidebar Public Mobile) */}
        <div 
          className={`fixed right-0 top-0 bottom-0 z-40 h-screen w-[85vw] max-w-xs sm:max-w-sm bg-gradient-to-b from-[#003B2C] via-[#00231A] to-[#00140F] border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-6 sm:px-8 pt-24 pb-8 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-1.5">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between py-3.5 border-b border-white/5 text-[1.1rem] sm:text-[1.2rem] font-bold tracking-tight transition-all duration-500 ease-out hover:text-white hover:translate-x-1 ${
                      isMenuOpen 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-8 opacity-0"
                    } ${isActive ? "text-[#00E0A1]" : "text-white/70"}`}
                    style={{ transitionDelay: `${100 + index * 40}ms` }}
                  >
                    <span className="relative flex items-center gap-3">
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#00E0A1]" />}
                      {item.label}
                    </span>
                    <span className={`text-xs opacity-40 transition-transform duration-300 ${isActive ? "text-[#00E0A1] opacity-80" : ""}`}>
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            <div 
              className={`mt-auto pt-8 space-y-5 transition-all duration-500 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${100 + navItems.length * 40}ms` }}
            >
              <Link
                href="/layanan-masyarakat"
                onClick={closeMenu}
                className="flex h-12 sm:h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00E0A1] to-[#00B887] text-sm sm:text-base font-bold text-[#002B20] shadow-[0_12px_30px_rgba(0,224,161,0.2)] active:scale-[0.98] transition-all duration-300 hover:brightness-110"
              >
                Layanan Masyarakat
                <ArrowUpRight size={18} />
              </Link>
              
              <div className="flex flex-col items-center gap-1 text-center py-2">
                <span className="text-[0.6rem] sm:text-[0.65rem] font-bold tracking-[0.2em] text-[#D0FAE5]/40 uppercase">
                  Pemerintah {desa?.nama_desa || "Desa Pameutingan"}
                </span>
                <span className="text-[0.55rem] sm:text-[0.6rem] text-white/20">
                  &copy; 2026 • Semua Hak Dilindungi
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Layanan Button for Mobile (FAB) */}
      {!isMenuOpen && (
        <Link
          href="/layanan-masyarakat"
          className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center justify-center gap-2 bg-gradient-to-r from-[#00E0A1] to-[#00B887] text-[#002B20] font-bold text-sm px-5 py-3 rounded-full shadow-[0_8px_30px_rgba(0,224,161,0.4)] active:scale-95 transition-all duration-300 hover:brightness-110"
        >
          <span>Layanan</span>
          <ArrowUpRight size={16} />
        </Link>
      )}
    </>
  );
}
