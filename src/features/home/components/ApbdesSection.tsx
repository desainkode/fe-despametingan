"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useAPBDesYear } from "../hooks/useAPBDesYear";
import { SectionHeader } from "./ui/SectionHeader";

const apbdesYears = [2026, 2025, 2024, 2023, 2022];
const apbdesStatistik = [
  { label: "Total Pendapatan", value: "3.542" },
  { label: "Total Belanja", value: "3.542" },
  { label: "SiLPA", value: "3.542" },
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
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader 
          title={["Anggaran Pendapatan", "Dan Belanja Daerah"]}
          description="Transparansi pengelolaan keuangan desa untuk mendukung proses perencanaan pembangunan, pengambilan kebijakan, serta evaluasi program secara tepat sasaran bagi warga Desa Pameutingan."
          showInfoButton
        />

        <div className="hero-reveal group/apbdes relative overflow-visible rounded-3xl p-6 text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-500 sm:p-7 md:p-8 lg:p-9">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-linear-to-r from-[#005E45] via-[#006548] to-[#005C44] transition-transform duration-700" />
            <svg
              className="animate-ocean-wave absolute bottom-0 left-0 h-26 w-[150%] md:h-30"
              viewBox="0 0 1300 220"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 96 C180 176 390 18 650 86 C920 156 1110 184 1300 136 L1300 220 L0 220 Z"
                fill="#2D7C67"
                fillOpacity="0.88"
              />
            </svg>
          </div>

          <div className="relative z-30 mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
            <h3 className="hero-reveal font-timeless text-[28px] font-bold leading-tight md:text-[34px]">
              APBDes Tahun {selectedYear}
            </h3>

            <div ref={yearDropdownRef} className="hero-reveal relative inline-flex items-center">
              <button
                type="button"
                onClick={() => setIsYearDropdownOpen((prev) => !prev)}
                className="group/year inline-flex min-w-42 items-center justify-between gap-3 rounded-full border border-[#D3E7DE]/70 bg-linear-to-b from-[#F2F7F4] to-[#E0ECE6] px-5 py-2.5 text-[12px] font-semibold text-[#20332F] shadow-lg transition-all duration-500 hover:-translate-y-0.5 md:text-[13px]"
              >
                <span>Tahun {selectedYear}</span>
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className={`transition-transform duration-400 ${isYearDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              <div className={`absolute right-0 top-[calc(100%+12px)] z-60 w-44 origin-top-right rounded-2xl border border-[#D3E7DE]/70 bg-[#EEF5F1]/95 p-2 shadow-xl backdrop-blur-sm transition-all duration-400 ${isYearDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}>
                <ul className="space-y-1">
                  {apbdesYears.map((year) => (
                    <li key={year}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedYear(year);
                          setIsYearDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[12px] font-medium transition-all duration-300 md:text-[13px] ${selectedYear === year ? "bg-[#0B281F] text-[#A4F4CF]" : "text-[#26423B] hover:bg-[#DCEBE4]"}`}
                      >
                        <span>Tahun {year}</span>
                        {selectedYear === year && <span className="h-1.75 w-1.75 rounded-full bg-[#00D492]" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
              {apbdesStatistik.map((item, index) => (
                <div
                  key={item.label}
                  className={`hero-reveal relative flex h-40 flex-1 flex-col items-center justify-center rounded-full border border-white/22 bg-white/20 px-4 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:scale-[1.015] md:h-44 ${index > 0 ? "md:-ml-5" : ""}`}
                  style={{ animationDelay: `${420 + index * 120}ms` }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#F4F3EF]/82">Rp.</p>
                  <p className="mt-1 font-[Georgia,serif] text-[38px] font-bold leading-none md:text-[42px]">{item.value}</p>
                  <p className="mt-2 text-[13px] font-semibold leading-[1.2] text-[#F4F3EF]/95 md:text-[14px]">{item.label.replace("Total ", "")}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-5 lg:pl-2">
              <p className="hero-reveal max-w-80 text-[12px] leading-6 text-[#F4F3EF]/92 md:text-[13px] md:leading-7">
                Pencatatan dan pengelolaan Anggaran Pendapatan dan Belanja
                Desa (APBDes) untuk periode Januari {selectedYear}
                hingga Desember {selectedYear} secara transparan.
              </p>
              <Link
                href="/apbdes"
                className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[12px] font-bold text-[#0B281F] shadow-lg transition-all duration-500 hover:-translate-y-0.5 md:px-7 md:py-3 md:text-[13px]"
              >
                Lihat Selengkapnya
                <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
