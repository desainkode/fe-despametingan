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
  { label: "Kontak", href: "/kontak" },
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
    <header 
      className={`fixed top-0 z-50 w-full py-4 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? "bg-[#004F3B]/90 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-4 px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-stretch lg:gap-x-12 xl:px-0">
        {/* Logo Section */}
        <Link 
          href="/" 
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-9 w-9 items-center justify-center md:h-10 md:w-10">
            <img
              src={desa?.logo_desa || "/img/image.png"}
              alt={`Logo ${desa?.nama_desa || "Desa Pameutingan"}`}
              className="h-full w-full object-contain"
              loading="eager"
            />
          </div>
          <span className="flex flex-col leading-none">
            <span className="text-[1.1rem] font-bold tracking-tight text-white md:text-[1.2rem]">
              {desa?.nama_desa || "Desa Pameutingan"}
            </span>
            <span className="mt-0.5 text-[0.62rem] font-medium tracking-[0.14em] text-[#D0FAE5]/70">
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
        <div className="flex flex-wrap items-center justify-center gap-3 justify-self-end lg:flex-nowrap lg:gap-x-4">
          <Link
            href="/layanan-masyarakat"
            className="flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all bg-white text-[#004F3B] hover:bg-emerald-50 active:scale-95 px-5 py-2.5 rounded-xl shadow-xl shadow-black/10"
          >
            Layanan
            <ArrowUpRight size={16} className="opacity-70" />
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md transition-all active:scale-95 lg:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 h-screen w-full bg-[#002B20] transition-all duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-8 pt-28 pb-10">
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between text-2xl font-bold tracking-tight transition-all duration-300 ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  } ${isActive ? "text-[#00D492]" : "text-white/60"}`}
                  style={{ transitionDelay: `${150 + index * 50}ms` }}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="h-2 w-2 rounded-full bg-[#00D492]" />}
                </Link>
              );
            })}
          </div>

          <div 
            className={`mt-auto space-y-4 transition-all duration-500 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${150 + navItems.length * 50}ms` }}
          >
            <Link
              href="/layanan-masyarakat"
              onClick={closeMenu}
              className="flex h-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#004F3B] shadow-2xl active:scale-[0.98] transition-transform"
            >
              Layanan Masyarakat
            </Link>
            
            <div className="flex flex-col items-center gap-1 text-center py-4">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/30 uppercase">
                Pemerintah {desa?.nama_desa || "Desa Pameutingan"}
              </span>
              <span className="text-[0.6rem] text-white/20">
                &copy; 2026 • Semua Hak Dilindungi
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
