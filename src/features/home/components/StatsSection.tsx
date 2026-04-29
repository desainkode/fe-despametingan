"use client";

import { BarChart } from "lucide-react";
import { STATISTIK_DEMOGRAFI } from "../config/home-data";

export default function StatsSection() {
  return (
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="relative mx-auto h-80 w-full max-w-7xl overflow-hidden rounded-4xl border border-[#007A55]/40 md:h-96 lg:h-105">
        <div className="absolute inset-0 bg-linear-to-r from-[#005E45] via-[#006548] to-[#005C44]" />
        <svg
          className="animate-ocean-wave pointer-events-none absolute bottom-0 left-0 h-30 w-[150%] md:h-34 lg:h-38"
          viewBox="0 0 1300 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 92 C190 178 375 22 640 84 C905 146 1090 190 1300 132 L1300 220 L0 220 Z"
            fill="#2D7C67"
            fillOpacity="0.9"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col justify-center gap-5 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-8">
          <div className="hero-reveal w-full max-w-76 rounded-3xl border border-[#00A172]/35 bg-linear-to-br from-[#0B281F]/98 via-[#004F3B]/96 to-[#006548]/95 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] [animation-delay:120ms] md:p-5 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="hero-float inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0B100] text-[#0B281F] animation-duration-[6s]">
                <BarChart size={22} strokeWidth={2.5} aria-hidden="true" />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A4F4CF] md:text-xs">
                Data Terkini 2024
              </p>
            </div>

            <h2 className="font-timeless mt-3 text-[24px] font-bold leading-[1.03] tracking-[0.01em] text-white md:text-[28px]">
              Demografi &amp;
              <br />
              Statistik Desa
            </h2>

            <p className="mt-2.5 max-w-56 text-[11px] leading-5 text-[#A4F4CF]/75 md:text-[13px] md:leading-6">
              Menyajikan data kependudukan yang transparan, akurat, dan
              terintegrasi untuk mendukung perencanaan.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5 lg:max-w-132 lg:gap-7">
            {STATISTIK_DEMOGRAFI.map((item, index) => (
              <div
                key={item.label}
                className={`hero-reveal min-w-0 rounded-xl bg-[#0B281F]/30 p-3 text-center sm:rounded-none sm:bg-transparent sm:p-0 sm:text-left ${index > 0
                  ? "sm:border-l sm:border-[#5EE9B5]/20 sm:pl-4 lg:pl-5"
                  : ""
                  }`}
                style={{ animationDelay: `${260 + index * 120}ms` }}
              >
                <p className="font-[Georgia,serif] text-[30px] leading-none tracking-[0.01em] text-white md:text-[36px] md:leading-9">
                  {item.angka}
                </p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#FFFFFF] md:text-xs">
                  {item.label}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-[#FFFFFF]/55 md:text-[11px]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
