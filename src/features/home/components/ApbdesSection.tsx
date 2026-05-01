"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, TrendingUp, Wallet, PieChart } from "lucide-react";
import { useAPBDesYear } from "../hooks/useAPBDesYear";
import { SectionHeader } from "./ui/SectionHeader";

const apbdesYears = [2026, 2025, 2024, 2023, 2022];
const apbdesStatistik = [
  { label: "Total Pendapatan", value: "3.54B", icon: TrendingUp, color: "from-[#00D492] to-[#00A172]" },
  { label: "Total Belanja", value: "3.12B", icon: Wallet, color: "from-[#F0B100] to-[#D49C00]" },
  { label: "Sisa Anggaran", value: "420M", icon: PieChart, color: "from-white/20 to-white/10" },
];

export default function ApbdesSection() {
  const { selectedYear, setSelectedYear } = useAPBDesYear(2026);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState<boolean>(false);
  const yearDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-white px-6 py-8 md:px-10 md:py-12 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader 
          title={["Anggaran Pendapatan", "& Belanja Desa"]}
          description="Transparansi pengelolaan keuangan desa untuk mendukung proses perencanaan pembangunan, pengambilan kebijakan, serta evaluasi program secara tepat sasaran bagi warga Desa Pameutingan."
          showInfoButton
        />

        <div className="hero-reveal group/apbdes relative overflow-visible rounded-[40px] bg-[#004D39] p-6 text-[#F4F3EF] shadow-2xl transition-all duration-500 md:p-10 lg:p-14">
          {/* Background Elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[40px]">
            <div className="absolute inset-0 bg-linear-to-br from-[#004D39] via-[#003B2C] to-[#002B20]" />
            <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#00D492]/10 blur-[120px]" />
            
            <svg
              className="animate-ocean-wave absolute bottom-0 left-0 h-32 w-[200%] opacity-20"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,64L48,64C96,64,192,64,288,74.7C384,85,480,107,576,106.7C672,107,768,85,864,69.3C960,53,1056,43,1152,48L1200,53.3L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                fill="#00D492"
              ></path>
            </svg>
          </div>

          <div className="relative z-30 mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00D492]">Laporan Keuangan</span>
              <h3 className="font-upakarti text-[32px] font-bold leading-tight md:text-[42px]">
                APBDes Tahun {selectedYear}
              </h3>
            </div>

            <div ref={yearDropdownRef} className="hero-reveal relative">
              <button
                type="button"
                onClick={() => setIsYearDropdownOpen((prev) => !prev)}
                className="group/year flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-[14px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                <span>Pilih Tahun: {selectedYear}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-500 ${isYearDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              <div className={`absolute right-0 top-[calc(100%+12px)] z-60 w-56 origin-top-right rounded-3xl border border-white/10 bg-[#052119]/95 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 ${isYearDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}`}>
                <div className="grid gap-1">
                  {apbdesYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        setSelectedYear(year);
                        setIsYearDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[14px] font-bold transition-all ${selectedYear === year ? "bg-[#00D492] text-[#052119]" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                    >
                      <span>Tahun {year}</span>
                      {selectedYear === year && <div className="h-1.5 w-1.5 rounded-full bg-[#052119]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
            {/* Circular Stats Container */}
            <div className="grid grid-cols-2 justify-center gap-4 sm:gap-6 lg:flex lg:flex-nowrap lg:justify-start lg:gap-0">
              {apbdesStatistik.map((item, index) => (
                <div
                  key={item.label}
                  className={`hero-reveal relative flex aspect-square w-full flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:z-20 hover:-translate-y-2 group/card sm:h-44 sm:w-44 sm:aspect-auto lg:h-52 lg:w-52 ${index > 0 ? "lg:-ml-12" : ""}`}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className={`absolute inset-0 rounded-full bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover/card:opacity-10 ${item.color}`} />
                  <item.icon className="mb-2 text-[#00D492] size-5 sm:size-6 sm:mb-3" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 sm:text-[10px]">Rp.</span>
                  <p className="mt-1 font-upakarti text-[22px] font-bold leading-none sm:text-[32px] md:text-[38px] lg:text-[44px]">{item.value}</p>
                  <p className="mt-1 px-2 text-center text-[9px] font-bold uppercase tracking-tight text-white/60 sm:mt-2 sm:px-4 sm:text-[11px]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
              <p className="hero-reveal text-[15px] leading-relaxed text-[#D0FAE5]/70 md:text-[16px]">
                Dokumentasi transparansi anggaran periode {selectedYear} yang dikelola secara akuntabel untuk pembangunan berkelanjutan Desa Pameutingan.
              </p>
              <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/infografis/apbdes"
                  className="hero-reveal group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#F0B100] px-8 py-4 text-[15px] font-black text-[#052119] shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                >
                  Detail Anggaran
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
